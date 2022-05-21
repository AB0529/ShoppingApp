package com.genspark.shopping_app.Entity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="tbl_users")
public class User {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userID;
    @Column
    private String name;
    @Column
    private String address;
    @Column
    private String userName;
    @Column
    private String passWord;
    //private String email;

    // linking between cart table and user table
    @OneToOne(fetch = FetchType.EAGER,mappedBy="user",cascade = CascadeType.ALL)
    private Cart cart;
    // linking between card table and user table
    @OneToMany(fetch = FetchType.EAGER,mappedBy="user",cascade = CascadeType.ALL)
    private Set<Card> card;

    public User(int userID, String name, String address, String userName, String passWord,Cart cart,Set<Card> card) {

        this.userID = userID;
        this.name = name;
        this.address = address;
        this.userName = userName;
        this.passWord = passWord;
        this.cart = cart;
        this.card = card;

    }

    public User(){}

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
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

    public Set<Card> getCard() {
        return card;
    }

    public void setCard(Set<Card> card) {
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
