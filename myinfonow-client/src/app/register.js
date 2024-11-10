"use client";

import Link from 'next/link';
import {useState, ChangeEvent} from 'react';
import './globals.css'

export default function Register(props){
    
      const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: ""
    });
  
  const [username, setUsername] = useState({
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState (" ")
  const handleLogin = (e) => {
    e.preventDefault();
    
};
  
const handleChange = (event) => {
    const{ name, value} = event.target;
    setLoginInfo((prevLogin) =>({
        ...prevLogin,
        [name]:value,
    }));
};

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <div className = "z-10 w-full max-w-md overflow-hidden rounded-3xl border border-blue-500 shadow-xl shadow-blue-200 text-gray-400">
                <div className = "flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">  
                    <h3 className ="text-xl font-semibold text-black">Register</h3>
                    <p className = "text-sm text-gray-400">
                        Username and Password to sign up
                    </p>
                </div>
                <form className = "flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
                    <div>
                        <label 
                            htmlFor = "username"
                            className = "block text-xs text-gray-600 uppercase"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="username"
                            placeholder = "username"
                            autoComplete = "username"
                            required
                            className = "mt-1 block w-full appearance-none rounded-md border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-black sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className = "block text-xs text-gray-600 uppercase"
                        >
                            Password
                        </label>
                        <input 
                            id="password"
                            name="password"
                            type="password"
                            required
                            className = "mt-1 block w-full appearance-none rounded-md border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-black sm:text-sm"
                        />
                    
                    </div>
                
                    <button
                        type = "submit"
                        aria-disabled="false"
                        className ="flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
                        > Sign up
                    <span aria-live = "polite" className="sr-only" role="status">
                        Submit form
                    </span>
                    </button>
                    
                    <p className = "text-center text-sm text-gray-600">
                        {"Already have an account? "}
                    <a onClick={() => props.setPage(1)}>Sign in</a>
                    
                    {' instead.'}
                    </p>
    
                </form>
            </div>
        </div>
    
    
      );
}