package com.dobri.springboot.user;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

/**
 * @author Dobrin Dobrev
 */

@Getter
@Setter
public class UserDTO {

    private Long customer_id;
    private String firstName;
    private String lastName;
    @NaturalId(mutable = true)
    private String email;
    //    private String country;
//    private String city;
//    private String address;
//    private String address_number;
//    private Integer postcode;
//    @Enumerated(EnumType.STRING)
    private String userRole;
    private Boolean isEnabled = false;
}
