package com.genspark.shopping_app.Entity;

import org.springframework.http.HttpStatus;

public class ApiResponse {
    private HttpStatus status;
    private String message;
    private Object result;

    public ApiResponse(String message, Object result) {
        this.message = message;
        this.result = result;
    }
    public ApiResponse(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }
    public ApiResponse(HttpStatus status, String message, Object result) {
        this.status = status;
        this.message = message;
        this.result = result;
    }
    public ApiResponse() {}

    public Object getResult() {
        return result;
    }

    public String getMessage() {
        return message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setResult(Object result) {
        this.result = result;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }
}
