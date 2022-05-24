package com.genspark.shopping_app.Controller;


import com.genspark.shopping_app.Config.JasyptConfig;
import com.genspark.shopping_app.Entity.ApiResponse;
import com.genspark.shopping_app.Entity.User;
import com.genspark.shopping_app.Entity.RegisterRequest;
import com.genspark.shopping_app.Service.Imp.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            user.setUserName(registerRequest.getUsername());
            user.setPassWord(hashedPW);

            userServiceImp.addUser(user);
            return new ResponseEntity(new ApiResponse("User created", null), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity(new ApiResponse("User already exists", null), HttpStatus.CONFLICT);
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
