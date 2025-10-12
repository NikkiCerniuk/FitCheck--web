/*
here we are trying to map a java object known as "User" to a database table */


package io.github.nikkicerniuk.fitcheckweb.model; //allows springboot to find your classes


//jakarta package allows java objects to interact with the DB
import jakarta.persistence.Column;//allows you to say this data belongs in a column of the DB table
import jakarta.persistence.Entity; //allows for java representation of each table (for tables think sheets like excel) 
import jakarta.persistence.GeneratedValue;//allows you to automatically assign IDs when you create new users in the DB
import jakarta.persistence.GenerationType;//determines what type to use for the randomly generated and assigned IDs
import jakarta.persistence.Id; // allows for a primary key for each entity in the table 
import jakarta.persistence.Table;// lets you map your java class to a specific table 
import org.hibernate.annotations.CreationTimestamp; // list the data and time whenever a new row is created 
import java.time.LocalDateTime;//LocalDateTime java type representing the date time 


@Entity
@Table(name = "users")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(unique=true,nullable=false)
    private String email;

    @Column(nullable=false)
    private String password; //TO DO: need to hash this elsewhere

    @CreationTimestamp
    private LocalDateTime createdAt;


    //setters and getters to make edits to what is stored in the DB
    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }


    public LocalDateTime getCreatedAt(){
        return createdAt;
    } 

    public void setCreatedAt(LocalDateTime createdAt){
        this.createdAt = createdAt;
    }

}