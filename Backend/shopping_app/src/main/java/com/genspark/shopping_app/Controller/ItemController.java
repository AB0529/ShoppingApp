package com.genspark.shopping_app.Controller;

import com.genspark.shopping_app.Entity.Item;
import com.genspark.shopping_app.Repository.Services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/{iId}")
    public ResponseEntity getItem(@PathVariable int iId){
        try{
            return new ResponseEntity(this.itemService.getItemByID(iId), HttpStatus.OK);}
        catch (Exception e){
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/")
    public ResponseEntity addItem(@RequestBody Item item){
        try {
            return new ResponseEntity(this.itemService.addItem(item),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(null,HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/")
    public ResponseEntity updateItem(@RequestBody Item item){
        try {
            return new ResponseEntity(this.itemService.updateItem(item), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(null,HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{iId}")
    public ResponseEntity deleteItem(@PathVariable int iId){
        return new ResponseEntity(this.itemService.deleteItemByID(iId),HttpStatus.OK);
    }

}
