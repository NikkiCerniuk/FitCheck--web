"use client"

import { useState } from "react";
import { CirclePlus } from 'lucide-react'; //will  be used to route to the "add clothing item" page.
import { CircleMinus } from 'lucide-react'; //will be used to delete an item, but not to leave the page.
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Jacquard_12 } from "next/font/google";


type ClothingItem = {
    id: string;
    name: string;
    category: string;
}





export function ViewWardrobe({ clothingItems }: { clothingItems: ClothingItem[]; }) {


    const [items, setItems] = useState<ClothingItem[]>(clothingItems);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "deleting" | "success" | "error">(
        "idle"
    );


    {/*get counts for each category*/ }
    const count = items.length;
    const jacketCount = items.filter(i => i.category === "JACKET").length;
    const topCount = items.filter(i => i.category === "TOP").length;
    const bottomCount = items.filter(i => i.category === "BOTTOM").length;
    const socksCount = items.filter(i => i.category === "SOCKS").length;
    const shoesCount = items.filter(i => i.category === "SHOES").length;


    {/*get all items for each category*/ }
    const jackets = items.filter(item => item.category === "JACKET");
    const tops = items.filter(item => item.category === "TOP");
    const bottoms = items.filter(item => item.category === "BOTTOM");
    const socks = items.filter(item => item.category === "SOCKS");
    const shoes = items.filter(item => item.category === "SHOES");


    const [expanded, setExpanded] = useState<Record<string, boolean>>({
        JACKET: false,
        TOP: false,
        BOTTOM: false,
        SOCKS: false,
        SHOES: false
    });



    const toggle = (cat: keyof typeof expanded) =>
        setExpanded(prev => ({ ...prev, [cat]: !prev[cat] }));


    const expandAll = () =>
        setExpanded({ JACKET: true, TOP: true, BOTTOM: true, SOCKS: true, SHOES: true });


    const collapseAll = () =>
        setExpanded({ JACKET: false, TOP: false, BOTTOM: false, SOCKS: false, SHOES: false });



    async function deleteOutfit(clothingItem: ClothingItem) {
        setStatus("deleting");
        setMessage("deleting item...");


        const previous = items;
        setItems(cur => cur.filter(i => i.id !== clothingItem.id));






        try {
            const res = await fetch(`http://localhost:8080/api/wardrobe/${clothingItem.id}`,
                { method: "DELETE", });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            setStatus("success");
            setMessage("Item deleted successfully!");
            setTimeout(() => {
                setStatus("idle");
                setMessage("");
            }, 3000);

        } catch (err) {
            setItems(previous);
            setStatus("error");
            setMessage("Couldn't delete item. Please try again.")

        }
    }






    return (
        <div className="min-h-screen container mx-auto px-6 py-16" >

            {/*header*/}
            <div className="text-center mb-16">
                <h1 className="text-black mt-4 font-brand font-[600] uppercase tracking-[0.22em] text-4xl mb-5">
                    FitCheck
                </h1>
                <svg className="mx-auto mt-1 mb-7" width="80" height="2" viewBox="0 0 80 2" fill="none">
                    <line x1="0" y1="1" x2="80" y2="1" stroke="#999" strokeWidth="1" />
                </svg>

                <p className="text-muted-foreground font-[semibold] max-w-xl mx-auto tracking-wide text-xl">
                    Browse and organize your entire collection
                </p>
            </div>{/*end of header*/}


            {/*Card including count*/}
            <div className="max-w-3xl mx-auto mb-20">


                {/*count*/}

                <div className="p-4 px-5 flex items-center justify-between text-black/35 font-[semibold] mx-auto tracking-wide">
                    {count} {count === 1 ? "item" : "items"} total


                    {/*TO DO: COLLAPSE ALL | EXPAND ALL*/}
                    <div>
                        <button onClick={collapseAll} className=" transition hover:text-black/60 active:text-black/100 uppercase tracking-[0.08em] [word-spacing:0.2em]">collapse all</button>
                        <span className="px-2">|</span>
                        <button onClick={expandAll} className=" transition hover:text-black/60 active:text-black/100 uppercase tracking-[0.08em] [word-spacing:0.2em]">expand all</button>
                    </div>
                </div> {/*shows total count for all items across all categories. means print count and then pick item or items depending on the category*/}



                <div className="bg-white text-card-foreground shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 sm:p-12 pb-20">
                    <div className="mb-10">
                        <h2 className="font-brand font-[500] tracking-[0.1em] uppercase text-[20px] text-center mb-2">
                            Entire Wardrobe
                        </h2>
                        <svg className="flex justify-center mx-auto" width="50" height="2" viewBox="0 0 80 2" fill="none">
                            <line x1="0" y1="1" x2="80" y2="1" stroke="#999" strokeWidth="1" />
                        </svg>
                    </div>







                    {/*Jacket Selection*/}
                    <div className="p-6 flex items-center justify-between mb-6 text-muted-foreground font-[600] tracking-[0.15em] text-black/60 text-[12px]">


                        <h3 className="text-[12px] font-semibold tracking-[0.15em] text-black/60">
                            <span className="uppercase">JACKET</span>
                            <span className="p-7 text-black/35 font-[semibold] max-w-xl tracking-wide text-[12px] text-left">
                                {jacketCount} {jacketCount === 1 ? "item" : "items"}
                            </span>
                        </h3>

                        {/* right: group plus + chevron together */}
                        <div className="flex items-center gap-3">
                            <a
                                href="/wardrobe/add-clothing-item"
                                aria-disabled="true"
                                tabIndex={-1}
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert("Add item page coming soon!");
                                }}
                                className="cursor-not-allowed"
                                title="Add jacket (coming soon)"
                            >
                                <span className="sr-only">Add jacket</span>
                                <CirclePlus
                                    className="flex-shrink-0 text-black/40 hover:text-black/60 active:text-black/100 transition"
                                    width={30}
                                    height={30}
                                    strokeWidth={3}
                                    aria-hidden="true"
                                />
                            </a>

                            <button
                                type="button"
                                onClick={() => toggle("JACKET")}
                                aria-expanded={expanded.JACKET}
                                aria-controls="jacket-panel"
                                className="inline-flex items-center gap-1 text-black/60 hover:text-black"
                            >
                                {expanded.JACKET ? <ChevronUp /> : <ChevronDown />}
                                <span className="sr-only">
                                    {expanded.JACKET ? "Collapse" : "Expand"} jacket
                                </span>
                            </button>
                        </div>
                    </div>  {/*end of jacket section*/}






                    {/*visual divider*/}
                    <svg className="block w-full mx-auto" height="2" viewBox="0 0 100 2" preserveAspectRatio="none">
                        <rect x="0" y="0" width="100" height="2" fill="#f2f2f2" />
                    </svg>



                        {/*top Selection*/}
                        <div className="p-6 flex items-center justify-between mb-6 text-muted-foreground font-[600] tracking-[0.15em] text-black/60 text-[12px]">


