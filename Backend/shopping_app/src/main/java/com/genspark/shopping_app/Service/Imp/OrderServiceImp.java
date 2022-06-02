package com.genspark.shopping_app.Service.Imp;

import com.genspark.shopping_app.Entity.Order;
import com.genspark.shopping_app.Repository.OrderRepository;
import com.genspark.shopping_app.Repository.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderServiceImp  implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order addOrder(Order order) {
        return orderRepository.save(order);
    }
    @Override
    public Iterable<Order> getOrderByUserID(int userId) {
        return orderRepository.findByUserID(userId);
    }

    @Override
    public Optional<Order> getOrrderByID(int iId) {
        return orderRepository.findById(iId);
    }

    @Override
    public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }
}
