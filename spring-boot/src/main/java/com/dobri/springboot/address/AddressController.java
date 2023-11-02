package com.dobri.springboot.address;

import com.dobri.springboot.Constants;
import com.dobri.springboot.user.User;
import com.dobri.springboot.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Stream;

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

    @GetMapping("/profile")
    public Stream<Object> getAllUserAddresses(@RequestHeader("X-Customer-Id") String customerId) {

        List<Address> addresses = addressService.findAddressesByCustomerId(Long.valueOf(customerId));
        Stream<Object> addressesDTO = addresses.stream()
                .map(address -> new AddressDTO(address.getAddressId(),
                        address.getCountry(),
                        address.getCity(),
                        address.getStreet(),
                        address.getStreetNumber(),
                        address.getPostCode()));
        
        System.out.println("addressesDTO: " + addressesDTO);

        return addressesDTO;
    }


    @PostMapping("/addAddress")
    public ResponseEntity<Address> addAddress(@RequestBody Address address) {

        User user = userService.findByEmail(address.getUser().getEmail());

        // Set the User in the Address entity
        address.setUser(user);

        Address newAddress = addressService.saveAddress(address);
        return new ResponseEntity<>(newAddress, HttpStatus.CREATED);
    }

    @DeleteMapping("/profile/address/delete/{addressId}")
    public void deleteItemById(@PathVariable Long addressId) {
        System.out.println("----------------From Delete Address");
        System.out.println("Id: " + addressId);

        addressService.deleteAddressById(addressId);
    }
}