<h3 className="text-[12px] font-semibold tracking-[0.15em] text-black/60">
    <span className="uppercase">TOP</span>
    <span className="p-7 text-black/35 font-[semibold] max-w-xl tracking-wide text-[12px] text-left">
        {topCount} {topCount === 1 ? "item" : "items"}
    </span>
</h3>

{/* right: group plus + chevron together */}
<div className="flex items-center gap-3">
    <a
        href="/wardrobe/add-clothing-item"
        aria-disabled="true"
        tabIndex={-1}
        onClick={(e) => {
            e.preventDefault();
            alert("Add item page coming soon!");
        }}
        className="cursor-not-allowed"
        title="Add top (coming soon)"
    >
        <span className="sr-only">Add top</span>
        <CirclePlus
            className="flex-shrink-0 text-black/40 hover:text-black/60 active:text-black/100 transition"
            width={30}
            height={30}
            strokeWidth={3}
            aria-hidden="true"
        />
    </a>

    <button
        type="button"
        onClick={() => toggle("TOP")}
        aria-expanded={expanded.TOP}
        aria-controls="top-panel"
        className="inline-flex items-center gap-1 text-black/60 hover:text-black"
    >
        {expanded.TOP ? <ChevronUp /> : <ChevronDown />}
        <span className="sr-only">
            {expanded.TOP ? "Collapse" : "Expand"} top
        </span>
    </button>
</div>
</div>  {/*end of top section*/}


                    {/*visual divider*/}
                    <svg className="block w-full mx-auto" height="2" viewBox="0 0 100 2" preserveAspectRatio="none">
                        <rect x="0" y="0" width="100" height="2" fill="#f2f2f2" />
                    </svg>





