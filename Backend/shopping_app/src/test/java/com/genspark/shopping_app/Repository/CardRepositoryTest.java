package com.genspark.shopping_app.Repository;

import com.genspark.shopping_app.Entity.Card;
import com.genspark.shopping_app.Entity.User;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import static org.assertj.core.api.Java6Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//test for card repository, does basic CRUD functions
class CardRepositoryTest {
    @Autowired
    private CardRepository cardRepository;

    @BeforeEach
    void setUp() {

    }
    @Test
    @Rollback(false)
    @Order(1)
    void assertCreateCard(){
        Card card = new Card();
        User user = new User();
        card.setType("visa");
        card.setExpiration("10/12");
        card.setCardNumber("111122314");
        card.setCvc(303);

        user.setUserName("username");
        user.setPassWord("password");
        user.setAddress("address");
        user.setCard(card);
        user.setName("name");
        card.setUserID(user);

        Card saveCard = cardRepository.save(card);

        assertThat(saveCard.getCardID()).isGreaterThan(0);
    }
    @Test
    @Rollback(false)
    @Order(2)
    void assertGetCard(){
        Card card = cardRepository.findByCardNumber("111122314");
        assertThat(card.getCardNumber()).isEqualTo("111122314");

    }
    @Test
    @Rollback(false)
    @Order(3)
    void assertUpdateCard(){
        Card card = cardRepository.findByCardNumber("111122314");
        card.setExpiration("12/12");
        cardRepository.save(card);

        Card updatedCard = cardRepository.findByCardNumber("111122314");
        assertThat(updatedCard.getExpiration()).isEqualTo("12/12");
    }
    @Test
    @Rollback(false)
    @Order(4)
    void  assertDeleteCard(){
        Card card = cardRepository.findByCardNumber("111122314");
        cardRepository.deleteById(card.getCardID());
        Card deletedCard = cardRepository.findByCardNumber("111122314");
        assertThat(deletedCard).isNull();
    }
    @AfterEach
    void tearDown() {
    }
}