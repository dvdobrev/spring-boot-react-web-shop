package com.dobri.springboot.items;

import com.dobri.springboot.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

    public void deleteItemById(Long id) {
        itemsRepository.deleteById(id);
    }

    public Items findItemById(Long itemId) {
        return itemsRepository.findById(itemId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

}