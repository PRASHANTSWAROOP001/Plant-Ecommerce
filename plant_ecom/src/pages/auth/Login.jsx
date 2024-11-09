import React from 'react'

import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='mx-auto max-w-md w-full'>

<div className="flex items-center justify-center px-5 py-16 md:px-10 md:py-20">
          <div className="max-w-md text-center">
            <h2 className="mb-8 text-3xl font-bold md:mb-12 md:text-5xl lg:mb-16">
              Create Your Account Now
            </h2>
            {/* Form */}
            <div className="mx-auto mb-4 max-w-sm pb-4">
              <form name="wf-form-password" method="get">
                <div className="relative">
                  <img
                    alt=""
                    src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9455fae6cf89_EnvelopeSimple.svg"
                    className="absolute left-5 top-3 inline-block"
                  />
                  <input
                    type="email"
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
                    className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 pl-14 text-sm text-black placeholder:text-black"
                    placeholder="Password (min 8 characters)"
                    required=""
                  />
                </div>
                <label className="mb-6 flex items-center justify-start pb-12 pl-5 font-medium md:mb-10 lg:mb-1">
                  <input
                    type="checkbox"
                    name="checkbox"
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
              Dont have an account?
            
              <Link to='/auth/registration'>

               <span className='font-bold text-black px-1 hover:underline' >
                  Register Now 
               </span>

              </Link>
            </p>
          </div>
        </div>

    </div>
  )
}

export default Login