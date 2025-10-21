
//the point of this file is to add another table (Clothing Items) to our DB.
package io.github.nikkicerniuk.fitcheckweb.model; //package declaration

import jakarta.persistence.*; //imports things like entity and id and things like that which tell JPA how to map the class to the database (how it lines up with the data and columns)
import org.hibernate.annotations.CreationTimestamp;

@Entity //object mapped to a database table
@Table(name = "clothing_items")
public class ClothingItem{

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private java.time.Instant createdAt;

    public java.time.Instant getCreatedAt(){
        return createdAt; //timestamping when each article of clothing is added for potenital debugging purposes later
    }


    @Id //generates a unique ID/identifier for each clothing item 
    @GeneratedValue(strategy = GenerationType.IDENTITY) //generates a unique id. handled by the DB. usually incremented by column.
    private Long id; //standard to make the ID private for encapsulation. we will access through a getter.

    @Column(nullable = false) //TO DO: remove this or change it to "true" once we transition to photo-based instead of text-based ClothingItems
    private String name; 

    @Enumerated(EnumType.STRING) //enum lets you define a fixed set of constants that a variable can take. lets the JPA know how to store and retrieve the enum values (as a string)
    @Column(name="item_type", nullable=false) //when people have a clothing item, that have to specify if its a top, bottom, or what. 
    private ClothingType type; //"Tops", "Bottoms", "Shoes". the field name "type" is a reserved word so we had to specify a different column name so it stopped causing issues. We specified "item_type"

    @Column(nullable=false)
    private Long userId; //each type is forced to have an ID


    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id=id; //typically not needed but we might use it for testing on the development side
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public ClothingType getType(){
        return type;
    }

    public void setType (ClothingType type){
        this.type = type;
    }

    public Long getUserId(){
        return userId; //we would use getUserId to figure out what user added the clothing item
    }

    public void setUserId(Long userId){
        this.userId = userId;  //we should use setUserId associate that specific clothing item with the user 
    }


}