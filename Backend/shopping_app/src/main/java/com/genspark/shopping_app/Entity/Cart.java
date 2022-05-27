package com.genspark.shopping_app.Entity;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="tbl_carts")
public class Cart {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int cartID;
    // linking between cart table and user table
    @OneToOne(cascade= CascadeType.ALL)
    @JoinColumn(name = "cart")
    private User user;
    // linking between cart table and item table
    @OneToMany(fetch = FetchType.EAGER,mappedBy="cart",cascade = CascadeType.ALL)
    private List<Item> items;

    public Cart(User user, List<Item> items, int cartID) {
        this.user = user;
        this.items = items;
        this.cartID = cartID;
    }

    public Cart(){}

    public User getUser() {
        return user;
    }

    public void setUser(User userid) {
        this.user = userid;
    }

    public List<Item> getItem() {
        return items;
    }

    public void setItem(List<Item> item) {
        this.items = item;
    }

    public int getCartID() {
        return cartID;
    }

    public void setCartID(int cartID) {
        this.cartID = cartID;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "cartID=" + cartID +
                ", id=" + user +
                ", item=" + items +
                '}';
    }
}
