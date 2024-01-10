package com.dobri.springboot.user;

import com.dobri.springboot.registration.token.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

}
