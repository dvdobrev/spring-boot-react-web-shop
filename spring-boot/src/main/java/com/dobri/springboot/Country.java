package com.dobri.springboot;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Country {

    @Id
//    @SequenceGenerator(
//            name="clothes_id_sequence",
//            sequenceName = "clothes_id_sequence"
//    )
//    @GeneratedValue(
//            strategy = GenerationType.SEQUENCE,
//            generator = "clothes_id_sequence"
//    )
    @GeneratedValue(strategy = GenerationType.IDENTITY) //TODO: this is from ChatGPT
    private Integer id;

    private String name;
    private Integer plz;
    private String city;


    public Country(String name, Integer plz, String city) {
        this.name = name;
        this.plz = plz;
        this.city = city;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPlz() {
        return plz;
    }

    public void setPlz(Integer plz) {
        this.plz = plz;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
