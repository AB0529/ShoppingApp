package com.genspark.shopping_app.Service.Imp;

import com.genspark.shopping_app.Entity.Item;
import com.genspark.shopping_app.Repository.ItemRepository;
import com.genspark.shopping_app.Repository.Services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImp implements ItemService {

    @Autowired
    private ItemRepository itemRepository;


    @Override
    public Item addItem(Item item) {
        return this.itemRepository.save(item);
    }

    @Override
    public Item updateItem(Item item) {
        return this.itemRepository.save(item);
    }

    @Override
    public Item getItemByID(int itemID) {
        Optional<Item> i = this.itemRepository.findById(itemID);
        Item item = null;
        if(i.isPresent()){
            item = i.get();
        } else {
            throw new RuntimeException("User not found for ID: " + itemID);
        }
        return item;
    }

    @Override
    public Iterable<Object> getItemsByName(String name) {
        Iterable<Integer> ids = itemRepository.findItemsByName(name);
        List<Item> items = new ArrayList<>();

        ids.forEach(i -> {
            Item item = getItemByID(i);
            items.add(item);
        });

        return Collections.singleton(items);
    }

    @Override
    public String deleteItemByID(int itemID) {
        this.itemRepository.deleteById(itemID);

        return "Item with ID: " + itemID + " Deleted";
    }
}
