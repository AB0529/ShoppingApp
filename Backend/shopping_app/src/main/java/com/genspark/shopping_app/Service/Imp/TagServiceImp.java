package com.genspark.shopping_app.Service.Imp;

import com.genspark.shopping_app.Entity.Item;
import com.genspark.shopping_app.Entity.Tag;
import com.genspark.shopping_app.Repository.TagRepository;
import com.genspark.shopping_app.Repository.Services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class TagServiceImp implements TagService {

    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private ItemServiceImp itemServiceImp;

    @Override
    public Tag addTag(Tag tag) {
        return this.tagRepository.save(tag);
    }

    @Override
    public Tag updateTag(Tag tag) {
        return this.tagRepository.save(tag);
    }

    @Override
    public Tag getTagByID(int tagID) {
        Optional<Tag> t = this.tagRepository.findById(tagID);
        Tag tag = null;
        if(t.isPresent()){
            tag = t.get();
        } else {
            throw new RuntimeException("Tag not found for ID: " + tagID);
        }
        return tag;
    }

    @Override
    public String deleteTagByID(int tagID) {
        this.tagRepository.deleteById(tagID);

        return "Tag with ID: " + tagID + " Deleted";
    }

    @Override
    public Iterable<Object> getItemsByTagName(String name) {
        Iterable<Integer> ids = tagRepository.findItemsByTag(name);
        List<Item> items = new ArrayList<>();


        ids.forEach(i -> {
            Item item = itemServiceImp.getItemByID(i);
            items.add(item);
        });

        return Collections.singleton(items);
    }
}
