package com.genspark.shopping_app.Repository.Services;

import com.genspark.shopping_app.Entity.Order;

import java.util.Optional;

public interface OrderService {
    Order addOrder(Order order);

    Iterable<Order> getOrderByUserID(int userId);

    Optional<Order> getOrrderByID(int iId);

    Order updateOrder(Order order);
}
