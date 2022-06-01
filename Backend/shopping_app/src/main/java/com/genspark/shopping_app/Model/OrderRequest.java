package com.genspark.shopping_app.Model;

import com.genspark.shopping_app.Entity.Item;

import java.util.List;

public class OrderRequest {

    private List<Item> cart;
    private int userID;

    public int getUserID() {
        return userID;
    }

    public List<Item> getCart() {
        return cart;
    }

    public void setCart(List<Item> cart) {
        this.cart = cart;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    @Override
    public String toString() {
        return "OrderRequest{" +
                "cart=" + cart +
                ", userID=" + userID +
                '}';
    }
}