{/*Bottom section*/}
                    <div className="p-6 flex items-center justify-between mb-6 text-muted-foreground font-[600] tracking-[0.15em] text-black/60 text-[12px]">


                        <h3 className="text-[12px] font-semibold tracking-[0.15em] text-black/60">
                            <span className="uppercase">BOTTOM</span>
                            <span className="p-7 text-black/35 font-[semibold] max-w-xl tracking-wide text-[12px] text-left">
                                {bottomCount} {bottomCount === 1 ? "item" : "items"}
                            </span>
                        </h3>

                        {/* right: group plus + chevron together */}
                        <div className="flex items-center gap-3">
                            <a
                                href="/wardrobe/add-clothing-item"
                                aria-disabled="true"
                                tabIndex={-1}
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert("Add item page coming soon!");
                                }}
                                className="cursor-not-allowed"
                                title="Add bottom (coming soon)"
                            >
                                <span className="sr-only">Add bottom</span>
                                <CirclePlus
                                    className="flex-shrink-0 text-black/40 hover:text-black/60 active:text-black/100 transition"
                                    width={30}
                                    height={30}
                                    strokeWidth={3}
                                    aria-hidden="true"
                                />
                            </a>

                            <button
                                type="button"
                                onClick={() => toggle("BOTTOM")}
                                aria-expanded={expanded.BOTTOM}
                                aria-controls="bottom-panel"
                                className="inline-flex items-center gap-1 text-black/60 hover:text-black"
                            >
                                {expanded.BOTTOM ? <ChevronUp /> : <ChevronDown />}
                                <span className="sr-only">
                                    {expanded.BOTTOM ? "Collapse" : "Expand"} bottom
                                </span>
                            </button>
                        </div>
                    </div>  {/*end of bottom section*/}


                 


                    {/*visual divider*/}
                    <svg className="block w-full mx-auto" height="2" viewBox="0 0 100 2" preserveAspectRatio="none">
                        <rect x="0" y="0" width="100" height="2" fill="#f2f2f2" />
                    </svg>


                    {/*Socks section*/}
                    <div className="p-6 flex items-center justify-between mb-6 text-muted-foreground font-[600] tracking-[0.15em] text-black/60 text-[12px]">


                        <h3 className="text-[12px] font-semibold tracking-[0.15em] text-black/60">
                            <span className="uppercase">SOCKS</span>
                            <span className="p-7 text-black/35 font-[semibold] max-w-xl tracking-wide text-[12px] text-left">
                                {socksCount} {socksCount === 1 ? "item" : "items"}
                            </span>
                        </h3>

                        {/* right: group plus + chevron together */}
                        <div className="flex items-center gap-3">
                            <a
                                href="/wardrobe/add-clothing-item"
                                aria-disabled="true"
                                tabIndex={-1}
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert("Add item page coming soon!");
                                }}
                                className="cursor-not-allowed"
                                title="Add socks (coming soon)"
                            >
                                <span className="sr-only">Add socks</span>
                                <CirclePlus
                                    className="flex-shrink-0 text-black/40 hover:text-black/60 active:text-black/100 transition"
                                    width={30}
                                    height={30}
                                    strokeWidth={3}
                                    aria-hidden="true"
                                />
                            </a>

                            <button
                                type="button"
                                onClick={() => toggle("SOCKS")}
                                aria-expanded={expanded.SOCKS}
                                aria-controls="socks-panel"
                                className="inline-flex items-center gap-1 text-black/60 hover:text-black"
                            >
                                {expanded.SOCKS ? <ChevronUp /> : <ChevronDown />}
                                <span className="sr-only">
                                    {expanded.SOCKS ? "Collapse" : "Expand"} socks
                                </span>
                            </button>
                        </div>
                    </div>  {/*end of socks section*/}
           



                    {/*visual divider*/}
                    <svg className="block w-full mx-auto" height="2" viewBox="0 0 100 2" preserveAspectRatio="none">
                        <rect x="0" y="0" width="100" height="2" fill="#f2f2f2" />
                    </svg>



                    {/*Shoes Selection*/}
                    <div className="p-6 flex items-center justify-between mb-6 text-muted-foreground font-[600] tracking-[0.15em] text-black/60 text-[12px]">


                        <h3 className="text-[12px] font-semibold tracking-[0.15em] text-black/60">
                            <span className="uppercase">SHOES</span>
                            <span className="p-7 text-black/35 font-[semibold] max-w-xl tracking-wide text-[12px] text-left">
                                {shoesCount} {shoesCount === 1 ? "item" : "items"}
                            </span>
                        </h3>

                        {/* right: group plus + chevron together */}
                        <div className="flex items-center gap-3">
                            <a
                                href="/wardrobe/add-clothing-item"
                                aria-disabled="true"
                                tabIndex={-1}
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert("Add item page coming soon!");
                                }}
                                className="cursor-not-allowed"
                                title="Add shoes (coming soon)"
                            >
                                <span className="sr-only">Add shoes</span>
                                <CirclePlus
                                    className="flex-shrink-0 text-black/40 hover:text-black/60 active:text-black/100 transition"
                                    width={30}
                                    height={30}
                                    strokeWidth={3}
                                    aria-hidden="true"
                                />
                            </a>

                            <button
                                type="button"
                                onClick={() => toggle("SHOES")}
                                aria-expanded={expanded.SHOES}
                                aria-controls="shoes-panel"
                                className="inline-flex items-center gap-1 text-black/60 hover:text-black"
                            >
                                {expanded.SHOES ? <ChevronUp /> : <ChevronDown />}
                                <span className="sr-only">
                                    {expanded.SHOES ? "Collapse" : "Expand"} shoes
                                </span>
                            </button>
                        </div>
                    </div>  {/*end of shoes section*/}









                </div>
            </div> {/*end of card*/}












        </div>
    );

}