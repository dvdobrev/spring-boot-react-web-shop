package com.dobri.springboot.address;

import com.dobri.springboot.items.Items;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author Dobrin Dobrev
 */


public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findByUserCustomerId(Long customerId);

}
