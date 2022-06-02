package com.genspark.shopping_app.Repository;

import com.genspark.shopping_app.Entity.Card;
import com.genspark.shopping_app.Entity.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.Java6Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;
    //test for user repository test to find user by password or username
    @BeforeEach
    void setUp() {
        User user = new User();
        user.setName("Name");
        user.setUserName("UserName");
        user.setPassWord("passWord");
        user.setAddress("Address");

        Card card = new Card();
        card.setExpiration("12/12");
        card.setCardNumber("123456789");
        card.setCvc(123);
        card.setUserID(user);

        user.setCard(card);


        userRepository.save(user);
    }
    @Test
    void assertFindByPassWord(){
        Optional<User> user = userRepository.findByPassWord("passWord");
        assertThat(user.get().getUserName()).isEqualTo("UserName");
    }
    @Test
    void assertFindByUserName(){
        Optional<User> user = userRepository.findByUserName("UserName");
        assertThat(user.get().getPassWord()).isEqualTo("passWord");
    }
    @AfterEach
    void tearDown() {
    }
}