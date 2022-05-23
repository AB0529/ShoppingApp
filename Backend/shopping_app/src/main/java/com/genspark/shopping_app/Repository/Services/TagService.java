package com.genspark.shopping_app.Repository.Services;

import com.genspark.shopping_app.Entity.Tag;

public interface TagService {

    Tag addTag(Tag tag);
    Tag updateTag(Tag tag);
    Tag getTagByID(int tagID);
    String deleteTagByID(int tagID);

}
