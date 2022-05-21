package com.genspark.shopping_app.Entity;

import javax.persistence.*;

@Entity
@Table(name="tbl_cards")
public class Card {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int cardID;
    // linking between card table and user table
    @ManyToOne(cascade= CascadeType.ALL)
    @JoinColumn(name = "userID")
    private User user;
    @Column
    private int cvc;
    @Column
    private String cardNumber;
    @Column
    private String type;
    @Column
    private String expiration;


    public Card(String cardNumber, String type, String expiration, User user, int cvc,int cardID) {
        this.cardNumber = cardNumber;
        this.type = type;
        this.expiration = expiration;
        this.cvc = cvc;
        this.user = user;
        this.cardID = cardID;
    }

    public Card(){}

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getExpiration() {
        return expiration;
    }

    public void setExpiration(String expiration) {
        this.expiration = expiration;
    }

    public int getCvc() {
        return cvc;
    }

    public void setCvc(int cvc) {
        this.cvc = cvc;
    }

    public User getUserID() {
        return user;
    }

    public void setUserID(User user) {
        this.user = user;
    }

    public int getCardID() {
        return cardID;
    }

    public void setCardID(int cardID) {
        this.cardID = cardID;
    }
    @Override
    public String toString() {
        return "Card{" +
                "cardNumber='" + cardNumber + '\'' +
                ", type='" + type + '\'' +
                ", expiration='" + expiration + '\'' +
                ", cvc=" + cvc +
                ", userID=" + user +
                ", cartID=" + cardID +
                '}';
    }
}
