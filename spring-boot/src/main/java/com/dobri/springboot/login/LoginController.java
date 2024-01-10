package com.dobri.springboot.login;


import com.dobri.springboot.registration.token.VerificationToken;
import com.dobri.springboot.user.User;
import com.dobri.springboot.user.UserDTO;
import com.dobri.springboot.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

/**
 * @author Dobrin Dobrev
 */

@RequiredArgsConstructor
//@CrossOrigin(origins = Constants.REACT_URL)
@RequestMapping("/login")
@RestController
public class LoginController {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @PostMapping
    @ResponseBody
    public ArrayList loginUser(@RequestBody LoginRequest loginRequest) {

        ArrayList loginInfo = new ArrayList<>();

        User user = userService.findByEmail(loginRequest.getEmail());
        long userId = user.getCustomerId();
        boolean isUserValidated = user.getIsEnabled();

        if (isUserValidated) {

            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {

                UserDTO userDTO = new UserDTO();
                userDTO.setEmail(user.getEmail());
                userDTO.setFirstName(user.getFirstName());
                userDTO.setLastName(user.getLastName());
                userDTO.setUserRole(user.getUserRole());
                userDTO.setIsEnabled(user.getIsEnabled());
                userDTO.setCustomerId(user.getCustomerId());
                userDTO.setCustomerId(user.getCustomerId());

                loginInfo.add(userDTO);
                return loginInfo;

            } else {
                loginInfo.add("Password or email does NOT match");
                return loginInfo;
            }

        } else {
            VerificationToken token = userService.findTokenByUser_CustomerId(userId);
            int tokenId = token.getId();
            boolean isTokenExpired = false;

            Date expirationTime = token.getExpirationTime();
            Date currentTime = new Date();

            if (!currentTime.before(expirationTime)) {
                isTokenExpired = true;
            }

            if (isTokenExpired) {
                userService.deleteTokenById(tokenId);
                userService.deleteUserById(userId);
                System.out.println("===============User deleted =================");
                loginInfo.add("Your token is expired. Please register again (you can register with the same email)");
                return loginInfo;
            } else {

                SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm - dd.MM.yyyy");

                // Datum formatieren
                String formattedDate = dateFormat.format(expirationTime);

                loginInfo.add("Please verify your account till: " + formattedDate + " and login again");
                return loginInfo;
            }
        }
    }
}
