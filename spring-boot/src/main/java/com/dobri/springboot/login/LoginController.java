package com.dobri.springboot.login;


import com.dobri.springboot.user.User;
import com.dobri.springboot.user.UserDTO;
import com.dobri.springboot.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.util.Optional;

/**
 * @author Dobrin Dobrev
 */

@RequiredArgsConstructor
//@CrossOrigin(origins = Constants.REACT_URL)
@RequestMapping("/login")
@RestController
public class LoginController {

    private final PasswordEncoder passwordEncoder;


//    @GetMapping
//    public List<User> getUsers() {
//
//        return  null;
//    }


    @Autowired
    private UserService userService;

    @PostMapping
    @ResponseBody
    public UserDTO loginUser(@RequestBody LoginRequest loginRequest) {

        User user = userService.findByEmail(loginRequest.getEmail());
        System.out.println("User ID----------" + user.getCustomerId());

        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {

            UserDTO userDTO = new UserDTO();
            userDTO.setEmail(user.getEmail());
            userDTO.setFirstName(user.getFirstName());
            userDTO.setLastName(user.getLastName());
            userDTO.setUserRole(user.getUserRole());
            userDTO.setIsEnabled(user.getIsEnabled());
            userDTO.setCustomerId(user.getCustomerId());
            userDTO.setCustomerId(user.getCustomerId());

            return userDTO;

        } else {
            System.out.println("Password or Email Does Not Match");
            return null;
        }
    }

}
