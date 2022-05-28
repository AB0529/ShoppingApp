package com.genspark.shopping_app;

import com.genspark.shopping_app.Service.Imp.ItemServiceImp;
import com.genspark.shopping_app.Service.Imp.PopulateServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ShoppingAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShoppingAppApplication.class, args);
	}

}
