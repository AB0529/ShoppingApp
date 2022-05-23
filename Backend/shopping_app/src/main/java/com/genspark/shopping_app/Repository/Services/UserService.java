package com.genspark.shopping_app.Repository.Services;

import com.genspark.shopping_app.Entity.User;

public interface UserService {

    User addUser(User user);
    User updateUser(User user);
    User getUserByID(int userID);
    String deleteUserByID(int userID);



}
