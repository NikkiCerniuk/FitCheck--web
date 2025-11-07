'use client'

import { useState, type FormEvent } from "react";
import { Link } from 'react-router-dom'; //TO DO********: link all the buttons to their respective pages. 
import { Plus } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { User } from 'lucide-react';





export default function HomePage() {

    const bgClass = "bg-[url('/BG23.jpg')] bg-[position:calc(50%-80px)_calc(50%+180px)] bg-[length:3850px_auto]";



    return (
        <div className={`min-h-screen ${bgClass}`}> {/*app background*/}

            <div className="container mx-auto px-6 py-120">



                {/*account managment*/}
                <button
                    type="button"
                    aria-label="Account"
                    onClick={() => { console.log('clicked'); alert("Account management page coming soon!"); }}

                    className="
    fixed top-[30px] right-[30px] z-[9999]
    p-2 rounded-full
    cursor-pointer select-none pointer-events-auto
    transition-all
    hover:ring-2 hover:ring-white/60
    active:ring-4 active:ring-white/70
    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
  "
                >
                    <User
                        className="
      block /* ensures the icon uses the hit area as expected */
      text-white transition-all
      /* soft icon glow on hover/active */
      hover:[filter:drop-shadow(0_0_2px_rgba(255,255,255,0.35))]
      active:[filter:drop-shadow(0_0_4px_rgba(255,255,255,0.45))]
    "
                        width={35}
                        height={35}
                        strokeWidth={4}
                        aria-hidden="true"
                    />
                </button>


                {/*App title*/}
                <div className={'text-center mb-16'}>
                    <h1 className="text-white font-brand font-[500] uppercase tracking-[0.35em] text-[40px] mb-5">
                        FitCheck
                    </h1>

                    {/*vertical line style element*/}
                    <svg className="mx-auto mt-1 mb-7" width="2" height="70" viewBox="0 0 2 70" fill="none">
                        <line x1="0" y1="1" x2="1" y2="70" stroke="#999" strokeWidth="3" />
                    </svg>


                    <p className={'mb-20 font-[600] max-w-xl mx-auto tracking-[0.22em] text-[20px] text-white mt-10'}>
                        YOUR DIGITAL WARDROBE
                    </p>
                </div>



                {/*3 card set */}
                <div className="fixed inset-x-0 bottom-0 p-17">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{/*button grid. mobile has 1 column and web has 3*/}

                        {/*Add outfit button*/}

                        <>
                            <a
                                href="/wardrobe/add-clothing-item" //link is route relative/ the absolute path
                                aria-disabled="true"
                                tabIndex={-1}
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert("Add item page coming soon!");
                                }}
                                aria-describedby="Add-item-page-coming-soon"
                                className="cursor-not-allowed"

                            >
                                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-lg 
                        hover:bg-black/30 hover:shadow-[0_0_0_2px_rgba(255,255,255,0.25)] 
                        active:shadow-[0_0_0_4px_rgba(255,255,255,0.35)] transition-all" >
                                    <div className="flex items-center gap-[65px] px-15 mt-18 mb-8 text-white 
                            font-brand font-[600] tracking-[0.20em] uppercase text-[25px]">
                                        <span>Add Item</span>

                                        <Plus
                                            className="flex-shrink-0 text-white"
                                            width={30}
                                            height={30}
                                            strokeWidth={4}
                                            aria-hidden="true"
                                        />

                                    </div>
                                    <div className="mb-18 pl-17 font-[700] text-[20px] text-white/45">
                                        New clothing
                                    </div>
                                </div>
                            </a>
                        </> {/*end oof add outfit button*/}




                        {/*Wardrobe button*/}

                        <>
                            <a
                                href="/wardrobe/entire-wardrobe" //link is route relative/ the absolute path
                                aria-disabled="true"
                                tabIndex={-1}
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert("Wardrobe page coming soon!");
                                }}
                                aria-describeby="Wardrobe-page-coming-soon"
                                className="cursor-not-allowed"
                            >
                                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-lg 
                        hover:bg-black/5 hover:shadow-[0_0_0_2px_rgba(255,255,255,0.25)] 
                        active:shadow-[0_0_0_4px_rgba(255,255,255,0.35)] transition-all" >
                                    <div className="flex items-center gap-[65px] px-15 mt-18 mb-8 text-white font-brand 
                        font-[600] tracking-[0.20em] uppercase text-[25px]">
                                        <span>Wardrobe</span>

                                        <ArrowRight
                                            className="flex-shrink-0 text-white"
                                            width={30}
                                            height={30}
                                            strokeWidth={4}
                                            aria-hidden="true"
                                        />

                                    </div>
                                    <div className="mb-18 pl-17 font-[700] text-[20px] text-white/45">
                                        Browse your collection
                                    </div>
                                </div>
                            </a>
                        </> {/*end oof wardrobe button*/}





                        {/*create outfit button*/}

                        <>
                            <a
                                href="/wardrobe/add-outfit" //link is route relative/ the absolute path
                                aria-disabled="true"
                                tabIndex={-1}
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert("Create outfit page coming soon!");
                                }}
                                aria-describeby="Create-outfit-page-coming-soon"
                                className="cursor-not-allowed"
                            >
                                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-lg 
                        hover:bg-black/30 hover:shadow-[0_0_0_2px_rgba(255,255,255,0.25)] 
                        active:shadow-[0_0_0_4px_rgba(255,255,255,0.35)] transition-all" >
                                    <div className="flex items-center gap-[65px] px-15 mt-18 mb-8 text-white font-brand font-[600] 
                        tracking-[0.20em] uppercase text-[25px]">
                                        <span>Create outfit</span>

                                        <ArrowRight
                                            className="flex-shrink-0 text-white"
                                            width={30}
                                            height={30}
                                            strokeWidth={4}
                                            aria-hidden="true"
                                        />

                                    </div>
                                    <div className="mb-18 pl-17 font-[700] text-[20px] text-white/45">
                                        Build your next look
                                    </div>
                                </div>
                            </a>
                        </> {/*end of create outfit button*/}



                    </div>          {/*end of 3 boxes*/}











                </div>

                {/*fitcheck and tagline UI app center*/}

                {/*Account button in the top right corner*/}

            </div>
        </div> //end of entire page 

    );

}