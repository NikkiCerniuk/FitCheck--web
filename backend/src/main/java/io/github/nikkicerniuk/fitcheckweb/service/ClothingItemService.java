package io.github.nikkicerniuk.fitcheckweb.service;//package declaration 

import io.github.nikkicerniuk.fitcheckweb.model.ClothingItem; //import the model/entity
import io.github.nikkicerniuk.fitcheckweb.model.ClothingType;
import io.github.nikkicerniuk.fitcheckweb.repository.ClothingItemRepository; //import the respective repo
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class ClothingItemService{ //public becasue things like the controller needs to access it

    @Autowired
    private ClothingItemRepository clothingItemRepository;   


    //makes it so we dont have to manually create a new repo everytime we add an item. Knows everytime an item comes in that it should ahve a name,type, and user id so we do not ahve to manually state it
    public ClothingItem addClothingItem(String name, ClothingType type, Long userId){//TO DO: may need to change this later when we move from a text-based to a picture upload-based format
        ClothingItem item = new ClothingItem();
        item.setName(name);
        item.setType(type);
        item.setUserId(userId);
        return clothingItemRepository.save(item); //save is provided by the repository interface. this saves the clothing item to the database. Either updates it or saves it depending on if the id is already listed there or not
    }

    public List<ClothingItem> getAllItemsForUser(Long userId){ //returning the entire closet of a single user
        return clothingItemRepository.findByUserId(userId);
    }

    public void deleteClothingItem(Long id){ //the id passed in here is the id for a single user's specific clothing item
        clothingItemRepository.deleteById(id);
    }

    public boolean exists(long id){
        return clothingItemRepository.existsById(id); //existsById comes from the JPA repository
    }
}