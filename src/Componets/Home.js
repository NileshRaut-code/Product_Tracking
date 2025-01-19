import React from 'react'
import { useNavigate } from 'react-router-dom'

 import { useState, useEffect } from 'react'
 import { motion } from 'framer-motion'
 import { Truck, User, MapPin } from 'lucide-react'
 
 export default function Home() {
   const [mounted, setMounted] = useState(false)
   const navigate=useNavigate()
   useEffect(() => {
     setMounted(true)
   }, [])
 
   if (!mounted) {
     return null
   }
 
   return (
    // <div className='bg-gray-900'></div>
     <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex flex-col items-center justify-center p-4 overflow-hidden">
       <motion.div
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="text-4xl md:text-6xl font-bold text-white mb-8 text-center"
       >
         Login As
       </motion.div>
       <MapPin className="absolute top-1/2 right-1/4 text-white opacity-30 w-12 h-12" />
       <Truck className="absolute bottom-1/3 left-1/4 text-white opacity-30 w-16 h-16" />
       <div className="flex flex-col md:flex-row gap-6 z-10">
         <button onClick={()=>{navigate("/delivery")}}
           className="flex items-center px-8 py-6 text-xl font-semibold text-white bg-purple-600 rounded-lg hover:bg-white hover:text-purple-600 transition-all duration-300 ease-in-out transform hover:scale-105"
         >
           <Truck className="mr-2 h-6 w-6" />
           Rider
         </button>
         <button onClick={()=>{navigate("/user")}}
           className="flex items-center px-8 py-6 text-xl font-semibold text-white bg-indigo-600 rounded-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 ease-in-out transform hover:scale-105"
         >
           <User className="mr-2 h-6 w-6" />
           User
         </button>
       </div>
 
       {/* Background Animation */}
       <div className="absolute inset-0 z-0">
         <motion.div
           className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-300 rounded-full"
           animate={{
             scale: [1, 1.5, 1],
             opacity: [1, 0.5, 1],
             x: [0, 100, 0],
             y: [0, -100, 0],
           }}
           transition={{
             duration: 5,
             repeat: Infinity,
             repeatType: "reverse",
           }}
         />
         <motion.div
           className="absolute top-3/4 right-1/4 w-4 h-4 bg-green-300 rounded-full"
           animate={{
             scale: [1, 1.5, 1],
             opacity: [1, 0.5, 1],
             x: [0, -100, 0],
             y: [0, 100, 0],
           }}
           transition={{
             duration: 6,
             repeat: Infinity,
             repeatType: "reverse",
           }}
         />
         {/* <motion.div
           className="absolute bottom-1/4 left-1/3 w-6 h-6 border-4 border-white rounded-full"
           animate={{
             scale: [1, 1.5, 1],
             opacity: [1, 0.5, 1],
             rotate: [0, 180, 360],
           }}
           transition={{
             duration: 7,
             repeat: Infinity,
             repeatType: "reverse",
           }}
         /> */}
        
       </div>
     </div>
   )
 }
 