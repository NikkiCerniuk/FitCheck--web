package io.github.nikkicerniuk.fitcheckweb.dto;
//point of file is to create a data transfer object (DTO). this is the data that will be taken from the front end and sent to the backend
public class LoginRequest{
    private String email;
    private String password;

//constructor
    public LoginRequest(){

    }

//getters and setter creation for email and password 
public String getEmail(){
    return email;

}

public String getPassword(){
    return password;
}

public void setEmail(String email){
    this.email = email;// says this instance of the email is equal to email
}

public void setPassword(String password){
    this.password = password;
}
}