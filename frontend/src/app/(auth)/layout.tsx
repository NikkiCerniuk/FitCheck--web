'use client'
import { usePathname } from "next/navigation";
export default function AuthLayout({ children }: { children: React.ReactNode }) { // use this parameter when you are using a wrapper/container component that will ahve content passed into it
    //TO DO: children and Children React Node line here 


    const pathname = usePathname();
  const bgClass = pathname?.includes("/login")
  ? "bg-[url('/Background5.jpg')] bg-no-repeat bg-center bg-[length:4000px_auto]"
  : "bg-[url('/Background19.jpg')] bg-no-repeat bg-center bg-[length:3500px_auto]";

return (
  <div className={`min-h-screen ${bgClass}`}>
    <div className="container mx-auto px-6 py-16">


                {/*old code below this line */}
                <div className="text-center mb-16">


                    {/*App title*/}
                    <div className={'text-center mb-16'}>
                        <h1 className="text-white mt-2 font-brand font-[500] uppercase tracking-[0.35em] text-[40px] mb-5">
                            FitCheck
                        </h1>

                        {/*vertical line style element*/}
                        <svg className="mx-auto mt-1 mb-7" width="2" height="70" viewBox="0 0 2 70" fill="none">
                            <line x1="0" y1="1" x2="1" y2="70" stroke="#999" strokeWidth="3" />
                        </svg>


                        <p className={'mb-20 font-[600] max-w-xl mx-auto tracking-[0.22em] text-xl text-white mt-10'}>
                            YOUR DIGITAL WARDROBE
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto mb-14 mt-30">
                        <div >
                            {/*TODO:l This is where the login or register page content gets pulled in. "children" is what makes the layout reusable*/}
                            {children}
                        </div>
                    </div>

                    {/*footer*/}
                    <div className={'mb-20 text-white/60 font-[500] max-w-xl mx-auto tracking-[0.09em] text-xl'}>
                        Upgrade your style. Simplify your routine.
                    </div>
                </div>
            </div>
        </div>

    );

}


