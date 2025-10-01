/*by default, springboot security settings block all endpoints until a user is authenticated. Therefore, you cant access api/auth/login without being authenticated.However, you need to reach api/auth/login to actually login to the app and achieve autheticiation. 

Objective: bypass springboot security so that anyone can reach the login page before being authenticated
*/


package io.github.nikkicerniuk.fitcheckweb;  //delares what package this current file is part of 

import org.springframework.context.annotation.Bean;// bean class allows us to make an object and then have spring manage that object 
import org.springframework.context.annotation.Configuration; //we have to import configuration so that spring boot will recongize bean objects 
import org.springframework.security.config.annotation.web.builders.HttpSecurity; //allows developer to specify what endpoints require authorization, control permissions, and disable certain protections. HttpSecurity is the tool you use to build your security rules
import org.springframework.security.web.SecurityFilterChain; //security filter chain is the finished set of security rules that springwork uses for your app 

import org.springframework.web.cors.CorsConfiguration; //holds the rules (orgins, methods, headers)
import org.springframework.web.cors.CorsConfigurationSource; //uses spring to look up what rules apply
import org.springframework.web.cors.UrlBasedCorsConfigurationSource; //impliments the specific rules determined by CorsConfigurationSource

import java.util.Arrays; //in this instance we are using this to build arrays of strings quickly 

@Configuration
public class SecurityConfig{

    @Bean

    /*
     * SecurityFilterChain is the finished set of rules we are returning 
     * the type HttpSecurity and object http is what we use to build the rules
     * throws Exception is needed here because HttpSecurity can throw exceptions. Otherwise, the compiler will complain.
     */
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{ 
        http
            //TODO: re-enable CSRF later. we are just making sure that the front end is connected to the backend 
        .cors(cors->cors.configurationSource(corsConfigurationSource())) //gives a bean to springboot that lets it know what requests for webstie access to allow 
        .csrf(csrf->csrf.disable())  //stands for cross site request forgery 
        .authorizeHttpRequests(auth-> auth
        .requestMatchers("/api/auth/**").permitAll()
        .anyRequest().authenticated() //means "any other request besides /api/auth/** neeeds to be authenticated"
        );
        return http.build(); //we call http build bc that is the finalized version of http. returning just http wouldnt complie 
    }



/*
 * CORS: Cross-orgin resource sharing. 
 *  -controls whether a webpage (frontend) is allowed to make requests to a different orign (backend). 
 *  Objective: we need to explicitly give it permission to do this
 *  
 */

 @Bean //bean: means that below this will be another object that can be managed by springboot 



 /*
- corsConfigurationSource(): creates a spring bean object of type CorsConfigurationSource
- CorsConfigurationSource: lookup function for CORS rules. This lookup function is URL specific
-  CorsConfiguration: CORS rules are stored here. this is a plain rule object. 
- UrlBasedCorsConfigurationSource: impliments rules specified by CorsConfigurationSource 

- GET: retrieve data. Read only on the server
- POST: send data and create something new on the server
- PUT: update existing resource on the server with new data 
- DELETE: remove a resource from server
- OPTIONS: a precheck. asks server which methods are allowed before sending the real request. avoids wasting bandwith with failed requests + avoids hitting senstive endpoints

*/
 public CorsConfigurationSource corsConfigurationSource(){
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); //allow request from front end. we do "Arrays.asList" here because setAllowedOrgins expects a list
    configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*")); // TO DO: change this later from allowing all headers to only allowing the specific headers that you need. impacts the precheck approval/denial
    configuration.setAllowCredentials(true); //TO DO: consider changing this to stateless  tokens (Java web tokens) instead of cookies for increased security after MVP
    
UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(); //creates new object.
source.registerCorsConfiguration("/api/**", configuration);  //apply CORS to all /api/ endpoints. means anytime you see "/api/**" apply configuration
return source;
}
}




