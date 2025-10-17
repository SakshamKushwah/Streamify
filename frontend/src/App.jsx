import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import CallPage from './pages/Callpage.jsx'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { axiosInstance } from './lib/axios.js'



const App = () => {
const {data , isLoading , error } = useQuery({
  queryKey: ['todos'],

  queryFn: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
}
});

console.log(data);



  return (
    <div className=' h-screen' data-theme='night'>
     <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/onboarding' element={<OnboardingPage />} />
      <Route path='/notifications' element={<NotificationsPage />} />
      <Route path='/call' element={<CallPage />} />
      <Route path='/chat' element={<ChatPage />} />
     </Routes>

     <Toaster />
    </div>
  )
}

export default App
