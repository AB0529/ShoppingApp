package com.genspark.shopping_app.Service.Imp;

import com.genspark.shopping_app.Entity.Card;
import com.genspark.shopping_app.Repository.CardRepository;
import com.genspark.shopping_app.Repository.Services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CardServiceImp implements CardService {

    @Autowired
    private CardRepository cardRepository;

    @Override
    public Card addCard(Card card) {
        return this.cardRepository.save(card);
    }

    @Override
    public Card updateCard(Card card) {
        return this.cardRepository.save(card);
    }

    @Override
    public Card getCardByID(int cardID) {

        Optional<Card> c = this.cardRepository.findById(cardID);
        Card card = null;
        if(c.isPresent()){
            card = c.get();
        } else {
            throw new RuntimeException("Card not found for ID: " + cardID);
        }
        return card;

    }

    @Override
    public String deleteCardByID(int cardID) {
        this.cardRepository.deleteById(cardID);

        return "Card with ID: " + cardID + " Deleted";
    }
}
