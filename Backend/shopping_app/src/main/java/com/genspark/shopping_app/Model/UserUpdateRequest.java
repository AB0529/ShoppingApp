package com.genspark.shopping_app.Model;

import com.genspark.shopping_app.Entity.Card;
import com.genspark.shopping_app.Entity.Item;

import java.util.List;

public class UserUpdateRequest {
    private String username;
    private UserAddress address;
    private Card card;
    private List<Item> cart;
    private UserName name;
    private int userID;

    public int getUserID() {
        return userID;
    }

    public String getUsername() {
        return username;
    }

    public UserAddress getAddress() {
        return address;
    }

    public Card getCard() {
        return card;
    }

    public UserName getName() {
        return name;
    }

    public void setName(UserName name) {
        this.name = name;
    }

    public List<Item> getCart() {
        return cart;
    }

    public void setAddress(UserAddress address) {
        this.address = address;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setCart(List<Item> cart) {
        this.cart = cart;
    }
}
