package com.dobri.springboot.user;

import com.dobri.springboot.Constants;
import com.dobri.springboot.items.Items;
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
public class UserController {

    @Autowired
    private final UserService userService;

    @Autowired
    private final UserRepository userRepository;

//    @GetMapping("/profile/edit")
//    public List<User> getAllItems() {
//
//        return userService.getUsers();
//    }

    @PutMapping("/profile/edit")
    public ResponseEntity<String> editUser(
            @RequestBody User newUserData
    ) {

        String email = newUserData.getEmail();

        System.out.println("---------------------------------------");
        System.out.println("Userdata: " + newUserData);
        System.out.println("Firstname: " + newUserData.getFirstName());
        System.out.println("User Email: " + email);


        try {

            User user = userService.findByEmail(newUserData.getEmail());
            
            System.out.println("User: " + user);

            User updatedUser = user;

            // Update the existing item with the new data
//                updatedUser.setGender(userData.getGender());
            updatedUser.setFirstName(newUserData.getFirstName());
            updatedUser.setLastName(newUserData.getLastName());

            userRepository.save(updatedUser);

            // Return a success response
            return ResponseEntity.ok("User updated successfully");
        } catch (Exception e) {

            // Handle any exceptions, e.g., database errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating User: " + e.getMessage());
        }
    }
}
