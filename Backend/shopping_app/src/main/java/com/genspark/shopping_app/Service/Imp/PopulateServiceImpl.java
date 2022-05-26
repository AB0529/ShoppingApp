package com.genspark.shopping_app.Service.Imp;

import com.genspark.shopping_app.Entity.Item;
import com.genspark.shopping_app.Entity.Tag;
import com.genspark.shopping_app.Repository.ItemRepository;
import com.genspark.shopping_app.Repository.Services.PopulateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

@Service
public class PopulateServiceImpl implements PopulateService
{
    @Autowired
    public ItemRepository itemRepository;
    private List<Tag> tags;
    private double price;

    @Override
    public String populateDatabase()
    {
        // trying to get all the txt files read and put in as items for ItemRepository
        try (Stream<Path> paths = Files.walk(Paths.get("src/main/resources/static/catalog")))
        {
            paths.map(Path::toFile)
                    .toList().stream().filter(file -> file.getName().endsWith(".txt") && file.isFile() && !file.getName().equals("test.txt"))
                    .peek(System.out::println)
                    .forEachOrdered((File file) ->
                    {
                        try (BufferedReader reader = new BufferedReader(new FileReader(file)))
                        {
                            List<String> content = Files.readAllLines(file.toPath());
                            for (var line : content)
                            {
                                //  get tags
                                if (line.contains("tags"))
                                {
                                    String[] currentLine = line.split("[:,]+");
                                }
                                // get price
                                if (line.contains("price"))
                                {
                                    String[] currentLine = line.replace(",", "").split(":");
                                    this.price = Double.parseDouble(currentLine[1]);
                                }
                            }
                        } catch (IOException e)
                        {
                            throw new RuntimeException(e);
                        }
                        Item item = new Item();
                        item.setName(file.getName().replace(".txt", ""));
                        item.setPrice(price);
                        item.setTags(tags);
                        this.itemRepository.save(item);
                    });
        } catch (IOException io)
        {
            throw new RuntimeException(io.getCause());
        }

        return itemRepository.findAll().toString();
    }

    FilenameFilter filter = new FilenameFilter()
    {
        @Override
        public boolean accept(File dir, String name)
        {
            return name.endsWith(".txt");
        }
    };
}
