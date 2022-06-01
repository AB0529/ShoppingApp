package com.genspark.shopping_app.Entity;

import javax.persistence.*;

@Entity
@Table(name="tbl_orders");
public class Order {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO);
    private int orderID;

    @ManyToOne(cascade= CascadeType.ALL)
    @JoinColumn(name = "userID")
    private User user;

    @Column
    private int status;

    public Order(int orderID, User user, int status) {
        this.orderID = orderID;
        this.user = user;
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public int getOrderID() {
        return orderID;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }
}
