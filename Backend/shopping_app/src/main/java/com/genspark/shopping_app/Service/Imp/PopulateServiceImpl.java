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
        List<File> filesInFolder;

        try
        {
            filesInFolder = Files.walk(Paths.get("src/main/resources/static/catalog/Army_Watch.txt"))
                    .map(Path::toFile).toList();
        } catch (IOException e)
        {
            throw new RuntimeException(e);
        }


        for (File file : filesInFolder)
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
                        Tag tag = new Tag();
                        tag.setTag(currentLine[1]);
                    }
                    // get price
                    if (line.contains("price"))
                    {
                        String[] currentLine = line.split(":");
                        this.price = (int) Double.parseDouble(currentLine[1]);
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
