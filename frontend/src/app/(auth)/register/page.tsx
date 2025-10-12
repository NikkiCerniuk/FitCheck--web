//tsx files are a combo of typescript and JSX (a java script extension)


'use client'//file is a client component. can use hooks like useState, useEffect, eventHandler, browser APIs. use when you need interacivity or local state 

import{useState, FormEvent} from 'react'; //TO DO: see if you even end up using FormEvent


//default here means its the main thing to export
export default function RegisterPage(){

  /*below are hooks. they allow you to "hook" into react to render and update components*/
const[email,setEmail] = useState ('');
const[confirmEmail,setConfirmEmail] = useState (''); //  const [confirmEmail, setConfirmEmail] = useState('');
const[password,setPassword] = useState ('');
const[confirmPassword,setConfirmPassword] = useState ('');//TO DO: figure out where the setters and getters for this are
const[isLoading,setLoading]= useState(false);
const[error,setError] = useState<string | null>(null);//<string | null> means that it can be string or null. (null) means start the useState with being null

//TO DO: abstract handleSubmit logic into a seperate file bc this is currently shared with login/page.tsx 
const handleSubmit = async(e: FormEvent<HTMLFormElement>)=>{ 
    e.preventDefault(); //prevents the page from reloading
    setError(null); //default is no error 



//basic client side validation
if(email.trim().toLowerCase() !== confirmEmail.trim().toLowerCase()){// !== is a strict inequality
    setError('Emails do not match'); //will diplay as a custom error message to the user
    return;
}

if(password !== confirmPassword){
    setError('Passwords do not match');
    return;
}

if(password.length < 8){
    setError('Password length must be at least 8 characters');
    return;
}


setLoading(true); //this will show "signing in" on the button

try{ //we are sending an HTTP request to the backend
    const response = await fetch ('http://localhost:8080/api/auth/register',{
    method: "POST", 
    headers:{
        'Content-Type': 'application/json', //refers to what the data is AFTER you convert it 
    }, //the commas are for seperating arguments 
    body: JSON.stringify({email: email.trim().toLowerCase(),password}) //we are turning the HTML text submitted by the user into a JSON formmated string so that java can understand it
});

if(!response.ok){
    // typescript has type inference so we dont have to explicitly state the type of msg. 
    //"Let" means "this variable might change" however, it will have to be the same type it started as.
    let msg = 'Unable to register.'; 
    try{//checks if there is already an error message in the json and if there is , it replaces msg with that specific detailed message. Otherwise, the catch block is entered
        const data = await response.json(); // .json means get the HTTP text response in JSON then parse it into java script object
        if(data?.message) msg = data.message;  //if the message in the body of the HTTP response exists then we dont need to use the catch block
    }catch{
        //blank and 409 error line of code moved below for the instance that the message in the body of the HTTP response doesnt exist
    }
    if(response.status===409) msg= 'That email is already in use.'; //=== means "actual equal to" like in this case we are looking for something that is acutally equal to number 409, not something converted from a string or something
    setError(msg); //makes it so react knows to actually display this error
    return;
}

//TO DO: auto-login after successful registration. if auto-login isnt working for some reason, redirect them to the sign in page
}
catch(err){ //if the "try" doesnt work, send whatever else to catch block
console.error('Login error:', err); //prints to developer. err holds the information about the error that went wrong (TypeError) or (SyntaxError) for instance
setError('Unable to connect to server'); //prints to user
}
finally{
    setLoading(false); //stops loading regardless of if the attempt worked or not
    console.log('Login attempt number for email',{email});
}
};







/* 
-this part is Tailwind CSS 
- keeps an updated UI of the changes a user has made in the app.    
        - Showing all the user’s outfits when they login instead of a “create first outfit” screen for instance. 
 */
return(
    <>
    
    
    {/* Login form */}
    <div className = {'bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8'}>
    <h2 className = {'text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center'}>
    Create Your Account
    </h2>

{/*print eror mewssage if there is one*/}
    {error && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-700 dark:bg-red-900/30 dark:text-red-200">
            {error}
        </div>
    )}


    <div className = {'space-y-6'}>
    {/*
    form: is an HTML element that groups together fields to be submitted (username & password in this case)
    onSubmit: triggered when the button is clicked 
    classNa...y-6: adds vertical spacing between children
    */}
    <form onSubmit={handleSubmit} className="space-y-6">



    {/* email field */}
    <div>
    {/* html for connects the email to this input. If the user clicks on this, it will jump to the email box. Label is for form fields*/}
    
    <label htmlFor = "email" className= {'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'}>
    Email
    </label>
    
    
    {/* type = email is what to expect from the user
    id = email hooks htmlFor "email" the box below so if you click email your mouse goes into the box
    value = email hooks email input to email use state 
    */}
    
    <input
    type="email" 
    id="email"
    value = {email} //maps email to the react state (react lets UI change dynamically)
    onChange = {(e) => setEmail(e.target.value)}
    className= {'w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'}
    placeholder= "Enter your email"
    required
    />
    </div>
    



    {/* confirm email field */}
    <div>
    {/* html for connects the email to this input. If the user clicks on this, it will jump to the email box. Label is for form fields*/}
    
    <label htmlFor = "confirmEmail" className= {'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'}>
    Confirm Email
    </label>
    
    
    {/* type = email is what to expect from the user
    id = email hooks htmlFor "email" the box below so if you click email your mouse goes into the box
    value = email hooks email input to email use state 
    */}
    
    <input
    type="email" 
    id="confirmEmail"
    value = {confirmEmail}
    onChange = {(e) => setConfirmEmail(e.target.value)}
    className= {'w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'}
    placeholder= "Re-enter your email"
    required
    />
    
    </div>


  {/* password field*/}
  <div>
        
        <label htmlFor="password" className = {'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'}>
        Password
        </label>
        
        <input
            type="password" 
            id="password"
            value={password}
            onChange = {(e) => setPassword(e.target.value)}
            className= {'w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'}
            placeholder="Enter your password"
            required
        
        />
        </div>
    



  {/*confirm password field*/}
  <div>
        
        <label htmlFor="confirmPassword" className = {'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'}>
        Confirm Password
        </label>
        
        <input
            type="password" 
            id="confirmPassword"
            value={confirmPassword}
            onChange = {(e) => setConfirmPassword(e.target.value)}
            className= {'w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'}
            placeholder="Re-enter your password"
            required
        
        />
        </div>
    
    
    <button
        type="submit"
        disabled={isLoading}
        className= {'w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'}
    >
    {isLoading ? 'Creating account...' : 'Sign Up'}
    </button>
    </form>
    
    </div>
    
    

    {/* sign up link */}
    <div className = {'mt-6 text-center'}>
        <p className = {'text-gray-600 dark:text-gray-300'}>
        Already have an account?{' '}
        <a //this is an anchor tag to direct to another webpage. <a> automatically makes a button 
        href="/login" //href means hyperreference tag. you put it inside <a> to tell it where to go
        className= {'text-sm text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium'}
        >
        Sign in
    </a>
    </p>
    </div>
    </div>
    </>
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
