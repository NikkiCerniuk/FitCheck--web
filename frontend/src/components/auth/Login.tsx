// components/auth/LoginForm.tsx
"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                alert("Login successful");
                // TODO: use next/navigation redirect after success
                // const router = useRouter(); router.push("/dashboard");
            } else {
                alert("Invalid credentials")
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Unable to connect to server");
        } finally {
            setLoading(false);
            console.log("Login attempt for", { email });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {/* card*/}
                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-lg">
                    <h2 className="mt-17 text-white font-brand font-[500] tracking-[0.20em] uppercase text-[25px] text-center mb-4">
                        Welcome Back
                    </h2>

                    <div className="space-y-6 sm:space-y-8 text-left p-12">
                        <div className="space-y-2 sm:space-y-3">
                            <label
                                htmlFor="email"
                                className="mb-7 mt-5 block text-white font-[600] tracking-[0.15em] uppercase text-black/60 text-[20px]">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-4 font-[500] text-[25px] w-full h-17 bg-white/10 text-white rounded-md placeholder-white/60 border border-white/20 backdrop-blur-xl backdrop-saturate-150 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 hover:border-white/35"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="space-y-2 sm:space-y-3 mt-20">
                            <label
                                htmlFor="password"
                                className="mb-7 block text-white font-[600] tracking-[0.15em] uppercase text-black/60 text-[20px]">
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

{/*forgot password link*/}
                        <div className="text-right">
                            <button
                                type="button"
                                className="font-[500] text-white/60 hover:text-red-800 dark:hover:text-red-400 text-[20px]"
                                onClick={() => alert("Forgot password functionality coming soon!")}
                            >
                                Forgot Password?
                            </button>
                        </div>


{/*register link*/}
                        <div className="text-center">
                            <p className="text-white/60 text-[20px]">
                                Don&apos;t have an account?{" "}

                                <button
                                    type="button"
                                    onClick={() => alert("Sign-up page coming next!")}
                                    className="mt-5 mb-8 text-[20px] text-white-600 dark:hover:text-red-400 hover:text-red-800 font-[500]"
                                >
                                    Sign up
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SIGN IN BUTTON - Outside the card, inside the form */}
            <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-between tracking-[0.17em] text-[30px] font-[500] 
                mt-10 w-full bg-white text-black py-10 px-10 focus:outline-none focus-visible:ring-2 
                focus-visible:ring-white/40 focus-visible:ring-offset-0 disabled:opacity-50 
                disabled:cursor-not-allowed transition-all hover:bg-black/30 
                hover:text-white hover:shadow-[0_0_0_2px_rgba(255,255,255,0.25)] active:shadow-[0_0_0_4px_rgba(255,255,255,0.35)]"
            >
                <span>{isLoading ? "SIGNING IN.." : "SIGN IN"}</span>
                <ArrowRight
                    className="flex-shrink-0"
                    width={30}
                    height={30}
                    strokeWidth={3}
                    aria-hidden="true"
                />
            </button>
        </form>
    );
}