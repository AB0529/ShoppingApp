package com.genspark.shopping_app.Repository;

import com.genspark.shopping_app.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

//repo for users
public interface UserRepository extends JpaRepository<User,Integer> {
}
