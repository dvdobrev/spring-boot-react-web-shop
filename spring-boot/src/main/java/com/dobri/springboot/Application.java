package com.dobri.springboot;

import com.dobri.springboot.items.Items;
import com.dobri.springboot.items.ItemsService;
import com.dobri.springboot.user.UserService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@SpringBootApplication
@RestController
@Validated
public class Application {

//    private final String reactURL = "http://localhost:3000";

    private final UserService userService;
    private final ItemsService itemsService;


    public Application(UserService userService, ItemsService itemsService) {
        this.userService = userService;
        this.itemsService = itemsService;
    }

//    @Bean
//    public BCryptPasswordEncoder bCryptPasswordEncoder() {
//        return new BCryptPasswordEncoder();
//    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

//    @CrossOrigin(origins = Constants.REACT_URL)
//    @RequestMapping(value = {"/clothes/details/{id}", "/clothes/edit/{id}"}, method = RequestMethod.GET)
//    public Clothes findItemById(@PathVariable int id) {
//        Optional<Clothes> entity = clothesService.findItemById(id);
//
//        return entity.orElse(null);
//    }



//    @CrossOrigin(origins = "http://localhost:3000")
//    @PutMapping("/data")
//    public void editName(@RequestBody Map<String, String> request) {
//        String newName = request.get("name");
//        System.out.println(request.get("name"));
//
//        responseName.put("name", newName);
//    }

//    }
//

}

