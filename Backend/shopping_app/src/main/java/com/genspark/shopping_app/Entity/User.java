package com.genspark.shopping_app.Entity;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="tbl_users")
public class User {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userID;

    private String name;
    private String address;
    @Column(unique = true)
    private String userName;
    @Column
    private String passWord;
    @Column
    private String email;

    // linking between cart table and user table
//    @OneToMany(fetch = FetchType.EAGER,mappedBy="cart",cascade = CascadeType.ALL)
    @OneToMany(fetch = FetchType.EAGER, cascade={CascadeType.PERSIST,CascadeType.REMOVE})
    @JoinColumn(name = "item")
    private List<Item> cart;

    // linking between card table and user table
    @OneToOne(fetch = FetchType.EAGER, cascade={CascadeType.PERSIST,CascadeType.REMOVE})
    private Card card;

    public User(int userID, String name, String address, String userName, String passWord, List<Item> cart, Card card, String email) {

        this.userID = userID;
        this.name = name;
        this.address = address;
        this.userName = userName;
        this.passWord = passWord;
        this.cart = cart;
        this.card = card;
        this.email = email;
    }

    public User(){}


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public List<Item> getCart() {
        return cart;
    }

    public void setCart(List<Item> cart) {
        this.cart = cart;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    @Override
    public String toString() {
        return "User{" +
                "userID=" + userID +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", userName='" + userName + '\'' +
                ", passWord='" + passWord + '\'' +
                ", cart=" + cart +
                ", card=" + card +
                '}';
    }
}
