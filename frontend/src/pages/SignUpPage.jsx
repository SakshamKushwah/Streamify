import React from 'react'
import { useState } from 'react';

const SignUpPage = () => {

    const [signupData, setSignupData] = useState({
        FullName: "",
        email: "",
        password: "",
    });

    const handleSignup = (e) => {
        e.preventDefault();
    }


  return (
    <div className='h-screen flex item-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
      <div>
    sign-up page
      </div>
    </div>
  )
}

export default SignUpPage
