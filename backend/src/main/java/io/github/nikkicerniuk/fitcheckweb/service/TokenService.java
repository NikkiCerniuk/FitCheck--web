package io.github.nikkicerniuk.fitcheckweb.service;

//1. use a library like jjwt for token generation 
//2. validate the token so you can extract a userID from it
//3. call the token generator in your auth controller and update it in wardrobe controller as well so its not hardcoded 

import io.jsonwebtoken.Jwts; //brings in the main functionality needed for actually using web tokens
import io.jsonwebtoken.SignatureAlgorithm; //allows you to use an algorithm and secret key to validate the token and make sure that it has not been tampered with. keeps things secure 
import io.jsonwebtoken.Claims; //works with the data inside the token. Allows you to read things inside the token like the user's ID, email, and name
import org.springframework.stereotype.Service; //allows us to treat this TokenService class as a service layer
import org.springframework.beans.factory.annotation.Value; //tells springboot to look for the token.secret in the application.properties file 
import java.util.Date;

@Service 
public class TokenService{

    @Value("${token.secret}") //this way springboot knows to check for this in application.properties
    private String secretKey;

    @Value("${token.algorithm}") 
    private String algo;


    private static final long EXPIRATION_TIME_MS = 60 * 60 * 7 * 1000; //7 hours


    public String generateToken(String subject){
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME_MS);
       
    
        SignatureAlgorithm algorithm = SignatureAlgorithm.forName(algo);


        return Jwts.builder() //Jwts.builder actually builds the token but you can chain other things on it to add to what the token returns. the chained methods below are built in so we dont have to delcare them ourselves 
            .setSubject(subject) //subject is the main way to identify the user that the otken is associated with 
            .setIssuedAt(now) //tells you time that the token was issued
            .setExpiration(expiryDate)
            .signWith(algorithm, secretKey)
            .compact(); //final step in token building. Compact actually assebmles all the token and chained information. From there, it finalizes everything.

    }


    //extracts the user's identity from the token 
    public String extractSubject(String token) { //pulls out user information you put in the user token so you can know who the user is later for that request 
        Claims claims = Jwts.parser() //the parser just reads the data. Claims is a class provided by teh Jwt library. claims class holds all the things chained ot the token. parser is how you access these bits of data 
                .setSigningKey(secretKey) //
                .parseClaimsJws(token) 
                .getBody();

        return claims.getSubject();
    }

    //checks if the token is real , untampered with , and not expired 
    public boolean isTokenValid(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token); // parseClaimsJws is a method from the JJWT library. 
            return true; 
        } catch (Exception e) {
            return false;
        }
    }
}

