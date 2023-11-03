package com.dobri.springboot.items;

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
@Table(name = "items")
public class Items {

    //    @SequenceGenerator(
//            name="clothes_id_sequence",
//            sequenceName = "clothes_id_sequence"
//    )
//    @GeneratedValue(
//            strategy = GenerationType.SEQUENCE,
//            generator = "clothes_id_sequence"
//    )
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    private String type;
    private Integer quantity;
    private String gender;
    private String size;
    private String color;
    private float price;
    private String img_link;
    private String description;

}
