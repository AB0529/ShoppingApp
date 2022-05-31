package com.genspark.shopping_app.Service.Imp;

import com.genspark.shopping_app.Entity.Item;
import com.genspark.shopping_app.Entity.Tag;
import com.genspark.shopping_app.Repository.ItemRepository;
import com.genspark.shopping_app.Repository.Services.PopulateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;
import java.util.stream.Stream;

@Service
public class PopulateServiceImpl implements PopulateService
{
    @Autowired
    public ItemServiceImp itemServiceImp;

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
                    .forEach((File file) ->
                    {
                        Item item = new Item();

                        if (file.getName().endsWith(".properties")) {
                            try {
                                item.setName(file.getName().replace(".properties", "").replace("_", " "));

                                Properties p = new Properties();
                                p.load(new FileInputStream(file));
                                List<Tag> tags = new ArrayList<>();

                                for (String s : p.getProperty("tags").split(",")) {
                                    Tag t = new Tag();
                                    t.setTag(s);

                                    tags.add(t);
                                }

                                item.setPrice(Double.parseDouble(p.getProperty("price").replace(",", "")));
                                item.setTags(tags);
                                item.setDescription(p.getProperty("description"));
                            } catch (Exception e) {
                                throw new RuntimeException("Error parsing file " + e);
                            }
                        } else if (file.getName().endsWith(".jpg"))
                            item.setImage("http://localhost:9080/catalog/"+file.getName());

                        itemServiceImp.addItem(item);
                    });
        } catch (IOException io)
        {
            throw new RuntimeException(io.getCause());
        }

        return itemServiceImp.getAllItems().toString();
    }
}
