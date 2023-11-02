package com.dobri.springboot.address;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Dobrin Dobrev
 */

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    @Autowired
    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public Address saveAddress(Address address) {

        return addressRepository.save(address);
    }

    public void deleteAddressById(long id) {
        addressRepository.deleteById(id);
    }

    public Optional<Address> findAddressById(int id) {
        return addressRepository.findById(Long.valueOf(id));
    }

    public List<Address> findAddressesByCustomerId(Long customerId) {
        return addressRepository.findByUserCustomerId(customerId);
    }
}
