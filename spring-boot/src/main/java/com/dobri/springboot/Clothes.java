package com.dobri.springboot;

import jakarta.persistence.*;

@Entity
public class Clothes {


    //    @SequenceGenerator(
//            name="clothes_id_sequence",
//            sequenceName = "clothes_id_sequence"
//    )
//    @GeneratedValue(
//            strategy = GenerationType.SEQUENCE,
//            generator = "clothes_id_sequence"
//    )
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //TODO: this is from ChatGPT
    private Integer item_id;

    private String type;
    private Integer quantity;
    private String gender;
    private String size;
    private String color;
    private float price;
    private String img_link;
    private String description;


    public Clothes(){}

    public Clothes(Integer item_id,
                   String type,
                   Integer quantity,
                   String gender,
                   String size,
                   String color,
                   float price,
                   String img_link,
                   String description) {


        this.item_id = item_id;
        this.type = type;
        this.quantity = quantity;
        this.gender = gender;
        this.size = size;
        this.color = color;
        this.price = price;
        this.img_link = img_link;
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getItem_id() {
        return item_id;
    }

    public void setItem_id(Integer customer_id) {
        this.item_id = customer_id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getImg_link() {
        return img_link;
    }

    public void setImg_link(String img_link) {
        this.img_link = img_link;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
