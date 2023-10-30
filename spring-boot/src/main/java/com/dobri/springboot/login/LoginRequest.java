package com.dobri.springboot.login;

import lombok.*;

/**
 * @author Dobrin Dobrev
 */

@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class LoginRequest {
    private String email;
    private String password;
}
