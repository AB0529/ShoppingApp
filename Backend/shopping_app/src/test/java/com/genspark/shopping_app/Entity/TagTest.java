package com.genspark.shopping_app.Entity;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
//test for tag entity
class TagTest {
    Tag tag;
    @BeforeEach
    void setUp() {
        tag = new Tag(12,"Leather", new Item());
    }
    @Test
    void AssertTag(){
        assertNotNull(tag.getItem());
        assertEquals("Leather",tag.getTag());
        assertEquals(12,tag.getTagID());
    }
    @AfterEach
    void tearDown() {
    }
}
