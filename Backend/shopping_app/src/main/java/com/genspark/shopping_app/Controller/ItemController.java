package com.genspark.shopping_app.Controller;

import com.genspark.shopping_app.Model.ApiResponse;
import com.genspark.shopping_app.Entity.Item;
import com.genspark.shopping_app.Service.Imp.ItemServiceImp;
import com.genspark.shopping_app.Service.Imp.PopulateServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired
    private ItemServiceImp itemServiceImp;
    @Autowired
    private PopulateServiceImpl populateService;
    @GetMapping("/{iId}")
    public ResponseEntity getItem(@PathVariable int iId){
        try{
            return new ResponseEntity(new ApiResponse("Item found", this.itemServiceImp.getItemByID(iId)), HttpStatus.OK);}
        catch (Exception e){
            return new ResponseEntity(new ApiResponse("Item not found", null), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    public ResponseEntity getAllItems(){
        try{
            return new ResponseEntity(new ApiResponse("Items found", this.itemServiceImp.getAllItems()), HttpStatus.OK);}
        catch (Exception e){
            return new ResponseEntity(new ApiResponse("Items not found", null), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all/{max}")
    public ResponseEntity getAllItems(@PathVariable int max) {
        try{
            return new ResponseEntity(new ApiResponse("Items found", this.itemServiceImp.getAllItemsMax(max)), HttpStatus.OK);}
        catch (Exception e){
            return new ResponseEntity(new ApiResponse("Items not found", null), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/random/{max}")
    public ResponseEntity getRandomMax(@PathVariable int max) {
        try{
            return new ResponseEntity(new ApiResponse("Items found", this.itemServiceImp.getRandomItemsMax(max)), HttpStatus.OK);}
        catch (Exception e){
            return new ResponseEntity(new ApiResponse("Items not found", null), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity addItem(@RequestBody Item item){
        try {
            return new ResponseEntity(new ApiResponse("Item added", this.itemServiceImp.addItem(item)), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(new ApiResponse("Item not found", null), HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/update")
    public ResponseEntity updateItem(@RequestBody Item item){
        try {
            return new ResponseEntity(new ApiResponse("Item updated", this.itemServiceImp.updateItem(item)), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(new ApiResponse("Item not found", null), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{iId}")
    public ResponseEntity deleteItem(@PathVariable int iId) {
        try {
            return new ResponseEntity(new ApiResponse("Item deleted", this.itemServiceImp.deleteItemByID(iId)), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(new ApiResponse(e.getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
