package com.genspark.shopping_app.Service.Imp;

import com.genspark.shopping_app.Entity.Item;
import com.genspark.shopping_app.Entity.Tag;
import com.genspark.shopping_app.Repository.ItemRepository;
import com.genspark.shopping_app.Repository.Services.PopulateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.List;

@Service
public class PopulateServiceImpl implements PopulateService
{
    @Autowired
    public ItemRepository itemRepository;
    private List<Tag> tags;
    private int price;

    @Override
    public String populateDatabase()
    {
        File folder = new File("static/catalog");
        File[] listOfFiles = folder.listFiles(filter);

        for (File file : listOfFiles)
        {
            if (file.exists() && file.isFile() && file.canRead())
            {
                try (BufferedReader reader = new BufferedReader(new FileReader(file)))
                {
                    List<String> content = Files.readAllLines(file.toPath());
                    for (var line : content)
                    {
                        if (line.contains("tags"))
                        {
                            String[] currentLine = line.split(":,");
                            tags.add((Tag) Arrays.stream(currentLine)
                                    .filter(x -> !x.equalsIgnoreCase("tags")
                                            && !x.equals(":")
                                            && !x.equals(",")));
                        }
                        if (line.contains("price"))
                        {
                            String[] currentLine = line.split(":");
                            this.price = Integer.parseInt(currentLine[2]);
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
                itemRepository.save(item);
            }
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
