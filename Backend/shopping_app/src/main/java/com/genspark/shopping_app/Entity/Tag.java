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
    @ManyToOne(cascade= CascadeType.REMOVE)
    @JoinColumn(name = "itemID")
    private Item item;

    public Tag(int tagId,String tag, Item itemID) {
        this.tagID = tagId;
        this.tag = tag;
        this.item = itemID;
    }
    public Tag(){}

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
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
                ", item=" + item +
                '}';
    }
}
