package com.genspark.shopping_app.Repository;

import com.genspark.shopping_app.Entity.Card;
import com.genspark.shopping_app.Entity.Item;
import com.genspark.shopping_app.Entity.Tag;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Java6Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class TagRepositoryTest {
    @Autowired
    private TagRepository tagRepository;
    Item item;

    //test for tag repository test for retrieving item by the tag
    @BeforeEach
    void setUp() {
        Tag tag = new Tag();
        tag.setTag("Sharp");
        item = new Item();
        item.setPrice(100);
        item.setDescription("Can cut meat");
        item.setName("Knife");
        item.setImage("Picture of a knife");
        item.setTags(List.of(tag));

        tag.setItem(item);

        tagRepository.save(tag);
    }
    @Test
    void assertGetItemByTag(){
        List<Integer> tag = tagRepository.findItemsByTag("Sharp");
        assertThat(item.getItemID()).isEqualTo(tag.get(0));

    }
    @AfterEach
    void tearDown() {
    }
}