package com.dobri.springboot.login;


import com.dobri.springboot.user.User;
import com.dobri.springboot.user.UserRepository;
import com.dobri.springboot.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * @author Dobrin Dobrev
 */

@RequiredArgsConstructor
//@CrossOrigin(origins = Constants.REACT_URL)
@RequestMapping("/login")
@RestController
public class LoginController {

    @GetMapping
    public List<User> getUsers() {

        System.out.println("-----------From Login----------------------");

        return  null;
    }


    @Autowired
    UserRepository userRepository;

    @Autowired
    private UserService userService;

    @PostMapping
    @ResponseBody
    public String loginUser(@RequestBody LoginRequest loginRequest) {
        
        System.out.println("---------From Login--------------------");

    Optional<User> user = userService.findByEmail(loginRequest.getEmail());

    System.out.println("User: " + user);
    System.out.println("email: " + loginRequest.getEmail());

    return null;

    }
}
