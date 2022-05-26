package com.genspark.shopping_app.Model;

import com.genspark.shopping_app.Entity.Card;

public class UserUpdateRequest {
    private String username;
    private UserAddress address;
    private Card card;
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

    public void setAddress(UserAddress address) {
        this.address = address;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
