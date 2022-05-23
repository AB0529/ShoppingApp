package com.genspark.shopping_app.Repository.Services;

import com.genspark.shopping_app.Entity.Card;
import com.genspark.shopping_app.Entity.Item;

public interface ItemService {

    Item addItem(Item item);
    Item updateItem(Item item);
    Item getItemByID(int itemID);
    String deleteItemByID(int itemID);

}
