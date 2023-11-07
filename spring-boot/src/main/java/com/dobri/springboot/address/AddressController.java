package com.dobri.springboot.address;

import com.dobri.springboot.Constants;
import com.dobri.springboot.items.Items;
import com.dobri.springboot.user.User;
import com.dobri.springboot.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
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
    public Stream<Object> getAllUserAddresses(@RequestHeader("X-Customer-Id") Long customerId) {
        
        System.out.println("addressservice:  " + addressService);

        List<Address> addresses = addressService.findAddressesByCustomerId(customerId);
        Stream<Object> addressesDTO = addresses.stream()
                .map(address -> new AddressDTO(address.getAddressId(),
                        address.getCountry(),
                        address.getCity(),
                        address.getStreet(),
                        address.getStreetNumber(),
                        address.getPostCode()));
        return addressesDTO;
    }

    @GetMapping("/address/edit/{addressId}")
    public Optional<Address> getAddressById(@PathVariable Long addressId){

        return addressService.findAddressById(addressId);
    }


    @PostMapping("/addAddress")
    public ResponseEntity<Address> addAddress(@RequestBody Address address) {

        User user = userService.findByEmail(address.getUser().getEmail());

        address.setUser(user);

        Address newAddress = addressService.saveAddress(address);
        return new ResponseEntity<>(newAddress, HttpStatus.CREATED);
    }

    @PutMapping("/address/edit/{addressId}")
    public ResponseEntity<String> updatedAddress(
            @PathVariable Long addressId,
            @RequestBody Address updatedAddress
    ) {
        try {

            Optional<Address> existingAddress = addressService.findAddressById(addressId);

            if (existingAddress.isPresent()) {
                Address newAddress = existingAddress.get();
                newAddress.setCountry(updatedAddress.getCountry());
                newAddress.setCity(updatedAddress.getCity());
                newAddress.setStreet(updatedAddress.getStreet());
                newAddress.setStreetNumber(updatedAddress.getStreetNumber());
                newAddress.setPostCode(updatedAddress.getPostCode());

                addressService.saveAddress(newAddress);

            } else {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok("Item updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating item: " + e.getMessage());
        }
    }

    @DeleteMapping("/profile/address/delete/{addressId}")
    public void deleteItemById(@PathVariable Long addressId) {
        System.out.println("----------------From Delete Address");
        System.out.println("Id: " + addressId);

        addressService.deleteAddressById(addressId);
    }
}
