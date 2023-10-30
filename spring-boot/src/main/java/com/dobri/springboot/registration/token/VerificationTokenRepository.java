package com.dobri.springboot.registration.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * @author Dobrin Dobrev
 */


public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    VerificationToken findByToken(String token);
    @Query("SELECT vt FROM VerificationToken vt WHERE vt.user.customer_id = :userId")
    VerificationToken findByUserId(@Param("userId") Long userId);
}
