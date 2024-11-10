"use client";

import Link from 'next/link';
import { useEffect, useState }  from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './contexts/AuthContext';
import '../globals.css';
import Scanner from '../scanner';



interface LoginForm{
    username: string;
    password: string;
}

export default function Login() {

    const { login } = useAuth();
    const router = useRouter();

    const [loginInfo, setLoginInfo] = useState<LoginForm>({
        username: "",
        password: ""
    });
  
    const [error, setError] = useState (" ")


    useEffect(() => {
        console.log(router);  // See if the router object is defined
      }, [router]);
      
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try{
            const response = await fetch("/api/login", {
                method: "POST",
                headers : {"Content-Type": 'application/json'},
                body: JSON.stringify({
                    username: loginInfo.username,
                    password: loginInfo.password
                }),
            });
            
            if(!response.ok){
                setError('Login Failed');
                return;
            }

            const { token } = await response.json();
            login(token);
            router.push("./protected");

        } catch(error){
            setError("An error occurred during login. Please try Again.")
    }

};
  
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const{ name, value} = event.target;
    setLoginInfo((prevLogin) =>({
        ...prevLogin,
        [name]:value,
    }));
};

  return (
    
    <div>
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">

            <div className='flex items-center justify-center bg-gray-50'>
                <div className='flex m-10 p-20 shadow-2xl shadow-red-200 rounded-3xl border border-red-500 bg-white-100'>
                    <p className='text-black font-serif tracking-wide font-bold text-lg antialiased'> 
                        MyInfoNow
                    </p>
                </div>
            </div>

            <div className="z-10 w-full max-w-md overflow-hidden rounded-3xl border border-blue-500 shadow-xl shadow-blue-200 text-gray-400">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold text-black">Sign In</h3>
                    <p className="text-sm text-gray-400">
                        Username and Password to log in
                    </p>
                </div>
                    <form
                    // onSubmit={handleLogin} 
                    className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-xs text-gray-600 uppercase"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="username"
                                value={loginInfo.username}
                                onChange={handleChange}
                                autoComplete="username"
                                required
                                className="mt-1 block w-full appearance-none rounded-md border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-black sm:text-sm" />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-xs text-gray-600 uppercase"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                value={loginInfo.password}
                                onChange={handleChange}
                                type="password"
                                required
                                className="mt-1 block w-full appearance-none rounded-md border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-black sm:text-sm" />

                        </div>


                        <div className='flex flow'>
                            <button
                                type="submit"
                                aria-disabled="false"
                                className="flexrow m-1 h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
                            > Sign In
                                <span aria-live="polite" className="sr-only" role="status">
                                    Submit form
                                </span>
                            </button>


                            <button
                                className="flexrow m-1 h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
                            > Scan QR Code
                            </button>
{/* 
                            <Scanner/> */}
                        </div>

                        <p className="text-center text-sm text-gray-600">
                            {"Don't have an account? "}
                            <Link href="/register" className="font-bold text-gray-400">
                                Sign up
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
    </div>


  );
}
