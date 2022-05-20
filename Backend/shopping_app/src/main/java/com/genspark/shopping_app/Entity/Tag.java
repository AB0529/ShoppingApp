package com.genspark.shopping_app.Entity;

import javax.persistence.*;


@Entity
@Table(name="tbl_tags")
public class Tag {
    public int getTagID() {
        return tagID;
    }

    public void setTagID(int tagID) {
        this.tagID = tagID;
    }

    @Id
    @Column
    private int tagID;
    @Column
    private String tag;
    @ManyToOne(cascade= CascadeType.ALL)
    @JoinColumn(name = "itemID")
    private Item item;

    public Tag(int tagId,String tag, Item item) {
        this.tagID = tagId;
        this.tag = tag;
        this.item = item;
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


    @Override
    public String toString() {
        return "Tag{" +
                "tagID=" + tagID +
                ", tag='" + tag + '\'' +
                ", item=" + item +
                '}';
    }
}
