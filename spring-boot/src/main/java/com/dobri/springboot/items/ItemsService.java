package com.dobri.springboot.items;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Dobrin Dobrev
 */

@Service
public class ItemsService {
    private final ItemsRepository itemsRepository;
    @Autowired
    public ItemsService(ItemsRepository itemsRepository) {
        this.itemsRepository = itemsRepository;
    }

    public List<Items> getAllItems() {
        return itemsRepository.findAll();
    }

    public Items saveItem(Items items) {

        return itemsRepository.save(items);
    }

    public void deleteItemById(int id) {
        itemsRepository.deleteById(id);
    }

    public Optional<Items> findItemById(int id) {
        return itemsRepository.findById(id);
    }
}