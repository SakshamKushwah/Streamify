import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { login } from '../lib/api';
import { ShipWheelIcon } from 'lucide-react';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });


  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    ispending,
    error,} = useMutation({
      mutationFn: login,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authUser'] }),
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  }

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme='forest'>
      <div className='border border-primary/25 flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100
      rounded-xl shadow-lg overflow-hidden'>

        {/* LOGIN FORM SECTION */}
        <div className='w-full lg:h-1/2  sm:p-4 md:p-6 '>
          {/* LOGO */}
          <div className='mb-4 flex items-center justify-start gap-2'>
            <ShipWheelIcon className='size-9 text-primary' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary 
            tracking-wider'>
              Streamify
            </span>
          </div>
          {/* ERROR MESSAGE IF ANY */}
          {/* <div className='alert alert-error mb-4'>
            <span>{error.response.data.message}</span>
          </div> */}
        </div>

        <div className='w-full'>
          <form onSubmit={handleLogin}>
            <div className='space-y-4'>
              <div>
                <h2 className='text-xl font-semibold'>
                  Welcome Back! Please Login
                </h2>
                <p className='text-sm opacity-70'>
                  Sign in to your account to continue your journey with Streamify.
                </p>
              </div>


              <div className='flex flex-col gap-3'>
                <div className='form-control w-full space-y-2'>
                  <label className="label">
                    <span className='label-text'>Email</span>
                  </label>
                  <input 
                  type="text"
                  placeholder='hello@exaple.com'
                  className='input input-bordered w-full'
                  value={loginData.email}
                  onChange={ (e) => setLoginData({...loginData, email: e.target.value})} 
                  required
                  />
                </div>

                <div className='form-control w-full space-y-2'>
                  <label className="label">
                    <span className='label-text'>Password</span>
                  </label>
                  <input type="password"
                  placeholder='********'
                  className='input input-bordered w-full'
                  value={loginData.password}
                  onChange={ (e) => setLoginData({...loginData, password: e.target.value})} 
                  required
                   />
                </div>

                {/* <button type='submit' className='btn btn-primary w-full' disabled={ispending}>
                  { ispending ?
                   (
                    <>
                    <span className='loading loading-spinner loading-xs></span>
                    Signing In...
                    </>
                    ) : (
                     "Sign In"
                          ) }
                  
                      </button> */}
              </div>
            </div>

          </form>

        </div>



      </div>
    </div>
  )
}

export default LoginPage
