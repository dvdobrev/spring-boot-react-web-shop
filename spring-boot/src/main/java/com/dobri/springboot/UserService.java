package com.dobri.springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UsersRepository usersRepository;

    @Autowired
    public UserService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }


    public Users saveUser(Users user) {
        return usersRepository.save(user);
    }

    public void deleteUserById(int id) {
        usersRepository.deleteById(id);
    }

    public Optional<Users> findUserById(int id) {
        return usersRepository.findById(id);
    }

}
