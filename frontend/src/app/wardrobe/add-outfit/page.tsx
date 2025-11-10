"use client";

import { AddOutfit } from "../../../components/wardrobe/AddOutfit";


export default function App() {
    const handleAddOutfit = (outfit: {
        outfitName: string;
        jacket: string;
        top: string;
        bottom: string;
        socks: string;
        shoes: string;
    }) => {
        console.log("Outfit added:", outfit);
    };
    return (
        <AddOutfit 
        onAddOutfit={handleAddOutfit}
        clothingItems={[]} />
    )
}