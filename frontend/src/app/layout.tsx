//this is a layout that will wrap around the entire app

import "./globals.css"; //import global.css bc tailwind 
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200","300","400","500", "600", "700"],
  variable: "--font-brand",
  display: "swap" //no invisable text while the font loads but user might see a change of style when hte font fully loads
});

export const viewport = {// makes sure the page is responsive and starts at a normal zoom level on any device
  width: "device-width",
  initialScale: 1, //width and initalScale are common settings/known properties in the meta 
}


export default function RootLayout({children}:{children: React.ReactNode}){//"RootLayout" is just common convention
return(
  <html lang="en" className={montserrat.variable}> 
  <body className={`${montserrat.className} antialiased`}>  {/* <-- ensure Montserrat */}
  {children}
  </body>
  </html>
);

}