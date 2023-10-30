package com.dobri.springboot.registration;

public record RegistrationRequest(
        String firstName,
        String lastName,
        String email,
        String password,
        String userRole,
        Boolean locked,
        Boolean enabled) {
}

