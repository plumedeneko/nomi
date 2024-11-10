import React from "react";
import axios from "axios";
import FormContent from "./formcontent";
import { useState, useEffect } from "react";
import { useAuth } from "./authprovider";

export default function MainContent(props) {
  const [userInfo, setUserInfo] = useState({
    firstName : "", 
    lastName : "", 
    age : "", 
    phoneNum : "", 
    emerContactNum : "", 
    email : "",
    address : "", 
    bloodType : "", 
    allergies : "",
    dietaryRestrictions : "",
    vaccinations: "", 
    medications : "",
    physicalDisabilities : "", 
    mentalDisorders : "", 
    dnrStatus : ""
  });
  const [presetID, setPresetID] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [flags, setFlags] = useState({
    firstName: true, 
    lastName: true,
    age : false, 
    phoneNum : false, 
    emerContactNum : true, 
    email : false,
    address : false, 
    bloodType : true, 
    allergies : false,
    dietaryRestrictions : false, 
    vaccinations : false, 
    medications : false,
    physicalDisabilities : false, 
    mentalDisorders : false, 
    dnrStatus : false
  })

  const {username} = useAuth();

  useEffect(() => {
    if (presetID) {
      fetchQRCode(presetID);
      // fetchUserInfo(username);
      fetchPreset(presetID);
      fetchAllUserInfo(username);
    }
  }, [presetID]);

  console.log(flags)
  console.log(userInfo)

  const handleUpdateInfo = async (userData) => {
    try {
      const response = await axios.put("http://localhost:5050/users/update-info", userData);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error.message);
    }
  };

  // Fetch QR Code using presetID
  const fetchQRCode = async (presetID) => {
    try {
      console.log(`${username} ${presetID}`)
      const response = await fetch("http://localhost:5050/users/get-qr", {
        method: "POST",
        headers : {"Content-Type": 'application/json'},
        body: JSON.stringify({username: username, presetID: presetID})
      });
     const data = await response.json();
      setQrCode(data.qrCode); // Set QR code image
    } catch (error) {
      console.error(error);
    }
  };
  

  const fetchPreset = async (presetID) => {
    try {
      console.log(`${username} ${presetID}`)
      const response = await fetch("http://localhost:5050/users/get-preset", {
        method: "POST",
        headers : {"Content-Type": 'application/json'},
        body: JSON.stringify({username: username, presetID: presetID})
      });
     const data = await response.json();
      setFlags({...data.data}); 
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchAllUserInfo = async (username) => {
    try {
      const response = await fetch("http://localhost:5050/users/get-allinfo", {
        method: "POST",
        headers : {"Content-Type": 'application/json'},
        body: JSON.stringify({username: username})
      });
     const data = await response.json();
      setUserInfo({...data.data}); 
      console.log(userInfo)
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch user info by presetID
  const fetchUserInfo = async (username) => {
    try {
      const response = await axios.post("http://localhost:5050/users/get-info", {
        username,
        presetID
      });
      setUserInfo(response.data.data); // Assuming backend returns user data in `data`
    } catch (error) {
      console.error("Error fetching user info", error);
    }
  };

  // Handle saving preset
  const handleSave = async () => {
    try {
      saveFlags();
      saveUserInfo();
      
    } catch (error) {
      console.error("Error saving", error);
    }
  };

  const saveFlags = async () => {
    try {
      const response = await axios.put("http://localhost:5050/users/update-preset", {
        ...flags, username: username, presetID: presetID
      });
    } catch (error) {
      console.error("Error fetching user info", error);
    }
  }
  const saveUserInfo = async () => {
    try {
      const response = await axios.put("http://localhost:5050/users/update-info", {
        ...userInfo, username: username
      });
    } catch (error) {
      console.error("Error fetching user info", error);
    }
  }



  function handleUserState(event) {
    const {name, value} = event.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function handleFlags(event) {
    const {name, checked} = event.target;
    setFlags(prev => ({
      ...prev,
      [name]: !prev[name]
    }))
  }



  return (
    <div className="flex flex-col h-screen bg-gray-100 p-6">
    {/* Header Section */}
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold text-black">MyInfoNow</h1>
      
      {/* Centered Welcome Message */}
      <h2 className="text-2xl font-semibold shadow-2xl text-center text-black">Welcome!</h2>

      <button className="px-4 py-2 text-white bg-red-500 rounded-lg">Sign Out</button>
    </div>

    {/* Main Content Section */}
    <div className="flex justify-center">
      {/* Left Section - Presets and Item List */}
      <div className="w-35 mr-6">
        {/* Preset Buttons */}
        <div className="flex space-x-4 mb-4">
          <button onClick={() => setPresetID("p1")} className="px-10 py-2 bg-blue-500 text-white rounded-lg">Preset 1</button>
          <button onClick={() => setPresetID("p2")} className="px-10 py-2 bg-blue-500 text-white rounded-lg">Preset 2</button>
          <button onClick={() => setPresetID("p3")} className="px-10 py-2 bg-blue-500 text-white rounded-lg">Preset 3</button>
          <button onClick={handleSave} className="px-12 py-2 bg-green-500 text-white rounded-lg">Save</button>
        </div>
        
        {/* Item List */}

        <FormContent flags={flags} userInfo={userInfo} handleFlags={handleFlags} handleUserState={handleUserState} />
      
      </div>

      {/* Right Section - QR Code */}
      <div className="w-[50vh] flex items-center justify-center shadow-2xl shadow-zinc-500 border-zinc-500 border-2 bg-white p-8 shadow-2xl rounded-lg">
        {qrCode ? (
          <img src={qrCode} alt="QR Code" className="object-contain w-full" />
        ) : (
          <div className="text-4xl text-gray-500">QR</div>
        )}
      </div>

    </div>
    </div>
  );
}