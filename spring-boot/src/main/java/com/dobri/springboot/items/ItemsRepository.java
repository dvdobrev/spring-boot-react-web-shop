package com.dobri.springboot.items;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Dobrin Dobrev
 */


public interface ItemsRepository extends JpaRepository <Items, Integer> {
}
