package com.genspark.shopping_app.Model;

import com.genspark.shopping_app.Entity.Item;

public class AddToCartRequest {
    private int userID;
    private Item item;

    public int getUserID() {
        return userID;
    }

    public Item getItem() {
        return item;
    }
}
