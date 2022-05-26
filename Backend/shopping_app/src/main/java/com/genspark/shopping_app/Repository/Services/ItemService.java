package com.genspark.shopping_app.Repository.Services;

import com.genspark.shopping_app.Entity.Item;

import java.util.Iterator;

public interface ItemService {

    Item addItem(Item item);
    Item updateItem(Item item);
    Item getItemByID(int itemID);

    Iterator<Item> getItemsByName(String name);

    Iterator<Item> getAllItems();

    Iterator<Item> getAllItemsMax(int max);

    String deleteItemByID(int itemID);

}
