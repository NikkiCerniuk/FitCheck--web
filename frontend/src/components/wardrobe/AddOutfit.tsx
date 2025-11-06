"use client";

import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


type ClothingItem = { //we pass in several things of type ClothingItem when making the outfit
    id: string;
    name: string;
    category: string;
}



type Outfit = { //each outfit will have the following:
    outfitName: string;
    jacket: string;
    top: string;
    bottom: string;
    socks: string;
    shoes: string;
};

export function AddOutfit({
    onAddOutfit,
    clothingItems, //passing in all available clothing items 
}: {
    onAddOutfit: (outfit: Outfit) => void | Promise<void> //promise resolves with no value
    clothingItems: ClothingItem[]; // clothingItems is an aray of type ClothingItem
}) {

    const [outfitName, setOutfitName] = useState("");

    //state to track current index for swiping
    const [jacketIndex, setJacketIndex] = useState(0);
    const [topIndex, setTopIndex] = useState(0);
    const [bottomIndex, setBottomIndex] = useState(0);
    const [socksIndex, setSocksIndex] = useState(0);
    const [shoesIndex, setShoesIndex] = useState(0);

    const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
        "idle"
    );
    const [message, setMessage] = useState("");



    //Filter items by category
    const jackets = clothingItems.filter(item => item.category === "JACKET"); //checks if the item from the array clothingItems has a category of JACKET and if it does then it puts it in the jackets array 
    const tops = clothingItems.filter(item => item.category === "TOP"); //=> is like saying given
    const bottoms = clothingItems.filter(item => item.category === "BOTTOM");
    const socks = clothingItems.filter(item => item.category === "SOCKS");
    const shoes = clothingItems.filter(item => item.category === "SHOES");


    //get current item for each category
    const selectJacket = jackets.length > 0 ? jackets[jacketIndex].name : "";
    const selectTop = tops.length > 0 ? tops[topIndex].name : "";
    const selectBottom = bottoms.length > 0 ? bottoms[bottomIndex].name : "";
    const selectSocks = socks.length > 0 ? socks[socksIndex].name : "";
    const selectShoes = shoes.length > 0 ? shoes[shoesIndex].name : "";


    //handle swiping left and right 
    const handleSwipe = (
        direction: 'left' | 'right',
        items: ClothingItem[],
        currentIndex: number,
        setIndex: (index: number) => void) => {
        if (items.length === 0) return;

        let newIndex;
        if (direction === 'right') {
            newIndex = (currentIndex + 1 % items.length);
        } else {
            newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        } //items.length - 1 makes it so things wrap around to the end 
        setIndex(newIndex);
    };



    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("saving");
        setMessage("Saving outfit...");

        try {
            await onAddOutfit({
                outfitName: outfitName.trim(),
                jacket: selectJacket,
                top: selectTop,
                bottom: selectBottom,
                socks: selectSocks,
                shoes: selectShoes
            });// articles of clothing are already trimmed upon add to closet. only need to trim outfit name

            //reset oufit name but keep JacketIndex, TopIndex, BottomIndex, SocksIndex, and ShoesIndex
            setOutfitName(""); //blanks out outfit name after successful addition 
            setStatus("success");
            setMessage("Outfit saved successfully!");

            setTimeout(() => { //shows something briefly to the user then hides it 
                setStatus("idle");
                setMessage("");
            }, 3000);
        } catch (err) {
            setStatus("error");
            setMessage("Couldn't save outfit. Please try again")
        }
    }








    return (
        <div className="min-h-screen container mx-auto px-6 py-16" >

            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-black mt-4 font-brand font-[600] uppercase tracking-[0.22em] text-4xl mb-5">
                    FitCheck
                </h1>
                <svg className="mx-auto mt-1 mb-7" width="80" height="2" viewBox="0 0 80 2" fill="none">
                    <line x1="0" y1="1" x2="80" y2="1" stroke="#999" strokeWidth="1" />
                </svg>

                <p className="mb-15 text-muted-foreground font-[semibold] max-w-xl mx-auto tracking-wide text-xl">
                    Add a new outfit to your wardrobe collection
                </p>


                {/*card*/}
                <div className="max-w-3xl mx-auto mb-20">
                    <div className="bg-white text-card-foreground shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 sm:p-12 pb-20">


                        <div className="mb-10">
                            <h2 className="font-brand font-[500] tracking-[0.1em] uppercase text-[20px] text-center mb-2">
                                New Outfit
                            </h2>
                            <svg className="flex justify-center mx-auto" width="50" height="2" viewBox="0 0 80 2" fill="none">
                                <line x1="0" y1="1" x2="80" y2="1" stroke="#999" strokeWidth="1" />
                            </svg>
                        </div>


                        <form onSubmit={handleSubmit} className="space-y-15">   {/*adds vertical spacing of 2rem between *direct* children of an element */}


                            {/*Jacket Selection*/}
                            <div className="mt-19 mb-6 text-left bg-white p-6 rounded-md">
                                <h3 className="block mb-6 text-muted-foreground font-[600] tracking-[0.15em] uppercase text-black/60 text-[12px]"
                                >
                                    JACKET
                                </h3>
                                <div className="flex items-center justify-between gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleSwipe('left', jackets, jacketIndex, setJacketIndex)}
                                        disabled={jackets.length === 0}
                                        className="p-2 hover:bg-gray-200 rounded disabled:opacity-30"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <div className="text-center flex-1">
                                        <p className="text-lg">
                                            {jackets.length > 0 ? jackets[jacketIndex].name : "No Jackets"}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleSwipe('right', jackets, jacketIndex, setJacketIndex)}
                                        disabled={jackets.length === 0}
                                        className="p-2 hover:bg-gray-200 rounded disabled:opacity-30"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>


                            {/*visual divider*/}
                            <svg className="block w-full mx-auto" height="2" viewBox="0 0 100 2" preserveAspectRatio="none">
                                <rect x="0" y="0" width="100" height="2" fill="#f2f2f2" />
                            </svg>


                            {/*Top Selection*/}
                            <div className="mb-6 text-left bg-white p-6 rounded-md">
                                <h3 className="block mb-6 text-muted-foreground font-[600] tracking-[0.15em] uppercase text-black/60 text-[12px]"
                                >
                                    TOP
                                </h3>
                                <div className="flex items-center justify-between gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleSwipe('left', tops, topIndex, setTopIndex)}
                                        disabled={tops.length === 0}
                                        className="p-2 hover:bg-gray-200 rounded disabled:opacity-30"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <div className="text-center flex-1">
                                        <p className="text-lg">
                                            {tops.length > 0 ? tops[topIndex].name : "No Tops"}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleSwipe('right', tops, topIndex, setTopIndex)}
                                        disabled={tops.length === 0} //disables the tops swiping if there are no tops
                                        className="p-2 hover:bg-gray-200 rounded disabled:opacity-30"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>


                            {/*visual divider*/}
                            <svg className="block w-full mx-auto" height="2" viewBox="0 0 100 2" preserveAspectRatio="none">
                                <rect x="0" y="0" width="100" height="2" fill="#f2f2f2" />
                            </svg>


                            {/*Bottom Selection*/}
                            <div className="mb-6 text-left bg-white p-6 rounded-md">
                                <h3 className="block mb-6 text-muted-foreground font-[600] tracking-[0.15em] uppercase text-black/60 text-[12px]"
                                >
                                    BOTTOM
                                </h3>
                                <div className="flex items-center justify-between gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleSwipe('left', bottoms, bottomIndex, setBottomIndex)}
                                        disabled={bottoms.length === 0}
                                        className="p-2 hover:bg-gray-200 rounded disabled:opacity-30"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <div className="text-center flex-1">
                                        <p className="text-lg">
                                            {bottoms.length > 0 ? bottoms[bottomIndex].name : "No Bottoms"}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleSwipe('right', bottoms, bottomIndex, setBottomIndex)}
                                        disabled={bottoms.length === 0} //disables the bottoms swiping if there are no bottoms
                                        className="p-2 hover:bg-gray-200 rounded disabled:opacity-30"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>


                            {/*visual divider*/}
                            <svg className="block w-full mx-auto" height="2" viewBox="0 0 100 2" preserveAspectRatio="none">
                                <rect x="0" y="0" width="100" height="2" fill="#f2f2f2" />
                            </svg>


                            {/*Socks Selection*/}
                            <div className="mb-6 text-left bg-white p-6 rounded-md">
                                <h3 className="block mb-6 text-muted-foreground font-[600] tracking-[0.15em] uppercase text-black/60 text-[12px]"
                                >
                                    SOCKS
                                </h3>
                                <div className="flex items-center justify-between gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleSwipe('left', socks, socksIndex, setSocksIndex)}
                                        disabled={socks.length === 0}
                                        className="p-2 hover:bg-gray-200 rounded disabled:opacity-30"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <div className="text-center flex-1">
                                        <p className="text-lg">
                                            {socks.length > 0 ? socks[socksIndex].name : "No Socks"}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleSwipe('right', socks, socksIndex, setSocksIndex)}
                                        disabled={socks.length === 0}
                                        className="p-2 hover:bg-gray-200 rounded disabled:opacity-30"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>


                            {/*visual divider*/}
                            <svg className="block w-full mx-auto" height="2" viewBox="0 0 100 2" preserveAspectRatio="none">
                                <rect x="0" y="0" width="100" height="2" fill="#f2f2f2" />
                            </svg>

                            {/*Shoes Selection*/}
                            <div className="mb-6 text-left bg-white p-6 rounded-md">
                                <h3 className="block mb-6 text-muted-foreground font-[600] tracking-[0.15em] uppercase text-black/60 text-[12px]"
                                >
                                    SHOES
                                </h3>
                                <div className="flex items-center justify-between gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleSwipe('left', shoes, shoesIndex, setShoesIndex)}
                                        disabled={shoes.length === 0}
                                        className="p-2 hover:bg-gray-200 rounded disabled:opacity-30"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <div className="text-center flex-1">
                                        <p className="text-lg">
                                            {shoes.length > 0 ? shoes[shoesIndex].name : "No Socks"}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleSwipe('right', shoes, shoesIndex, setShoesIndex)}
                                        disabled={shoes.length === 0}
                                        className="p-2 hover:bg-gray-200 rounded disabled:opacity-30"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>


                            {/*visual divider*/}
                            <svg className="block w-full mx-auto" height="2" viewBox="0 0 100 2" preserveAspectRatio="none">
                                <rect x="0" y="0" width="100" height="2" fill="#f2f2f2" />
                            </svg>


                            {/*Outfit Name*/}
                            <div className="mb-6 text-left p-6" > {/*/adds spacing between the children of the "direct children"*/}
                                <label
                                    htmlFor="outfit-name"
                                    className="mb-6 text-left block text-muted-foreground font-[600] tracking-[0.15em] uppercase text-black/60 text-[12px]"
                                >
                                    Outfit Name *
                                </label>

                                <input
                                    style={{
                                        height: '70px',
                                        backgroundPosition: "right 0.75rem center",
                                        backgroundSize: "12px",
                                    }}
                                    id="outfit-name"
                                    type="text"
                                    value={outfitName}
                                    onChange={(e) => setOutfitName(e.target.value)}
                                    placeholder="e.g., Casual Friday"
                                    autoComplete="off"
                                    required
                                    className="font-[500] text-[25px]  w-full rounded-md border border-gray-200 bg-gray-100 px-4 outline-none transition-colors focus:border-black/30"
                                />
                            </div>


                            {/* CTA (call to action)*/}
                            <div className="mb-8" style={{ marginTop: '4rem' }}>
                                <button
                                    type="submit"
                                    disabled={!outfitName.trim() || status === "saving"} //=== is a strict inequality where its only true if the type and value are both the same 
                                    className="w-full border-0 !border-0 !bg-black !text-white tracking-[0.2em] uppercase text-[20px] font-[600] hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    style={{
                                        height: '90px',
                                        backgroundPosition: "right 0.75rem center",
                                        backgroundSize: "12px",

                                    }}// question mark below means htat if the status is "saving" then display "Saving..."
                                >
                                    {status === "saving" ? "Saving..." : "SAVE OUTFIT"}
                                </button>
                            </div>





                            {/*inline message for add to wardrobe status*/}
                            {message && (
                                <div
                                    role={status === "error" ? "alert" : "status"}
                                    aria-live="polite"
                                    className={
                                        status === "error"
                                            ? "mb-6 bg-red-50 px-3 py-2 text-red-800"
                                            : "mb-6 bg-green-50 px-3 py-2 text-green-800"
                                    }
                                >
                                    {message}
                                </div>
                            )}

                        </form>



                    </div>
                </div>




            </div>




        </div>


    ); //end of tailwind styling
}// end of entire file