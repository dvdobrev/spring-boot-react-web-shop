package com.dobri.springboot.address;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author Dobrin Dobrev
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddressDTO {
    private Long addressId;
    private String country;
    private String city;
    private String street;
    private String streetNumber;
    private Integer postCode;
}
