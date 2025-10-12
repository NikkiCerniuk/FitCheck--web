/*
 * this defines what you can do with user data not how to do it.
 * 
 * fixed: package declaration not recongized by:
 * -   mvn clean install -Dskiptests
 *              - rebuilds your project and updates maven's model. this means
 *               deleting everything in the target folder like complied .class folders and recompling
 * -   >Java: Clean Java Language Server Workspace 
 *              - deletes VS code's internal cache, restarts Java's language server, reconnects to maven
*/
package io.github.nikkicerniuk.fitcheckweb.repository;


import io.github.nikkicerniuk.fitcheckweb.model.User;
import org.springframework.data.jpa.repository.JpaRepository;//helps to connect java to db tables.allows you to save, findAll, findById, deleteById, count, existsById
import java.util.Optional; //helps you deal with boxes that may or may not be empty (avoids null pointer exceptions)

public interface UserRepository extends JpaRepository<User,Long>{//User is the entity you want to manage and Long is the entity's primary key type
    Optional<User>findByEmail(String email); //we can find their specific email.  we want to find a specific email for login validiation
    boolean existsByEmail(String email);//we can see if the email actually exists. we want to see if certain emails exist for registration validiation 
}