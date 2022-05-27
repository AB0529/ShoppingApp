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

    // linking between tag table and item table
    @OneToMany(cascade= CascadeType.ALL)
    @JoinColumn(name = "item")
    @Column(unique = true)
    private List<Tag> tags;
    @Column
    private double price;
    @Column
    private String name;
    @Column
    private String image;
    @Column
    private String description;

    public Item(int itemID, int price, String name, String image, String description, List<Tag> tags) {
        this.itemID = itemID;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.tags = tags;
    }

    public Item(){}

    public int getItemID() {
        return itemID;
    }

    public void setItemID(int itemID) {
        this.itemID = itemID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
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
                ", tags=" + tags +
                ", price=" + price +
                ", name='" + name + '\'' +
                ", image='" + image + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
