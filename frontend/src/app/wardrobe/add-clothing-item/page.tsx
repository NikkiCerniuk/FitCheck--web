"use client"; //this file renders UI for the URL route defined by the folder path

import { AddClothingItem } from "../../../components/wardrobe/AddClothingItem"; //imports the component that renders your form UI

export default function App() { //"this is the main function that gets imported if someone pulls from this file"
  const handleAddItem = (item: { name: string; category: string }) => { //this function should always have a name and catagory, both as strings
    console.log("Item added:", item); //this is for the developer. prints message to the console that confirms an item has been added
    //TO DO:******You can add your logic here to save the item. await fetch request 
  };

  return (
    <AddClothingItem onAddItem={handleAddItem} /> //"when this component runs, show this form to the user" is what this means 
  );
}
