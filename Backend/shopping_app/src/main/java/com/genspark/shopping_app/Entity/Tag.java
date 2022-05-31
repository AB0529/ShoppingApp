package com.genspark.shopping_app.Entity;

import javax.persistence.*;


@Entity
@Table(name="tbl_tags")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private int tagID;
    @Column
    private String tag;
    // linking between tag table and item table
    @ManyToOne(cascade= CascadeType.ALL)
    @JoinColumn(name = "itemID")
    private Item itemID;

    public Tag(int tagId,String tag, Item itemID) {
        this.tagID = tagId;
        this.tag = tag;
        this.itemID = itemID;
    }
    public Tag(){}

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Item getItem() {
        return itemID;
    }

    public void setItem(Item item) {
        this.itemID = item;
    }

    public int getTagID() {
        return tagID;
    }

    public void setTagID(int tagID) {
        this.tagID = tagID;
    }

    @Override
    public String toString() {
        return "Tag{" +
                "tagID=" + tagID +
                ", tag='" + tag + '\'' +
                ", item=" + itemID +
                '}';
    }
}
