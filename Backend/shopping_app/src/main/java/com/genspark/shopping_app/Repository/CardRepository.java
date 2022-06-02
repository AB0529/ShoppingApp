package com.genspark.shopping_app.Repository;

import com.genspark.shopping_app.Entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//repo for cards
@Repository
public interface CardRepository extends JpaRepository<Card, Integer> {

    Card findByCardNumber(String CardNumber);

}
