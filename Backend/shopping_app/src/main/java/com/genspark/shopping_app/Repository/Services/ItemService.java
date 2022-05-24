package com.genspark.shopping_app.Repository.Services;

import com.genspark.shopping_app.Entity.Card;
import com.genspark.shopping_app.Entity.Item;

public interface ItemService {

    Item addItem(Item item);
    Item updateItem(Item item);
    Item getItemByID(int itemID);

    Iterable<Object> getItemsByName(String name);

    String deleteItemByID(int itemID);

}
