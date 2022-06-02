package com.genspark.shopping_app.Repository;


import com.genspark.shopping_app.Entity.Item;
import com.genspark.shopping_app.Entity.Tag;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ItemRepositoryTest {
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private TestEntityManager entityManager;
    private Item item1;
    private Item item2;
    private Tag tag1;
    private Tag tag2;

    //test for item repository creates 2 items and 2 tags and test for retriving a maximum in order or random order
    @BeforeEach
    void setUp() {
        item1 = createItem("Scissors");
        tag1 = createTag("sharp");
        tag1.setItem(item1);
        item1.setTags(List.of(tag1));

        item2 = createItem("Knife");
        tag2 = createTag("sharp");
        tag2.setItem(item2);
        item2.setTags(List.of(tag2));

        entityManager.persist(item1);
        entityManager.persist(tag1);

        entityManager.persist(item2);
        entityManager.persist(tag2);

    }

    @Test
    public void assertRetrievalByName(){

        List<Integer> returnedItem = itemRepository.findItemsByName("Scissors");
        assertNotNull(returnedItem);

    }
    @Test
    public void assertMax(){
        Iterable<Item> items = itemRepository.findAllMax(1);
        int i;
        for(i = 0; items.iterator().hasNext() ; ++i ) {items.iterator().next();}
        assertEquals(1,i);
    }
    @Test
    public void assertRandMax(){
        Iterable<Item> items = itemRepository.findRandomMax(1);
        List<Item> list1 = new ArrayList<>();
        List<Item> list2 = new ArrayList<>();

        items.forEach(list1::add);
        list2.add(item1);
        list2.add(item2);
        assertNotEquals(list2,list1);

    }
    @AfterEach
    void tearDown() {
    }
    private Item createItem(String name){
        Item item = new Item();
        item.setDescription("This can cut paper");
        item.setName(name);
        item.setPrice(200);
        item.setImage("image of a scissors");
        //item.setItemID(1);
        return item;
    }
    private Tag createTag(String name){
        Tag tag = new Tag();
        tag.setTag(name);
        //tag.setTagID(1);
        return tag;
    }

}