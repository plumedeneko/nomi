import React from "react";

export default function GetInfo(props) {

    /*
    
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
    
    */
   const keys = ["firstName", "lastName", "age", "phoneNum", "emerContactNum", "email", "address", "bloodType", "allergies", "dietaryRestrictions", "vaccinations", 
                "medications", "physicalDisabilities", "mentalDisorders", "dnrStatus"]
    
//     const keyElements = keys.map((name, index) => {
//         if ("key" in props.result)
//             return (
//                     <h4 key={index}>{props.result[name]}</h4>
//                     )
//         return (<div key={index}></div>)
//     })
    
    const keyElements = keys.map((name, index) => {
        if (props.result[name]) {
            return (
                <h4 key={index}>{props.result[name]}</h4>
            );
        }
        return <div key={index}></div>;
    });
  
    
    console.log(props.result);


    
    return (
        <div>
            {keyElements}
        </div>
    )
}