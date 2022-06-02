package com.genspark.shopping_app.Repository;

import com.genspark.shopping_app.Entity.Item;
import com.genspark.shopping_app.Entity.Order;
import com.genspark.shopping_app.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {
    Iterable<Order> findByUserID(int userID);
}
