package com.genspark.shopping_app.Repository;

import com.genspark.shopping_app.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//repo for users
public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByPassWord(String password);
    Optional<User> findByUserName(String username);
}
