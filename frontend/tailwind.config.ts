import type { Config } from "tailwindcss";//telling typescript that the config file is meant to follow specific types so its meant to detect errors or mismatches
const config: Config = { //how you define and export this. what other things will see and use when they access this file 
    content: [ //checks all the files in these routes and cleans up any unused tailwind styles
        "./src/**/*.{js,ts,jsx,tsx,mdx}", ],
    darkMode: "media", //sets dark mode based on user preference
    theme: { //define design tokens like spacing, color, fonts.
        extend:{ //add customizations with keeping the tailwind default styles intact. can override the defaults set in globals.css
            fontFamily:{
                brand:["var(--font-brand)", "ui-sans-serif", "system-ui"], //anytime we refer to font-brand we are referring to this family. Makes it so we dont have to apply it eveywhere 
            },
        },
    },
    plugins: [],//plug ins here that tailwind does not include by default 
};
export default config;