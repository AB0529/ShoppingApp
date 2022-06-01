package com.genspark.shopping_app.Controller;

import com.genspark.shopping_app.Entity.Order;
import com.genspark.shopping_app.Entity.User;
import com.genspark.shopping_app.Model.ApiResponse;
import com.genspark.shopping_app.Model.OrderRequest;
import com.genspark.shopping_app.Service.Imp.OrderServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    OrderServiceImp orderServiceImp;

    @PostMapping("/add")
    public ResponseEntity newOrder(@RequestBody OrderRequest orderReq) {
        Order order = new Order();

        order.setCart(orderReq.getCart());
        order.setStatus(0);
        order.setUserID(orderReq.getUserID());

        orderServiceImp.addOrder(order);

        return new ResponseEntity(new ApiResponse("Order added",  order), HttpStatus.OK);
    }

    @GetMapping("/user/{iId}")
    public ResponseEntity getOrderByID(@PathVariable int iId) {
        try{
            return new ResponseEntity(new ApiResponse("Orders found", orderServiceImp.getOrderByUserID(iId)), HttpStatus.OK);}
        catch (Exception e){
            return new ResponseEntity(new ApiResponse("Orders not found", null), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{iId}")
    public ResponseEntity getOrder(@PathVariable int iId) {
        try {
            Optional<Order> order = orderServiceImp.getOrrderByID(iId);

            if (order.isEmpty())
                return new ResponseEntity(new ApiResponse("Order not found", null), HttpStatus.NOT_FOUND);

            return new ResponseEntity(new ApiResponse("Order found", order.get()), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity(new ApiResponse("Order not found", null), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/updateStatus")
    public ResponseEntity updateOrderStatus(@RequestBody OrderUpdateStatusRequest orderReq) {
        try {
            Optional<Order> order = orderServiceImp.getOrrderByID(orderReq.getOrderID());

            if (order.isEmpty())
                return new ResponseEntity(new ApiResponse("Order not found", null), HttpStatus.NOT_FOUND);

            order.get().setStatus(orderReq.getStatus());

            orderServiceImp.updateOrder(order.get());

            return new ResponseEntity(new ApiResponse("Order updated", order.get()), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity(new ApiResponse("Order not found", null), HttpStatus.NOT_FOUND);
        }
    }
}
