package io.github.nikkicerniuk.fitcheckweb.controller;

//controller handles communication between the front end and back end

import io.github.nikkicerniuk.fitcheckweb.model.ClothingItem; 
import io.github.nikkicerniuk.fitcheckweb.model.ClothingType;
import io.github.nikkicerniuk.fitcheckweb.service.ClothingItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*; //contains dependanies that allow the front and abck end to talk to eachother via HTTP requests
import org.springframework.http.ResponseEntity; //lets you build detailed HTTP responses 
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Map; // allows us to use key value pairs. key = field name from incoming data , value = data for that filed. handy to retrieve information by its name when it comes in


@RestController //handles HTTP requests and returns responses
@RequestMapping ("/api/wardrobe") //allows us to map specific HTTP requests to the appropriate methods in your controllers. we are handling requests that get sent to /api/wardrobe

public class WardrobeController{

    @Autowired
     /*intentionally mimics the ClothingItemService.java class

     this ClothingItemService is being injected into the controller so we dont have to create a new instance of this and it keeps things modular
     */
    private ClothingItemService clothingItemService;
    
    
    @PostMapping //means "for any POST(submitting data) requests to /api/wardrobe, do the following:"
    /*
     * Response Entity: is about the outgoing response (response from backend to frontend)
     * @RequestBody Map<String, String> is how we understand data coming from the front end to the back
     */ 
    public ResponseEntity<?> addItem(@RequestBody Map<String, String> request){
        try{ //this try block is trying to take the front end request and converting it into a format that the backend can understand and work with. So it takes a JSON(a format) and converts it into Java objects
            String name = request.get("name"); 
            String typeRaw = request.get("type");
            if (name == null || name.isBlank() || typeRaw == null || typeRaw.isBlank()) {
                return ResponseEntity.badRequest().body("name and type are required");
            }
            ClothingType type = ClothingType.valueOf(typeRaw.toUpperCase()); // parse safely (case-insensitive)
            Long userId = 1L; //TO DO: hardcoded for now until we add real authentification. "L" indicates / insures that this will be a "long" type instead of having java assume its an int 
            ClothingItem item = clothingItemService.addClothingItem(name,type,userId); //we pass them to clothing item service to actually create and store items in the system 
            
            return ResponseEntity.ok(item); //returns the clothing item we just made on the back end and returns it to the front end
        } catch (IllegalArgumentException e) { // bad enum value
            return ResponseEntity.badRequest()
                .body("Invalid type. Allowed: " + java.util.Arrays.toString(ClothingType.values()));
        }catch(Exception e){//Exception class is imported by default into the java library
            return ResponseEntity.badRequest().body("Failed to add item"); //returns a response back to the end user to give them some info on the failed attempt
        } 
    }

    /*
    - ReponseEntity is the backend response to the front end. 
    - ClothingType[]" tells us what type the request body will be
    - getTypes is just the name we decided to call the end point
    */

     @GetMapping("/types") //used to retrive data like fetching a list of items
    public ResponseEntity<ClothingType[]> getTypes(){
    return ResponseEntity.ok(ClothingType.values()); //returns an array of constants so that your front end dropdown can use this as a list of options
    }


       // Existing endpoint to retrieve all items
    @GetMapping
     public ResponseEntity<List<ClothingItem>> getAllItems(){ //when backend recieves a get request it will send back all the clothing items
    Long userId = 1L; //TO DO: remove this hardcoded credential later.
    List<ClothingItem> items = clothingItemService.getAllItemsForUser(userId); //putting the result of a search into a specific object so that we can return it
    return ResponseEntity.ok(items); //if user doesnt have a list, it just returns no items. thats not an error.
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        try {
            if(!clothingItemService.exists(id)){ //checks if the ID exists in the DB to delete first 
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found"); 
            }
            clothingItemService.deleteClothingItem(id);//we try to delete the clothing item
            return ResponseEntity.ok("Item successfully deleted");
        } 
         catch (Exception e) {
            e.printStackTrace(); 
            return ResponseEntity.badRequest().body("Failed to delete item");
        }
    }
}

