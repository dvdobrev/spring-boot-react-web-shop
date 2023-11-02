package com.dobri.springboot.user;


import com.dobri.springboot.registration.RegistrationRequest;

import java.util.List;

public interface IUserService {
    List<User> getUsers();
    User registerUser(RegistrationRequest request);
    User findByEmail(String email);

    User findUserById(Long customerId);

    void saveUserVerificationToken(User theUser, String verificationToken);

    void saveVerificationToken(User theUser, String token);

    String validateToken(String theToken);
}



