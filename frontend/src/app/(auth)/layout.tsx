'use client'

export default function AuthLayout({children} : {children: React.ReactNode}){ // use this parameter when you are using a wrapper/container component that will ahve content passed into it
    //TO DO: children and Children React Node line here 



return(//relocated this code from login/page.tsx to (auth) so that it could be shared with both login and register
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

{/*TODO:l This is where the login or register page content gets pulled in. "children" is what makes the layout reusable*/}
{children}  


{/*footer*/}
<div className = {'mt-8 text-center text-sm text-gray-400'}>
    Upgrade your style. Simplify your routine.
    </div>
    </div>
    </div>
);

}


