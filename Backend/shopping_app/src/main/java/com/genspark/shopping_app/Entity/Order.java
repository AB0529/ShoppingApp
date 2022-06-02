package com.genspark.shopping_app.Entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="tbl_orders")
public class Order {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int orderID;
    @Column
    private int status;
    @ManyToMany(cascade = CascadeType.REMOVE)
    private List<Item> cart;

    @Column
    private int userID;

    public Order(int orderID, int status, List<Item> cart, int userID) {
        this.orderID = orderID;
        this.status = status;
        this.cart = cart;
        this.userID = userID;
    }

    public Order() {}


    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public List<Item> getCart() {
        return cart;
    }

    public void setCart(List<Item> cart) {
        this.cart = cart;
    }

    public long getOrderID() {
        return orderID;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }


    @Override
    public String toString() {
        return "Order{" +
                "orderID=" + orderID +
                ", status=" + status +
                ", cart=" + cart +
                ", userID=" + userID +
                '}';
    }
}
