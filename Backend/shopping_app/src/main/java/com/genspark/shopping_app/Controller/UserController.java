package com.genspark.shopping_app.Controller;


import com.genspark.shopping_app.Entity.User;
import com.genspark.shopping_app.Entity.Authentication;
import com.genspark.shopping_app.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController
{
    @Autowired
    private final UserRepository userRepository;


    public UserController(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    @GetMapping("/{userID}")
    public ResponseEntity getUserByID(@RequestParam(value = "userID") int userID)
    {
        Optional<User> u = userRepository.findById(userID);

        if (u.isPresent())
        {
            return new ResponseEntity<User>(u.get(), HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    @PostMapping("/register")
    public ResponseEntity register(Authentication authentication)
    {
        return new ResponseEntity<Authentication>(authentication, HttpStatus.CREATED);
    }

    @PostMapping("/authenticate")
    public void authenticate(Authentication authentication)
    {
    }
}
