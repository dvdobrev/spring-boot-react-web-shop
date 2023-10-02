package com.dobri.springboot;

import jakarta.persistence.*;


@Entity
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer customer_id;
    private String email;
    private String password;
    private String country;
    private String city;
    private String address;
    private String address_number;
    private Integer postcode;

    public Users() {
    }

    public Users(Integer customer_id,
                 String email,
                 String password,
                 String country,
                 String city,
                 String address,
                 String address_number,
                 Integer postcode) {

        this.customer_id = customer_id;
        this.email = email;
        this.password = password;
        this.country = country;
        this.city = city;
        this.address = address;
        this.address_number = address_number;
        this.postcode = postcode;
    }

    public Integer getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(Integer customer_id) {
        this.customer_id = customer_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddress_number() {
        return address_number;
    }

    public void setAddress_number(String address_number) {
        this.address_number = address_number;
    }

    public Integer getPostcode() {
        return postcode;
    }

    public void setPostcode(Integer postcode) {
        this.postcode = postcode;
    }

}
