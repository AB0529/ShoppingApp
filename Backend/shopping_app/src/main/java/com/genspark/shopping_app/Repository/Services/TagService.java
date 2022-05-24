package com.genspark.shopping_app.Repository.Services;

import com.genspark.shopping_app.Entity.Item;
import com.genspark.shopping_app.Entity.Tag;

import java.util.Iterator;

public interface TagService {

    Tag addTag(Tag tag);
    Tag updateTag(Tag tag);
    Tag getTagByID(int tagID);
    String deleteTagByID(int tagID);
    Iterator<Item> getItemsByTagName(String name);

}
