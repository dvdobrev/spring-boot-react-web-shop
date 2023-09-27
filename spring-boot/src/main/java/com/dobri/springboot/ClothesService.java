package com.dobri.springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClothesService {
    private final ClothesRepository clothesRepository;

    @Autowired
    public ClothesService(ClothesRepository clothesRepository) {
        this.clothesRepository = clothesRepository;
    }

    public List<Clothes> getAllClothes() {
        return clothesRepository.findAll();
    }

    public Clothes saveClothes(Clothes clothes) {
        // Add any business logic or validation here if needed
        return clothesRepository.save(clothes);
    }

    // Add other service methods as needed
}
