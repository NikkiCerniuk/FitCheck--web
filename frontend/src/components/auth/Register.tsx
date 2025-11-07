'use client'

import { useState, FormEvent } from 'react'; //TO DO: see if you even end up using FormEvent
import { ArrowRight } from "lucide-react";



//default here means its the main thing to export
export default function RegisterPage() {

    /*below are hooks. they allow you to "hook" into react to render and update components*/
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState(''); //  const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');//TO DO: figure out where the setters and getters for this are
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);//<string | null> means that it can be string or null. (null) means start the useState with being null

    //TO DO: abstract handleSubmit logic into a seperate file bc this is currently shared with login/page.tsx 
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //prevents the page from reloading
        setError(null); //default is no error 



        //basic client side validation
        if (email.trim().toLowerCase() !== confirmEmail.trim().toLowerCase()) {// !== is a strict inequality
            setError('Emails do not match'); //will diplay as a custom error message to the user
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password length must be at least 8 characters');
            return;
        }


        setLoading(true); //this will show "signing in" on the button

        try { //we are sending an HTTP request to the backend
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', //refers to what the data is AFTER you convert it 
                }, //the commas are for seperating arguments 
                body: JSON.stringify({ email: email.trim().toLowerCase(), password }) //we are turning the HTML text submitted by the user into a JSON formmated string so that java can understand it
            });

            if (!response.ok) {
                // typescript has type inference so we dont have to explicitly state the type of msg. 
                //"Let" means "this variable might change" however, it will have to be the same type it started as.
                let msg = 'Unable to register.';
                try {//checks if there is already an error message in the json and if there is , it replaces msg with that specific detailed message. Otherwise, the catch block is entered
                    const data = await response.json(); // .json means get the HTTP text response in JSON then parse it into java script object
                    if (data?.message) msg = data.message;  //if the message in the body of the HTTP response exists then we dont need to use the catch block
                } catch {
                    //blank and 409 error line of code moved below for the instance that the message in the body of the HTTP response doesnt exist
                }
                if (response.status === 409) msg = 'That email is already in use.'; //=== means "actual equal to" like in this case we are looking for something that is acutally equal to number 409, not something converted from a string or something
                setError(msg); //makes it so react knows to actually display this error
                return;
            }

            //TO DO: auto-login after successful registration. if auto-login isnt working for some reason, redirect them to the sign in page
        }
        catch (err) { //if the "try" doesnt work, send whatever else to catch block
            console.error('Login error:', err); //prints to developer. err holds the information about the error that went wrong (TypeError) or (SyntaxError) for instance
            setError('Unable to connect to server'); //prints to user
        }
        finally {
            setLoading(false); //stops loading regardless of if the attempt worked or not
            console.log('Login attempt number for email', { email });
        }
    };







    /* 
    -this part is Tailwind CSS 
    - keeps an updated UI of the changes a user has made in the app.    
            - Showing all the user’s outfits when they login instead of a “create first outfit” screen for instance. 
     */
    return (
        <form onSubmit={handleSubmit}>

            <div>
                {/* Login form */}
                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-lg">
                    <h2 className="mt-17 text-white font-brand font-[500] tracking-[0.20em] uppercase text-[25px] text-center mb-4">
                        Create Your Account
                    </h2>

                    {/*print eror mewssage if there is one*/}
                    {error && (
                        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-700 dark:bg-red-900/30 dark:text-red-200">
                            {error}
                        </div>
                    )}


                    <div className="mt-5 space-y-6 sm:space-y-8 text-left p-12">
                        <div className="space-y-2 sm:space-y-3">
                            <label
                                htmlFor="email"
                                className=" block text-white font-[600] tracking-[0.15em] uppercase text-black/60 text-[20px]">
                                EMAIL
                            </label>

                            <input
                                type="email"
                                id="email"
                                value={email} //maps email to the react state (react lets UI change dynamically)
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-4 font-[500] text-[25px] w-full h-17 bg-white/10 text-white rounded-md placeholder-white/60 border border-white/20 backdrop-blur-xl backdrop-saturate-150 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 hover:border-white/35"
                                placeholder="Enter your email"
                                required
                            />
                        </div>




                        {/* confirm email field */}
                        <div className="space-y-2 sm:space-y-3 mt-17">
                            <label
                                htmlFor="confirmEmail"
                                className="mt-5 block text-white font-[600] tracking-[0.15em] uppercase text-black/60 text-[20px]">
                                CONFIRM EMAIL
                            </label>

                            <input
                                type="email"
                                id="confirmEmail"
                                value={confirmEmail}
                                onChange={(e) => setConfirmEmail(e.target.value)}
                                className="px-4 font-[500] text-[25px] w-full h-17 bg-white/10 text-white rounded-md placeholder-white/60 border border-white/20 backdrop-blur-xl backdrop-saturate-150 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 hover:border-white/35"
                                placeholder="Re-enter your email"
                                required
                            />
                        </div>


                        {/* password field*/}
                        <div className="space-y-2 sm:space-y-3 mt-17">
                            <label
                                htmlFor="password"
                                className="block text-white font-[600] tracking-[0.15em] uppercase text-black/60 text-[20px]">
                                PASSWORD
                            </label>

                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="px-4 font-[500] text-[25px] w-full h-17 bg-white/10 text-white rounded-md placeholder-white/60 border border-white/20 backdrop-blur-xl backdrop-saturate-150 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 hover:border-white/35"
                                placeholder="Enter your password"
                                required
                            />
                        </div>




                        {/*confirm password field*/}
                        <div className="space-y-2 sm:space-y-3 mt-17">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-white font-[600] tracking-[0.15em] uppercase text-black/60 text-[20px]">
                                CONFIRM PASSWORD
                            </label>

                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="px-4 font-[500] text-[25px] w-full h-17 bg-white/10 text-white rounded-md placeholder-white/60 border border-white/20 backdrop-blur-xl backdrop-saturate-150 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 hover:border-white/35"
                                placeholder="Re-enter your password"
                                required
                            />


                            {/* sign up link */}
                            <div className="text-center">
                                <p className="text-white/60 text-[20px]">
                                    Already have an account?{' '}

                                    <button
                                        type="button"
                                        onClick={() => alert("Sign-in page coming next!")}
                                        className="mt-8 mb-8 text-[20px] text-white-600 dark:hover:text-red-400 hover:text-red-800 font-[500]"
                                    >
                                        Sign in
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/*sign up button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-between tracking-[0.17em] text-[30px] font-[500] 
                mt-10 w-full bg-white text-black py-10 px-10 focus:outline-none focus-visible:ring-2 
                focus-visible:ring-white/40 focus-visible:ring-offset-0 disabled:opacity-50 
                disabled:cursor-not-allowed transition-all hover:bg-black/30
                hover:text-white hover:shadow-[0_0_0_2px_rgba(255,255,255,0.25)] active:shadow-[0_0_0_4px_rgba(255,255,255,0.35)]"
            >
                    <span>{isLoading ? 'CREATING ACCOUNT..' : 'SIGN UP'}</span>
                    <ArrowRight
                        className="flex-shrink-0"
                        width={30}
                        height={30}
                        strokeWidth={3}
                        aria-hidden="true"
                    />
                </button>
            </div>
        </form>


    );
}


//blank use state for setting email 
//blank use state for confirming email with second box
//****needs to make sure both emails match
//needs to make sure email is not already registered

//blank use state for setting password
//blank use state for confirming password with second box
//needs to make sure both passwords match

//if both emails match && both passwords match && email is not already in use, sign in 
