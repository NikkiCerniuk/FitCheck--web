package io.github.nikkicerniuk.fitcheckweb.repository; //packages organize classes into name spaces. 
import io.github.nikkicerniuk.fitcheckweb.model.ClothingItem; // importing the entity that the repo will do things to like save, update, deleting, and retrieveing it
import org.springframework.data.jpa.repository.JpaRepository; //contains operations like saving, deleting, custom query methods, etc.
import java.util.List;

/*
an interface is like a blueprint that classes can follow. We are saying this file is a repository in a way that is meaningful to the system

ClothingItemRepository will follow the contract defined by JpaRepository
*/
public interface ClothingItemRepository extends JpaRepository<ClothingItem, Long>{  //"ClothingItem" is the type of your entity class and "Long" is the type of its ID
   /*  
   -List<ClothingItem> is a generic type provides type flexability with allowing for type safety. This ensures only ClothingItems will be passed in.
   -This line of code makes it easy to retrive all particular clothing items assoicated with a particular user so we can moditfy them as needed. 
   
   -We are already passing in "userID" as a parameter so we dont have to use "getUserId" here.
   */
    List<ClothingItem> findByUserId(Long userId); 

}

