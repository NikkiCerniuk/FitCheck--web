package io.github.nikkicerniuk.fitcheckweb.service;//package declaration 

import io.github.nikkicerniuk.fitcheckweb.repository.UserRepository;//import the user repo
import io.github.nikkicerniuk.fitcheckweb.model.User;//import user
import org.springframework.beans.factory.annotation.Autowired; //found by googling "@Autowired site:docs.spring.io" //autowired says use this instance of the bean everywhere. do not create a new bean with each object you create
import org.springframework.security.crypto.password.PasswordEncoder; //found by googling @PasswordEncoder site:docs.spring.io
import org.springframework.stereotype.Service; //import service: service means "this class contains buisness logic: manage it as a bean so that it can be automatically injected elsewhere"

import java.util.Optional;//import optional


@Service

public class UserService{
//whole thing is part of service class 

@Autowired //shared bean instance
private UserRepository userRepository;

@Autowired //shared bean instance 
private PasswordEncoder passwordEncoder;

public User registerUser(String email, String password){
    if(userRepository.existsByEmail(email)){
        throw new RuntimeException("Email already exists");
    }

    User user = new User(); //create a new user
    user.setEmail(email); //set the email they entered as their email
    user.setPassword(passwordEncoder.encode(password)); //encode their password and set that up as their password
    return userRepository.save(user); //return the user that you saved to the DB
}


public boolean validateLogin(String email, String password){
   Optional<User>userOptional = userRepository.findByEmail(email); //helps us handl instances where the email does and does not exist 
    if(userOptional.isPresent()){
    User user = userOptional.get();    //if the email is present, get all the info for teh user from the user repo. 
    return passwordEncoder.matches(password, user.getPassword());            // return a boolean that lets you know if the password matches or not
    }
    return false;
}
}