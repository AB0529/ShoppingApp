package com.genspark.shopping_app.Entity;

import com.genspark.shopping_app.Entity.Card;
import com.genspark.shopping_app.Entity.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
//test for card entity
class CardTest {
    Card card;
    User user;
    @BeforeEach
    void setUp() {
        card = new Card("111","MasterCard","12/12",user,121,1);
    }

    @Test
    void assertCard(){
        assertEquals("111",card.getCardNumber());
        assertEquals("MasterCard",card.getType());
        assertEquals("12/12",card.getExpiration());
        assertNull(card.getUserID());
        assertEquals(121,card.getCvc());
        assertEquals(1,card.getCardID());
    }


    @AfterEach
    void tearDown() {
    }
}
