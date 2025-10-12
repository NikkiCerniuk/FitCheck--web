package io.github.nikkicerniuk.fitcheckweb.controller;
import org.springframework.web.bind.annotation.*; //front end uses HTTP to talk to backend, backend uses java, then backend responds with HTTP
import org.springframework.http.ResponseEntity; //lets you build detailed HTTP requests
import io.github.nikkicerniuk.fitcheckweb.dto.LoginRequest; // allows spring to map user input (JSON) into a LoginRequest object
import org.springframework.beans.factory.annotation.Autowired;
import io.github.nikkicerniuk.fitcheckweb.service.UserService;
/* job of this file is to handle any post requests made to login or register */

@RestController //handles http requests and returns responses 
@RequestMapping("/api/auth")//any pass with the base path api/auth will route here. this tells spring what request will be routed to the controller

public class AuthController {

@Autowired 
private UserService userService; 


@PostMapping("/login") //means the method below will handle POST requests sent to login.

/*
- means return a response entity with a body of any type and make sure it is available to all classes 
everywhere. spring classes like controller and rest controller must be public 

- LoginRequest is saying take the data from the login that the user inputs and call that loginRequest. 
This is the RequestBody which means that we want to take the JSON and deserialize it into a java object
*/
public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){ //converts the JSON into a login request object 
    if(userService.validateLogin(loginRequest.getEmail(),loginRequest.getPassword())){
        return ResponseEntity.ok("Login Successful");  //ResponseEntity represents the HTTP response
    }else{
        return ResponseEntity.status(401).body("Invalid Credentials"); //status 401 generally is used for authenication issues
    }
}

@PostMapping("/register")//this method will handle POST requests sent to register
/*
 * ResponseEntity is the return type and it is an entire HTML response
 * register is the name of this method
 * @request body is saying take the JSON in the HTTP request body and convert it into a java object
 * 
 * try catch block: point is because some of your code might fail but you dont want it to cause your whole program to crash
 */
public ResponseEntity<?> register(@RequestBody LoginRequest request){
try{
    userService.registerUser(request.getEmail(), request.getPassword());
    return ResponseEntity.ok("User successfully registered");
}catch(RuntimeException e){//RuntimeException is telling the catch block what kind of errors we want to catch here. So if we get any runtime error, the catch block will be exectued.
  /*
   * couldve also done body(e.getMessage) instead of body("x") however this could lead to revealing some high-security risk or unhelpful developer-focused warnings to the user
   */
    return ResponseEntity.badRequest().body("Something went wrong, please try again"); //badRequest creates a response with the HTTP status code. body gets the error message from the event that you caught

}
}

}



