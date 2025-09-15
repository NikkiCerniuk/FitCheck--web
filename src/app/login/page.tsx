/* keeps an updated UI of the changes a user has made in the app. Showing all the user’s outfits when they login instead of a “create first outfit” screen for instance. Piece of memory in the component */

'use client'

import {useState} from 'react'; 



/* makes this file the main export from the file so other files can import it */

export default function LoginPage(){


const[email,setEmail] = useState ('');
const[password,setPassword] = useState ('');
const[isLoading,setLoading]= useState(false);


const handleSubmit = async (e) => {

e.preventDefault(); /*do not allow the page to reset while their login info is loading*/

setIsLoading(true);

//TODO: connect your Spring Boot backend
	// TODO: remove this line of code before web deployment


console.log('Login attempt number for email', {email});


//simulate API call

setTimeout(() => {
	setIsLoading(false);
	alert('Login functionality will connect to your backend');
	},100);
};



return(

<div className = {'min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4'}>

<div className = {'w-full max-w-md'}>

{/*App logo and title*/}
<div className = {'text-center mb-8'}>
	<h1 className = {'text-4xl font-bold text-gray-900 dark:text-white mb-2'}>
FitCheck
	</h1>
	<p className = {'text-gray-600 dark:text-gray-300'}>
Your digital wardrobe
</p>
</div>


{/* Login form */}
<div className = {'bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8'}>
<h2 className = {'text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center'}>
Welcome Back
</h2>


<div className = {'space-y-6'}>
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
value = {email}
onChange = {(e) => setEmail(e.target.value)}
className= {'w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'}
placeholder= "Enter your email"
required
/>

</div>

{/*password field*/}
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





{/*forgot password*/}
<div className = {'text-right'}>
<button
	type="button"
	className= {'text-sm text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium'}
	onClick={()=> alert('Forgot password functionality coming soon!')}
>
	Forgot Password?
</button>
</div>



<button
	type="submit"
	disabled={isLoading}
	onClick={handleSubmit} 
	className= {'w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'}
>
{isLoading ? 'Signing in...' : 'Sign In'}
</button>

</div>



{/* sign up link */}
<div className = {'mt-6 text-center'}>
	<p className = {'text-gray-600 dark:text-gray-300'}>
	Don't have an account?{' '}
	<button
	onClick={() => alert('Sign-up page coming next!')}
	className= {'text-sm text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:text-pink-300 font-medium'}
>
Sign up
</button>
</p>
</div>
</div>


{/*footer*/}
<div className = {'mt-8 text-center text-sm text-gray-400'}>
Upgrade your style. Simplify your routine.
</div>
</div>
</div>

);
}

