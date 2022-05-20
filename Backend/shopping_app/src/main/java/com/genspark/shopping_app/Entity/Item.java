package com.genspark.shopping_app.Entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="tbl_items")
public class Item {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int itemID;
    @ManyToOne(cascade= CascadeType.ALL)
    @JoinColumn(name = "cartID")
    private Cart cart;
    @OneToMany(cascade= CascadeType.ALL)
    @JoinColumn(name = "item")
    private List<Tag> tags;
    @Column
    private int price;
    @Column
    private String name;
    @Column
    private String image;
    @Column
    private String description;

    public Item(int itemID, int price, Cart cart , String name, String image, String description, List<Tag> tags) {
        this.itemID = itemID;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.cart = cart;
        this.tags = tags;
    }

    public Item(){}

    public int getItemID() {
        return itemID;
    }

    public void setItemID(int itemID) {
        this.itemID = itemID;
    }

    public Cart getCartID() {
        return cart;
    }

    public void setCartID(Cart cart) {
        this.cart = cart;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "Item{" +
                "itemID=" + itemID +
                ", cartID=" + cart +
                ", tags=" + tags +
                ", price=" + price +
                ", name='" + name + '\'' +
                ", image='" + image + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
