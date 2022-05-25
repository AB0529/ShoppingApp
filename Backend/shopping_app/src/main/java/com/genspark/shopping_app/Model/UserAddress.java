package com.genspark.shopping_app.Model;

import com.genspark.shopping_app.Entity.User;

import javax.persistence.*;

@Entity
public class UserAddress {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    private String street;
    private String city;
    private String state;
    private int zipcode;

    @OneToOne(cascade= CascadeType.ALL)
    @JoinColumn(name = "address")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getZipcode() {
        return zipcode;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getStreet() {
        return street;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public void setZipcode(int zipcode) {
        this.zipcode = zipcode;
    }
}
