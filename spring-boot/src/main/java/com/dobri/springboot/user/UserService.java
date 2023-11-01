package com.dobri.springboot.user;

import com.dobri.springboot.exception.UserAlreadyExistsException;
import com.dobri.springboot.registration.RegistrationRequest;
import com.dobri.springboot.registration.token.VerificationToken;
import com.dobri.springboot.registration.token.VerificationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final VerificationTokenRepository tokenRepository;

    private final static String USER_NOT_FOUND_MSG = "user with email %s not found";


    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User registerUser(RegistrationRequest request) {
        Optional<User> user = this.findByEmail(request.email());

        if(user.isPresent() && (user.get().getIsEnabled())) {
            throw new UserAlreadyExistsException("User with that email already exists");
        } else if (user.isPresent() && (!user.get().getIsEnabled())){
            Long user_id = user.get().getCustomerId();
            VerificationToken token = tokenRepository.findByUserCustomerId(user_id);
            User currentUser = token.getUser();

            tokenRepository.delete(token);
            userRepository.delete(currentUser);
        }

        User newUser = new User();
        newUser.setFirstName(request.firstName());
        newUser.setLastName(request.lastName());
        newUser.setEmail(request.email());
        newUser.setPassword(passwordEncoder.encode(request.password()));
        newUser.setUserRole("USER");
        return userRepository.save(newUser);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void saveUserVerificationToken(User theUser, String verificationToken) {

    }

    @Override
    public void saveVerificationToken(User theUser, String token) {
        var verificationToken = new VerificationToken(token, theUser);
        tokenRepository.save(verificationToken);
    }

    @Override
    public String validateToken(String theToken) {
        VerificationToken token = tokenRepository.findByToken(theToken);
        if (token == null) {
            return "Invalid verification token";
        }

        User user = token.getUser();

        Calendar calender = Calendar.getInstance();
        if ((token.getExpirationTime().getTime() - calender.getTime().getTime()) <= 0) {
            tokenRepository.delete(token);
            userRepository.delete(user);
            return "Token already expired";
        }
        user.setIsEnabled(true);
        userRepository.save(user);
        tokenRepository.delete(token);
        return "valid";
    }
}
