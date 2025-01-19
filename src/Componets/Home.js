import React from 'react'
import { useNavigate } from 'react-router-dom'

 import {  useEffect } from 'react'

 
 export default function Home() {
   
   const navigate=useNavigate()
   useEffect(() => {
     navigate("/problems")
   }, [navigate])
 
  
 
   return (
    <div className='bg-gray-900'></div>
   
   )
 }
 