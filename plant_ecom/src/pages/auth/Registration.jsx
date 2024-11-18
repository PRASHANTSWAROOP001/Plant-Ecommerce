import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { registerUser } from "@/store/authReducer";

import { useToast } from "@/hooks/use-toast";

function Registration() {

  const dispatch = useDispatch();

  const {toast} = useToast();

  

  const [formData, setFormData] = useState({
    userName:"",
    email:"",
    password:"",
    agreeToTerms:false
  })


  const handleInputChange = (e)=>{

    const {name,type,checked,value} = e.target;

    setFormData({
      ...formData,
      [name]:type === "checkbox" ? checked:value
    })

  }




  async function handleRegistration(e){

    e.preventDefault();

    if(!formData.agreeToTerms){
      alert("Please Agree To Our Terms And Conditions");
      return;
    }

    try {

      
   const response = await dispatch(registerUser(formData))
   console.log(response)
   toast({
    title:"User have successfully Registered"
   })
      
    } catch (error) {

      console.error("Error happend while registering user: ", error);

      toast({
        title:`Error happend while registering: ${error}`
      })
      
    }



  }



  return (
    <div className="mx-auto max-w-md w-full">
      <div className="flex items-center justify-center px-5 py-16 md:px-10 md:py-20">
        <div className="max-w-md text-center">
          <h2 className="mb-8 text-3xl font-bold md:mb-12 md:text-5xl lg:mb-16">
            Create Your Account Now
          </h2>
          {/* Form */}
          <div className="mx-auto mb-4 max-w-sm pb-4">
            <form onSubmit={handleRegistration}>
              <div className="relative">
                <img
                  alt=" user icon"
                  src="/user.png"
                  className="absolute left-5 top-3 inline-block w-6 h-6"
                />

                <input
                  type="text"
                  name="userName"
                  className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 pl-14 text-sm text-black placeholder:text-black"
                  placeholder="user name "
                  value={formData.userName}
                  onChange={(e)=>(handleInputChange(e))}
                  required=""
                />
              </div>

              <div className="relative">
                <img
                  alt=""
                  src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9455fae6cf89_EnvelopeSimple.svg"
                  className="absolute left-5 top-3 inline-block"
                />

                <input
                  type="email"
                  name="email"
                  className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 pl-14 text-sm text-black placeholder:text-black"
                  placeholder="Email Address"
                  value = {formData.email}
                  onChange={handleInputChange}
                  required=""
                />
              </div>
              <div className="relative mb-4">
                <img
                  alt=""
                  src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a946794e6cf8a_Lock-2.svg"
                  className="absolute left-5 top-3 inline-block"
                />
                <input
                  type="password"
                  name="password"
                  className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 pl-14 text-sm text-black placeholder:text-black"
                  placeholder="Password (min 8 characters)"
                  value={formData.password}
                  onChange={handleInputChange}
                  required=""
                />
              </div>
              <label className="mb-6 flex items-center justify-start pb-12 pl-5 font-medium md:mb-10 lg:mb-1">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  value={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="float-left mt-1"

                />
                <span
                  className="ml-4 inline-block cursor-pointer text-sm"
                  htmlFor="checkbox"
                >
                  I agree with the
                  <a href="#" className="font-bold text-black">
                    Terms &amp; Conditions
                  </a>
                </span>
              </label>
              <input
                type="submit"
                value="Join Green Thumb"
                className="inline-block w-full cursor-pointer items-center bg-black px-6 py-3 text-center font-semibold text-white"
              />
            </form>
          </div>
          <p className="text-sm text-gray-500 sm:text-sm">
            Have an account?
            <Link to="/auth/login">
              <span className="font-bold text-black px-1 hover:underline">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
