package com.dobri.springboot.user;

import com.dobri.springboot.exception.UserAlreadyExistsException;
import com.dobri.springboot.registration.RegistrationRequest;
import com.dobri.springboot.registration.token.VerificationToken;
import com.dobri.springboot.registration.token.VerificationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

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
        User user = this.findByEmail(request.email());
        Long userId = null;

        if(user != null && (user.getIsEnabled())) {
            throw new UserAlreadyExistsException("User with that email already exists");
        } else if (user != null && (!user.getIsEnabled())){
            userId = user.getCustomerId();
            VerificationToken token = tokenRepository.findByUserCustomerId(userId);
            User currentUser = token.getUser();

            tokenRepository.delete(token);
            userRepository.delete(currentUser);
        }

        User newUser = new User(userId);
        newUser.setFirstName(request.firstName());
        newUser.setLastName(request.lastName());
        newUser.setEmail(request.email());
        newUser.setPassword(passwordEncoder.encode(request.password()));
        newUser.setUserRole("USER");
        return userRepository.save(newUser);
    }

    public void deleteUserById(long id) {
        userRepository.deleteById(id);
    }

    public VerificationToken findTokenByUser_CustomerId(long userId) {
        return tokenRepository.findTokenByUser_CustomerId(userId);
    }

    public void deleteTokenById(long tokenId) {
        tokenRepository.deleteById(tokenId);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User findUserById(Long customerId) {
        return userRepository.findById(customerId)
                .orElseThrow(() -> new UsernameNotFoundException(USER_NOT_FOUND_MSG));
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
