package com.dobri.springboot.items;

import com.dobri.springboot.Clothes;
import com.dobri.springboot.Constants;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * @author Dobrin Dobrev
 */

@CrossOrigin(origins = Constants.REACT_URL)
@RestController
@RequiredArgsConstructor
public class ItemsController {

    @Autowired
    ItemsService itemsService;

    @GetMapping("/")
    public List<Items> getAllClothes() {

        return itemsService.getAllItems();
    }

    @RequestMapping(value = {"/clothes/details/{id}", "/clothes/edit/{id}"}, method = RequestMethod.GET)
    public Items findItemById(@PathVariable int id) {
        Optional<Items> entity = itemsService.findItemById(id);

        return entity.orElse(null);
    }

    @PostMapping("/addClothes")
    public ResponseEntity<Items> addItem(@RequestBody Items items) {
        Items savedItem = itemsService.saveItem(items);
        return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
    }
}
