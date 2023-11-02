package com.dobri.springboot.address;

import com.dobri.springboot.Constants;
import com.dobri.springboot.user.User;
import com.dobri.springboot.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Dobrin Dobrev
 */

@CrossOrigin(origins = Constants.REACT_URL)
@RestController
@RequiredArgsConstructor
public class AddressController {

    @Autowired
    AddressService addressService;

    @Autowired
    UserService userService;

    @PostMapping("/addAddress")
    public ResponseEntity<Address> addAddress(@RequestBody Address address) {

        System.out.println("------------------------------Address post Mapping");
        System.out.println("Email: " + address.getUser().getEmail());

        // Retrieve the User entity from the database
        User user = userService.findByEmail(address.getUser().getEmail());
        
        System.out.println("-------------------------------");
        System.out.println("User: " + user);

        // Set the User in the Address entity
        address.setUser(user);

        Address newAddress = addressService.saveAddress(address);
        return new ResponseEntity<>(newAddress, HttpStatus.CREATED);
    }
}
