package com.dobri.springboot;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClothesRepository extends JpaRepository< Clothes, Integer>  {
}
