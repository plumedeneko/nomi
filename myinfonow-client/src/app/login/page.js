"use client";

import { useState } from 'react';
import '../globals.css'

export default function Login() {

    const [login, setLogin] = useState({});
  
  const [username, setUsername] = useState({
    username: "",
    password: ""
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState (" ")
  const handleLogin = (e) => {
    e.preventDefault();
    
};
  
  function handleChange(event) {
    setLogin(prevLogin => ({
        ...login,
        [event.target.name]: event.target.value
    }))
  }
  
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className = "z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
            <div className = "flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">  
                <h3 className ="text-xl font-semibold text-black">Sign In</h3>
                <p className = "text-sm text-gray-400">
                    Username and Password to log in
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
            
            </form>


        </div>

    </div>



    // <div className = "flex justify-center items-center h-screen mx-auto pace-y-4 w-96 text-3x1 font-bold underline">
    //     <h2>Login</h2>
    //     <div className = "flex justify-center items-center">
    //         <form onSubmit={handleLogin}>
    //             <label htmlFor="username">Username</label>
    //             <input
    //                 type="text"
    //                 id="username"
    //                 value={username}
    //                 onChange={(e) => setUsername(e.target.value)}
    //                 required
    //             />

    //             <label htmlFor="password">Password</label>
    //             <input
    //                 type="password"
    //                 id="password"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 required
    //             />

    //             <button type="submit">Login</button>
    //         </form>
    //     </div>
    // </div>
  );
}
