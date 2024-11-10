import React from "react";

export default function FormContent(props) {
    return (
        <div className="overflow-y-auto max-h-[80vh] w-[80vh] bg-white p-4 shadow-2xl shadow-zinc-500 border-2 border-zinc-400 rounded-lg space-y-3 text-black">
            
                <div> 
                  <label> First Name</label>
                </div>
                <input onChange={props.handleFlags} type = "checkbox" className = "rounded" name="firstName" checked={props.flags.firstName}/>
                <input onChange={props.handleUserState} type = "text" className = "rounded m-3 border w-[42vh]" name="firstName" value={props.userInfo.firstName}></input>

                <div> 
                  <label> Last name</label>
                </div>
                <input onChange={props.handleFlags} type = "checkbox" className = "rounded" name="lastName" checked={props.flags.lastName}/>
                <input onChange={props.handleUserState} type = "text" className = "rounded m-3 border w-[42vh]" name="lastName" value={props.userInfo.lastName}></input>
                
                <div> 
                  <label> Age:</label>
                </div>
                <input onChange={props.handleFlags} type = "checkbox" className = "rounded" name="age" checked={props.flags.age}/>
                <input onChange={props.handleUserState} type = "text" className = "rounded m-3 border w-[42vh]" name="age" value={props.userInfo.age}></input>

                <div> 
                  <label> Phone Number </label>
                </div>
                <input onChange={props.handleFlags} type = "checkbox" className = "rounded" name="phoneNum" checked={props.flags.phoneNum}/>
                <input onChange={props.handleUserState} type = "text" className = "rounded m-3 border w-[42vh]" name="phoneNum" value={props.userInfo.phoneNum}></input>

                <div> 
                  <label> Emergency Contact: Number </label>
                </div>
                <input onChange={props.handleFlags} type = "checkbox" className = "rounded" name="emerContactNum" checked={props.flags.emerContactNum}/>
                <input onChange={props.handleUserState} type = "text" className = "rounded m-3 border w-[42vh]" name="emerContactNum" value={props.userInfo.emerContactNum}></input>

                <div> 
                  <label> Email:</label>
                </div>
                <input onChange={props.handleFlags} type = "checkbox" className = "rounded" name="email" checked={props.flags.email}/>
                <input onChange={props.handleUserState} type = "text" className = "rounded m-3 border w-[42vh]" name="email" value={props.userInfo.email}></input>

                <div> 
                  <label> Address </label>
                </div>
                <input onChange={props.handleFlags} type = "checkbox" className = "rounded" name="address" checked={props.flags.address}/>
                <input onChange={props.handleUserState} type = "textarea" className = "rounded m-3 border w-[42vh]" name="address" value={props.userInfo.address}></input>

                <div> 
                  <label> Blood Type </label>
                </div>
                <input onChange={props.handleFlags} type = "checkbox" className = "rounded" name="bloodType" checked={props.flags.bloodType}/>
                <input onChange={props.handleUserState} type = "text" className = "rounded m-3 border w-[42vh]" name="bloodType" value={props.userInfo.bloodType}></input>
                
                <div> 
                  <label> Allergies: </label>
                </div>
                <input onChange={props.handleFlags} type = "checkbox" className = "rounded" name="allergies" checked={props.flags.allergies}/>
                <input onChange={props.handleUserState} type = "textarea" className = "rounded m-3 border w-[42vh] h-20" name="allergies" value={props.userInfo.allergies}></input>

                <div> 
                  <label> Dietary Restrictions: </label>
                </div>
                <input onChange={props.handleFlags} type = "checkbox" className = "rounded" name="dietaryRestrictions" checked={props.flags.dietaryRestrictions}/>
                <input onChange={props.handleUserState} type = "textarea" className = "rounded m-3 border w-[42vh] h-20" name="dietaryRestrictions" value={props.userInfo.dietaryRestrictions}></input>

                <div> 
                  <label> Vaccinations: </label>
                </div>
                <input onChange={props.handleFlags} type = "checkbox" className = "rounded" name="vaccinations" checked={props.flags.vaccinations}/>
                <input onChange={props.handleUserState} type = "textarea" className = "rounded m-3 border w-[42vh] h-20" name="vaccinations" value={props.userInfo.vaccinations}></input>

                <div> 
                  <label> Medications: </label>
                </div>
                <input onChange={props.handleFlags} type = "checkbox" className = "rounded" name="medications" checked={props.flags.medications}/>
                <input onChange={props.handleUserState} type = "textarea" className = "rounded m-3 border w-[42vh] h-20" name="medications" value={props.userInfo.medications}></input>

                <div> 
                  <label> Physical Disabilities: </label>
                </div>
                <input onChange={props.handleFlags} type = "checkbox" className = "rounded" name="physicalDisabilities" checked={props.flags.physicalDisabilities}/>
                <input onChange={props.handleUserState} type = "textarea" className = "rounded m-3 border w-[42vh] h-20" name="physicalDisabilities" value={props.userInfo.physicalDisabilities}></input>

                <div> 
                  <label> Mental Disorders: </label>
                </div>
                <input onChange={props.handleFlags} type = "checkbox" className = "rounded" name="mentalDisorders" checked={props.flags.mentalDisorders}/>
                <input onChange={props.handleUserState} type = "textarea" className = "rounded m-3 border w-[42vh]" name="lastName" value={props.userInfo.lastName}></input>

                <div> 
                  <label> DNR status</label>
                </div>
                <input onChange={props.handleFlags} type = "checkbox" className = "rounded" name="dnrStatus" checked={props.flags.dnrStatus}/>
                <input onChange={props.handleUserState} type = "textarea" className = "rounded m-3 border w-[42vh]" name="dnrStatusß" value={props.userInfo.dnrStatusß}></input>

      

                
          </div>
    )
}