package com.dobri.springboot.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * @author Dobrin Dobrev
 */

@Configuration
@EnableWebSecurity
public class UserRegistrationSecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        return http.cors()
//                .and().csrf().disable()
//                .authorizeHttpRequests()
//                .requestMatchers("/register/**")
//                .permitAll()
//                .and()
//                .authorizeHttpRequests()
//                .requestMatchers("/users/**")
//                .hasAnyAuthority("USER", "ADMIN")
//                .and().formLogin()
//                .and().headers().addHeaderWriter((request, response) -> {
//                    if (request.getMethod().equals("OPTIONS")) {
//                        response.setStatus(HttpServletResponse.SC_OK);
//                    } else {
//                        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your React app URL
//                        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//                        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//                    }
//                })
//                .and().build();
//    }


    @Bean
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests
                                .anyRequest().permitAll()
                )
                .csrf().disable()
                .oauth2Login(Customizer.withDefaults())
                .formLogin().disable();

        return http.build();
    }
}
