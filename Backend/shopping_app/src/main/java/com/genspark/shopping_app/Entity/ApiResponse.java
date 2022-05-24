package com.genspark.shopping_app.Entity;

import org.springframework.http.HttpStatus;

public class Response {
    private HttpStatus status;
    private String message;
    private Object result;

    public Response(String message, Object result) {
        this.message = message;
        this.result = result;
    }
    public Response(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }
    public Response(HttpStatus status, String message, Object result) {
        this.status = status;
        this.message = message;
        this.result = result;
    }
    public Response() {}

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
