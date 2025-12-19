package io.github.nikkicerniuk.fitcheckweb.security;  //delares what package this current file is part of 

//runs before every request and checks for a valid token. blocks any requests that do not contain a valid token.

import io.github.nikkicerniuk.fitcheckweb.service.TokenService;
import jakarta.servlet.FilterChain; //passes the request forward from filter to filter 

import jakarta.servlet.ServletException;// servlet handles incoming HTTP requests before they reach your application code 
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component; // component till spring, make an object for this class and treat it like a bean
import org.springframework.web.filter.OncePerRequestFilter; //only one auth check per http request 
import java.io.IOException; //allows your filter to throw network / stream realated errors (connectivity issues)

@Component
public class JwtAuthFilter extends OncePerRequestFilter{


@Autowired
private TokenService tokenService;

@Override
protected void doFilterInternal (HttpServletRequest request, 
    HttpServletResponse response, FilterChain filterChain)

    //lets login and registration requests through without checking for a token. user wouldnt be able to login or register if they alredady need a tokne 
    throws ServletException, IOException{

 String path = request.getRequestURI();


        if (path.startsWith("/api/auth/")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String token = authHeader.substring(7);


        if(!tokenService.isTokenValid(token)){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }


        filterChain.doFilter(request, response);
    }


}
