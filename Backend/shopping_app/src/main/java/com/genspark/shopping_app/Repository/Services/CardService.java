package com.genspark.shopping_app.Repository.Services;

import com.genspark.shopping_app.Entity.Card;

public interface CardService {

    Card addCard(Card card);
    Card updateCard(Card card);
    Card getCardByID(int cardID);
    String deleteCardByID(int cardID);


}
