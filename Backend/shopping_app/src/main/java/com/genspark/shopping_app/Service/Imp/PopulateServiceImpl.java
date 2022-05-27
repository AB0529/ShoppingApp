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
        /*
        scanning all the files in the folder, excluding test.txt because it is blank
        parsing the files for the information for the items
         */
        try (Stream<Path> paths = Files.walk(Paths.get("src/main/resources/static/catalog")))
        {
            paths.map(Path::toFile)
                    .toList().stream().filter(file -> file.getName().endsWith(".txt") && file.isFile() && !file.getName().equals("test.txt"))
                    .forEach((File file) ->
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
                                //TODO: get description
                            }
                        } catch (IOException e)
                        {
                            throw new RuntimeException("Error parsing file " + e);
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
}
