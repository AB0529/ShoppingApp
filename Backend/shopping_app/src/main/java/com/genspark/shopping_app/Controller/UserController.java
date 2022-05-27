package com.genspark.shopping_app.Controller;


import com.genspark.shopping_app.Config.JasyptConfig;
import com.genspark.shopping_app.Entity.Card;
import com.genspark.shopping_app.Entity.Item;
import com.genspark.shopping_app.Model.ApiResponse;
import com.genspark.shopping_app.Entity.User;
import com.genspark.shopping_app.Model.RegisterRequest;
import com.genspark.shopping_app.Model.UserUpdateRequest;
import com.genspark.shopping_app.Service.Imp.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/users")
public class UserController
{
    @Autowired
    private UserServiceImp userServiceImp;
    @Autowired
    private JasyptConfig jasyptConfig;

    @GetMapping("/id/{userId}")
    public ResponseEntity getUserByID(@PathVariable("userId") int userID)
    {
        try {
            User u = userServiceImp.getUserByID(userID);

            return new ResponseEntity(new ApiResponse("User found", u), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity(new ApiResponse("User not found", null), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/username/{id}")
    public ResponseEntity getUserByUsername(@PathVariable("id") String username)
    {
        try {
            User u = userServiceImp.getUserByUsername(username);

            return new ResponseEntity(new ApiResponse("User found", u), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity(new ApiResponse("User not found", null), HttpStatus.NOT_FOUND);

        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequest registerRequest)
    {
        if (registerRequest.getUsername() == null || registerRequest.getPassword() == null)
            return new ResponseEntity(new ApiResponse("Insufficient details", null), HttpStatus.BAD_REQUEST);

        try {
            String hashedPW = jasyptConfig.encryptor().encrypt(registerRequest.getPassword());
            System.out.println(hashedPW);
            User user = new User();
            List<Item> cart = new ArrayList<>();
            Set<Card> cards = new HashSet<>();

            user.setCart(cart);
            user.setCard(cards);

            user.setUserName(registerRequest.getUsername());
            user.setPassWord(hashedPW);

            userServiceImp.addUser(user);
            return new ResponseEntity(new ApiResponse("User created", user), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity(new ApiResponse("User already exists", null), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/update")
    public ResponseEntity update(@RequestBody UserUpdateRequest user) {
        System.out.println(user);
        if (user == null)
            return new ResponseEntity(new ApiResponse("Insufficient details", null), HttpStatus.BAD_REQUEST);
        else if (user.getUsername().isEmpty())
            return new ResponseEntity(new ApiResponse("Username cannot be empty", null), HttpStatus.BAD_REQUEST);

        try {
            User u = userServiceImp.getUserByID(user.getUserID());

            if (user.getUsername() != null)
                u.setUserName(user.getUsername());
            else if (user.getAddress() != null)
                u.setAddress(String.format("%s, %s, %s %d",
                        user.getAddress().getStreet(),
                        user.getAddress().getCity(),
                        user.getAddress().getState(),
                        user.getAddress().getZipcode()));
            else if (user.getCard() != null) {
                Set<Card> cardSet = new HashSet<>();
                cardSet.add(user.getCard());
                u.setCard(cardSet);
            }

            userServiceImp.updateUser(u);

            return new ResponseEntity(new ApiResponse("User updated", user), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(new ApiResponse("Something went wrong!", null), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity authenticate(@RequestBody RegisterRequest registerRequest)
    {
        if (registerRequest.getUsername() == null || registerRequest.getPassword() == null)
            return new ResponseEntity(new ApiResponse("Insufficient details", null), HttpStatus.BAD_REQUEST);

        String hashedPW = jasyptConfig.encryptor().encrypt(registerRequest.getPassword());

        try {
            User user = userServiceImp.getUserByUsername(registerRequest.getUsername());
            if (user.getPassWord().equals(hashedPW))
                return new ResponseEntity(new ApiResponse("User authenticated", user), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity(new ApiResponse("User not found", null), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(new ApiResponse("Login unauthorized", null), HttpStatus.UNAUTHORIZED);
    }
}
