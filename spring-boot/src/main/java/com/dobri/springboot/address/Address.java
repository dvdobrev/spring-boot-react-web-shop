package com.dobri.springboot.address;

import com.dobri.springboot.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author Dobrin Dobrev
 */

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "address")
public class Address {


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
    private Long addressId;

    private String country;
    private String city;
    private String street;
    private String streetNumber;
    private Integer postCode;

    @ManyToOne
    @JoinColumn(name = "customerId")
    private User user;

}