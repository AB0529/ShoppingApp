package com.genspark.shopping_app.Controller;


import com.genspark.shopping_app.Config.JasyptConfig;
import com.genspark.shopping_app.Entity.User;
import com.genspark.shopping_app.Entity.RegisterRequest;
import com.genspark.shopping_app.Service.Imp.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLIntegrityConstraintViolationException;

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

            return new ResponseEntity(u, HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");

        }
    }

    @GetMapping("/username/{id}")
    public ResponseEntity getUserByUsername(@PathVariable("id") String username)
    {
        try {
            User u = userServiceImp.getUserByUsername(username);

            return new ResponseEntity(u, HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");

        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequest registerRequest)
    {
        if (registerRequest.getUsername() == null || registerRequest.getPassword() == null)
            return new ResponseEntity(null, HttpStatus.BAD_REQUEST);

        try {
            String hashedPW = jasyptConfig.encryptor().encrypt(registerRequest.getPassword());
            System.out.println(hashedPW);
            User user = new User();
            user.setUserName(registerRequest.getUsername());
            user.setPassWord(hashedPW);

            userServiceImp.addUser(user);
            return new ResponseEntity(user, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.CONFLICT);
        }

    }

    @PostMapping("/authenticate")
    public ResponseEntity authenticate(@RequestBody RegisterRequest registerRequest)
    {
        if (registerRequest.getUsername() == null || registerRequest.getPassword() == null)
            return new ResponseEntity(null, HttpStatus.BAD_REQUEST);

        String hashedPW = jasyptConfig.encryptor().encrypt(registerRequest.getPassword());

        try {
            User user = userServiceImp.getUserByUsername(registerRequest.getUsername());
            if (user.getPassWord().equals(hashedPW))
                return new ResponseEntity(user, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
    }
}
