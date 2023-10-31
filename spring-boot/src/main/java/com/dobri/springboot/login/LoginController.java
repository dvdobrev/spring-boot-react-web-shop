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

        Optional<User> user = userService.findByEmail(loginRequest.getEmail());


        if (user.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword())) {

            UserDTO userDTO = new UserDTO();
            userDTO.setEmail(user.get().getEmail());
            userDTO.setFirstName(user.get().getFirstName());
            userDTO.setLastName(user.get().getLastName());
            userDTO.setUserRole(user.get().getUserRole());
            userDTO.setIsEnabled(user.get().getIsEnabled());
            userDTO.setCustomer_id(user.get().getCustomer_id());

            return userDTO;

        } else {
            System.out.println("Password or Email Does Not Match");
            return null;
        }
    }

}
