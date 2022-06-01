package com.genspark.shopping_app.Controller;

public class OrderUpdateStatusRequest {
    private int orderID;
    private int status;

    public int getStatus() {
        return status;
    }

    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
