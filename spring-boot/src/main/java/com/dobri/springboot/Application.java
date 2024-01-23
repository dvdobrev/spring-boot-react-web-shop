package com.dobri.springboot;


import com.dobri.springboot.items.ItemsService;
import com.dobri.springboot.user.UserService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

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


    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }


}

