package com.genspark.shopping_app.Model;

public class UserCard {
    private int cvc;
    private String cardNumber;
    private String type;
    private String expiration;

    public String getType() {
        return type;
    }

    public String getExpiration() {
        return expiration;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public int getCvc() {
        return cvc;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setExpiration(String expiration) {
        this.expiration = expiration;
    }

    public void setCvc(int cvc) {
        this.cvc = cvc;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    @Override
    public String toString() {
        return "UsersCard{" +
                "cvc=" + cvc +
                ", cardNumber='" + cardNumber + '\'' +
                ", type='" + type + '\'' +
                ", expiration='" + expiration + '\'' +
                '}';
    }
}
