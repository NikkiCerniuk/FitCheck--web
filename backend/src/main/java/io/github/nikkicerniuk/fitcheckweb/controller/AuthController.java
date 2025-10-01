package io.github.nikkicerniuk.fitcheckweb.controller;
import org.springframework.web.bind.annotation.*; //front end uses HTTP to talk to backend, backend uses java, then backend responds with HTTP
import org.springframework.http.ResponseEntity; //lets you build detailed HTTP requests
import io.github.nikkicerniuk.fitcheckweb.dto.LoginRequest;



@RestController //handles http requests and returns responses 
@RequestMapping("/api/auth")//any pass with the base path api/auth will route here. this tells spring what request will be routed to the controller

public class AuthController {

@PostMapping("/login") //means the method below will handle POST requests sent to login.

/*
- means return a response entity with a body of any type and make sure it is available to all classes 
everywhere. spring classes like controller and rest controller must be public 

- LoginRequest is saying take the data from the login that the user inputs and call that loginRequest. 
This is the RequestBody which means that we want to take the JSON and deserialize it into a java object
*/
public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){ //converts the JSON into a login request object 

    //tODO: hardcoded test password and email attempt. remove and adjust later
    String testEmail = "foo@example.com"; 
    String testPassword = "password123!";


    if(testEmail.equals(loginRequest.getEmail()) && testPassword.equals(loginRequest.getPassword())){ //spring deserializes the JSON by calling the setters on that object 
        return ResponseEntity.ok("Login Successful");  //ResponseEntity represents the HTTP response
    }else{
        return ResponseEntity.status(401).body("Invalid Credentials"); //status 401 generally is used for authenication issues
    }

}

}