package com.genspark.shopping_app.Service.Imp;

import com.genspark.shopping_app.Repository.CartRepository;
import com.genspark.shopping_app.Repository.Services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImp implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public Cart addCart(Cart cart) {
        return this.cartRepository.save(cart);
    }

    @Override
    public Cart updateCart(Cart cart) {
        return this.cartRepository.save(cart);
    }

    @Override
    public Cart getCartByID(int cartID) {
        Optional<Cart> c = this.cartRepository.findById(cartID);
        Cart cart = null;
        if(c.isPresent()){
            cart = c.get();
        } else {
            throw new RuntimeException("Cart not found for ID: " + cartID);
        }
        return cart;
    }

    @Override
    public String deleteCartByID(int cartID) {
        this.cartRepository.deleteById(cartID);

        return "Cart with ID: " + cartID + " Deleted";
    }
}
