package com.genspark.shopping_app.Service.Imp;

import com.genspark.shopping_app.Entity.User;
import com.genspark.shopping_app.Repository.UserRepository;
import com.genspark.shopping_app.Repository.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User addUser(User user) {
        return this.userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        return this.userRepository.save(user);
    }

    @Override
    public User getUserByID(int userID) {
        Optional<User> u = this.userRepository.findById(userID);
        User user = null;
        if(u.isPresent()){
            user = u.get();
        } else {
            throw new RuntimeException("User not found for ID: " + userID);
        }
        return user;
    }

    @Override
    public String deleteUserByID(int userID) {
        this.userRepository.deleteById(userID);

        return "User with ID: " + userID + " Deleted";
    }
}
