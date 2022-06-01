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
        System.out.println("before stream");
        try{
            InputStream in = new FileInputStream("E:\\GenSpark\\ShoppingApp\\Backend\\shopping_app\\src\\main\\resources\\static\\catalog\\Army_Watch.properties");
            //Scanner myReader = new Scanner(myObj);
            File file = new File("Army_Watch.properties");
            Item item = new Item();
            item.setName(file.getName().replace(".properties", "").replace("_", " "));

            Properties p = new Properties();
            p.load(in);
            List<Tag> tags = new ArrayList<>();
            for (String s : p.getProperty("tags").split(",")) {
                Tag t = new Tag();
                t.setTag(s);

                tags.add(t);
            }
            item.setPrice(Double.parseDouble(p.getProperty("price").replace(",", "")));
            item.setTags(tags);
            item.setDescription(p.getProperty("description"));
            itemServiceImp.addItem(item);

        } catch (IOException e) {
            e.printStackTrace();
        }


        return itemServiceImp.getAllItems().toString();
    }


    public String test(){
        try (Stream<Path> paths = Files.walk(Paths.get("src/main/resources/static/catalog")))

        {
            System.out.println("after stream");

            paths.map(Path::toFile)
                    .forEach((File file) ->
                            {
                                Item item = new Item();
                                //clean later
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
                                        item.setImage("https://moist.esarnb.com/catalog/" + p.getProperty("image"));
                                        itemServiceImp.addItem(item);

                                    } catch (Exception e) {
                                        throw new RuntimeException("Error parsing file " + e);
                                    }
                                } else if (file.getName().endsWith(".jpg")) {
                                    //item.setImage("http://localhost:9080/catalog/" + file.getName());
                                }

                    });
        } catch (IOException io)
        {
            throw new RuntimeException(io.getCause());
        }
        return itemServiceImp.getAllItems().toString();

    }
}
