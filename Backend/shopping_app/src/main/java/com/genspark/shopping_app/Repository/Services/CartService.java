package com.genspark.shopping_app.Repository.Services;

public interface CartService {

    Cart addCart(Cart cart);
    Cart updateCart(Cart cart);
    Cart getCartByID(int cartID);
    String deleteCartByID(int cartID);

}
