package com.genspark.shopping_app.Entity;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
//test for item entity
class ItemTest {
    Item item;

    @BeforeEach
    void setUp() {
        List<Item> cart = null;
        item = new Item(1, 33, "Hairbrush", "image of a hairbrush", "Used to brush hair", List.of(new Tag()));
    }

    @Test
    void assertItem(){
        assertEquals(1,item.getItemID());
        assertEquals(33.65,item.getPrice());
        assertEquals("Hairbrush",item.getName());
        assertEquals("image of a hairbrush",item.getImage());
        assertEquals("Used to brush hair",item.getDescription());
        for(Tag tag: item.getTags()){
            assertNull(tag.getTag());
        }
    }

    @AfterEach
    void tearDown() {
    }
}
