package com.genspark.shopping_app.Controller;

import com.genspark.shopping_app.Model.ApiResponse;
import com.genspark.shopping_app.Entity.Item;
import com.genspark.shopping_app.Service.Imp.ItemServiceImp;
import com.genspark.shopping_app.Service.Imp.TagServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Iterator;

@RestController
@RequestMapping("/search")
public class SearchController {
    @Autowired
    private ItemServiceImp itemServiceImp;
    @Autowired
    private TagServiceImp tagServiceImp;

    @GetMapping("/tag/{query}")
    public ResponseEntity itemsFromTag(@PathVariable String query) {
        Iterator<Item> items = tagServiceImp.getItemsByTagName(query);

        if (!items.hasNext())
            return new ResponseEntity(new ApiResponse("Item not found", null), HttpStatus.NOT_FOUND);

        return new ResponseEntity(new ApiResponse("Items found", items), HttpStatus.OK);
    }

    @GetMapping("/name/{query}")
    public ResponseEntity itemsFromName(@PathVariable String query) {
        Iterator<Item> items = itemServiceImp.getItemsByName(query);

        if (!items.hasNext())
            return new ResponseEntity(new ApiResponse("Item not found", null), HttpStatus.NOT_FOUND);

        return new ResponseEntity(new ApiResponse("Items found", items), HttpStatus.OK);    }
}
