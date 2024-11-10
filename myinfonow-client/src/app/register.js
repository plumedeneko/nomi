"use client";

import Link from 'next/link';
import {useState, ChangeEvent} from 'react';
import { useAuth } from './authprovider';
import './globals.css'

export default function Register(props){
    
    const {login} = useAuth();
    
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: ""
    });
    
    const [basicInfo, setBasicInfo] = useState({
        fname:"",
        lname:"",
        emergencyPhone:""
    })
    
    console.log(loginInfo)
    console.log(basicInfo)
  
  const [username, setUsername] = useState({ });
  const [password, setPassword] = useState('');
  const [error, setError] = useState ("")
  const handleRegister = async (e) => {
    e.preventDefault();
    
    try{
        const response = await fetch("http://127.0.0.1:5050/users/register", {
            method: "POST",
            headers : {"Content-Type": 'application/json'},
            body: JSON.stringify({...loginInfo}),
        });
        const data = await response.json();
        
        if(!response.ok){
            setError(data.message);
        }
        await addRow();
        await addPreset("p1");
        await addPreset("p2");
        await addPreset("p3");
        props.setPage(1);
    } catch(error){
        setError("An error occurred during login. Please try Again.")
    
    }
};

async function addRow() {
    try{
        const response = await fetch("http://127.0.0.1:5050/users/add-info", {
            method: "POST",
            headers : {"Content-Type": 'application/json'},
            body: JSON.stringify({...basicInfo, username:loginInfo.username}),
        });
        const data = await response.json();
        
        if(!response.ok){
            setError(data.message);
        }
    
    
    } catch(error){
        setError("An error occurred during login. Please try Again.")
    
    }
}

async function addPreset(preset) {
    try{
        const response = await fetch("http://127.0.0.1:5050/users/add-preset", {
            method: "POST",
            headers : {"Content-Type": 'application/json'},
            body: JSON.stringify({username:loginInfo.username, presetID:`${preset}`}),
        });
        const data = await response.json();
        
        if(!response.ok){
            setError(data.message);
        }
    
    
    } catch(error){
        setError("An error occurred during login. Please try Again.")
    
    }
}
  
const handleLoginChange = (event) => {
    const{ name, value} = event.target;
    setLoginInfo((prevLogin) =>({
        ...prevLogin,
        [name]:value,
    }));
}
const handleInfoChange = (event) => {
    const{ name, value} = event.target;
    setBasicInfo((prevLogin) =>({
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
                <div className = "flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
                    
                    <div>
                        <label 
                            htmlFor = "username"
                            className = "block text-xs text-gray-600 "
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            onChange={handleLoginChange}
                            autoComplete = "username"
                            required
                            className = "mt-1 block w-full appearance-none rounded-md border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-black sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className = "block text-xs text-gray-600 "
                        >
                            Password
                        </label>
                        <input 
                            id="password"
                            name="password"
                            onChange={handleLoginChange}
                            type="password"
                            
                            required
                            className = "mt-1 block w-full appearance-none rounded-md border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-black sm:text-sm"
                        />
                    
                    </div>
                    <div>
                        <label 
                            htmlFor = "firstName"
                            className = "block text-xs text-gray-600 "
                        >
                            First name
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            onChange={handleInfoChange}
                            type="text"
                            autoComplete = "firstName"
                            required
                            className = "mt-1 block w-full appearance-none rounded-md border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-black sm:text-sm"
                        />
                    </div>

                    <div>
                        <label 
                            htmlFor = "lastName"
                            className = "block text-xs text-gray-600 "
                        >
                            Last name
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            onChange={handleInfoChange}
                            type="text"
                            autoComplete = "lastName"
                            required
                            className = "mt-1 block w-full appearance-none rounded-md border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-black sm:text-sm"
                        />
                    </div>

                    <div>
                        <label 
                            htmlFor = "emerContactNum"
                            className = "block text-xs text-gray-600 "
                        >
                            Emergency Phone
                        </label>
                        <input
                            id="emerContactNum"
                            name="emerContactNum"
                            type="tel"
                            onChange={handleInfoChange}
                            autoComplete = "emerContactNum"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            inputMode='tel'
                            required
                            className = "mt-1 block w-full appearance-none rounded-md border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-black sm:text-sm"
                        />
                    </div>


                    <button
                        type = "submit"
                        aria-disabled="false"
                        onClick={handleRegister}
                        className ="flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
                        > Sign up
                    <span aria-live = "polite" className="sr-only" role="status">
                        Submit form
                    </span>
                    </button>
                    <p className="text-center text-sm text-red-600">{error}</p>
                    <p className = "text-center text-sm text-gray-600">
                        {"Already have an account? "}
                    <a onClick={() => props.setPage(1)} className = "text-blue-500 hover:text-red-500 hover:cursor-pointer">Sign in</a>
                    
                    {' instead.'}
                    </p>
    
                </div>
            </div>
        </div>
    
    
      );
}