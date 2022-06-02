package com.genspark.shopping_app.Entity;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
//test for user entity
class UserTest {
    User user;
    @BeforeEach
    void setUp() {
        List<Item> cart = null;
        user = new User(111, "Billy Bob", "The Moon", "Bobby","Bobbiespassword",cart, new Card());
    }

    @Test
    void assertUser(){
        assertEquals(111,user.getUserID());
        assertEquals("Billy Bob",user.getName());
        assertEquals("The Moon",user.getAddress());
        assertEquals("Bobby",user.getUserName());
        assertEquals("Bobbiespassword",user.getPassWord());
        assertNull(user.getCart());
        assertNull(user.getCard());

    }

    @AfterEach
    void tearDown() {
    }
}
