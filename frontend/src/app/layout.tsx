import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; //applies styles to the entire app

const geistSans = Geist({ //variable width font (take the space you need per letter)
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({// fixed width font
  variable: "--font-geist-mono", //Geist and Geist_Mono both download and wire google fonts. They also put a placeholder here so there is no weird page resizing when the page first loads
  subsets: ["latin"],
});

/*
Update Reminder: update the <title> and <description> when introducing AI and/or clothing "styling" features
*/

export const metadata: Metadata = {  // means "data about data"
  title: "Create My Outfit", //will appear in the browser tab and is important for search engine optimization (SEO)
  description: "Create New Outfits From Your Closet ", //page description often displayed just below the title of the search result
};



export default function RootLayout({ //RootLayout defines the container that will be the same for every single page 
  children, //where unique stuff for each page goes
}: Readonly<{
  children: React.ReactNode; //every app named page.tsx or page.js that exports a react component becomes a page. Next.js does this for you so you dont have to manually add it to children 
}>) {
  return ( // "give back the value from this function"
    // "en" tells browsers, users, and search engine that things are written in english
    <html lang="en"> 
      <body
      //"antialiased" means that we want the lines of the graphics to be smooth. Aliasing would mean that we would want them to appear jagged like pixels  
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} // backticks let you build strings dynamically 
     //saying that all of the children can use the geistSans and geistMono fonts 
     >
        {children} 
      </body>
    </html>
  );
}


/*
RootLayout is like the blueprint for the entire house
Children are the rooms (pages) and in here, you can only read them.
*/

