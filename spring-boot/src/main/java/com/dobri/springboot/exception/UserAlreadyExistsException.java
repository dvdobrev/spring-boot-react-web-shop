package com.dobri.springboot.exception;

/**
 * @author Dobrin Dobrev
 */


public class UserAlreadyExistsException extends RuntimeException {

    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
