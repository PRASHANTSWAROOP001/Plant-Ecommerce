import React, {useState} from "react";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginUser } from "@/store/authReducer";
import { useToast } from "@/hooks/use-toast";


function Login() {

  const dispatch = useDispatch();
  const {toast} = useToast();

  const [formData, setFormData] = useState({
    email:"",
    password:""
  });


  const handleInputChange = (e)=>{

    const {name,value} = e.target;


    setFormData({
      ...formData,
      [name]:value
    })

   // console.log(name,value);

    //console.log(formData)
  }


  const handleLogin = async (e)=>{

    e.preventDefault();

   try {
    

    const responce = await dispatch(loginUser(formData))
    console.log(responce);
    toast({
      title:"Successfully logged in"
    })
   } catch (error) {
    console.error("Error happend while logging",error);

    toast({
      title:`Error while logging ${error}`
    })
    
   }
  }

  return (
    <div className="mx-auto max-w-md w-full">
      <div className="flex items-center justify-center px-5 py-16 md:px-10 md:py-20">
        <div className="max-w-md text-center">
          <h2 className="mb-8 text-3xl font-bold md:mb-12 md:text-5xl lg:mb-16">
            Login In Now
          </h2>
          {/* Form */}
          <div className="mx-auto mb-4 max-w-sm pb-4">
            <form onSubmit={handleLogin}>
              <div className="relative">
                <img
                  alt=""
                  src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9455fae6cf89_EnvelopeSimple.svg"
                  className="absolute left-5 top-3 inline-block"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 pl-14 text-sm text-black placeholder:text-black"
                  placeholder="Email Address"
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
                  onChange={handleInputChange}
                  value={formData.password}
                  className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 pl-14 text-sm text-black placeholder:text-black"
                  placeholder="Password (min 8 characters)"
                  required=""
                />
              </div>
            
              <input
                type="submit"
                value="Join Green Thumb"
                className="inline-block w-full cursor-pointer items-center bg-black px-6 py-3 text-center font-semibold text-white"
              />
            </form>
          </div>
          <p className="text-sm text-gray-500 sm:text-sm">
            Dont have an account?
            <Link to="/auth/registration">
              <span className="font-bold text-black px-1 hover:underline">
                Register Now
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
