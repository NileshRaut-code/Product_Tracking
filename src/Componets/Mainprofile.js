import React, { useState,useEffect } from 'react'
import Profile from './Profile'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Mainprofile = () => {
    const [problemData ,setproblemData]=useState()
    
    const {id}=useParams()
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${id}`);
    
            if (response.ok ) {

              const data = await response.json();
             
              setproblemData(data);
            } else {
              console.error("Error fetching data:", response.statusText);
            }
          } catch (error) {
            console.error("Error:", error);
          }
        };
        fetchData();
      }, []);
      if (!problemData) {
        return (
          <>
            <div className="min-h-screen flex flex-col bg-[#1a1a1a]">
              <nav className="flex items-center justify-between bg-[#282828] px-4 py-3 text-white shadow-md">
                {/* Left Section */}
                <div className="flex items-center space-x-2">
                  <div className="hidden h-6 px-6 dark:flex">
                    <img
                      src="https://leetcode.com/_next/static/images/logo-dark-c96c407d175e36c81e236fcfdd682a0b.png"
                      alt="LeetCode Logo"
                    />
                  </div>
                  <div className="flex gap-6 ">
                    <h1 className="text-lg text-[#fff9]">Explore</h1>
                    <Link to={"/problems"}><h1 className="cursor-pointer text-lg text-[#fff9]">Problems</h1></Link>
                    <h1 className="text-lg text-[#fff9]">Contest</h1>
                    <h1 className="text-lg text-[#fff9]">Discuss</h1>
                    <h1 className="text-lg text-[#fff9]">Interview</h1>
                    <h1 className="text-lg text-yellow-500">Store</h1>
                  </div>
                </div>
    
                <div className="flex items-center space-x-4">
                  <button className="text-gray-400 hover:text-white">
                    <i className="fas fa-bell"></i>
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    <i className="fas fa-cog"></i>
                  </button>
                  <div className="w-8 h-8 bg-gray-600 rounded-lg-full overflow-hidden">
                    <img
                      src="https://assets.leetcode.com/users/avatars/avatar_1641729009.png"
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-yellow-500 bg-yellow-900  px-2 py-1 rounded-lg-md text-sm font-bold">
                    Premium
                  </div>
                </div>
              </nav>
              <div className="flex flex-row py-6 px-12 gap-4 min-h-[90vh]">
                {/* Sidebar Skeleton */}
                <div className="bg-[#282828] rounded-lg min-w-[23vw] min-h-[90vh] animate-pulse">
                  <div className="flex flex-col p-4 space-y-4">
                    {/* Profile Image Skeleton */}
                    <div className="flex space-x-4">
                      <div className="h-20 w-20 bg-gray-700 rounded-lg"></div>
                      <div className="flex flex-col space-y-2">
                        <div className="h-4 w-32 bg-gray-700 rounded"></div>
                        <div className="h-3 w-24 bg-gray-700 rounded"></div>
                        <div className="h-4 w-16 bg-gray-700 rounded"></div>
                      </div>
                    </div>
    
                    {/* Interest Skeleton */}
                    <div className="space-y-4">
                      <div className="h-3 w-full bg-gray-700 rounded"></div>
                      <div className="h-3 w-4/5 bg-gray-700 rounded"></div>
                      <div className="h-3 w-2/3 bg-gray-700 rounded"></div>
                    </div>
    
                    {/* Edit Profile Button Skeleton */}
                    <div className="h-8 w-full bg-gray-700 rounded"></div>
                  </div>
                </div>
    
                {/* Main Content Skeleton */}
                <div className=" rounded-lg  min-w-[69vw] min-h-[90vh] gap-1 flex flex-col">
                  <div className="  flex flex-row justify-between px-2 gap-1 ">
                    <div className="bg-[#282828] rounded-lg min-w-[33vw] min-h-[190px] animate-pulse"></div>
                    <div className="bg-[#282828] rounded-lg min-w-[33vw] min-h-[190px] animate-pulse"></div>
                  </div>
                  <div className="px-2 py-4">
                    <div className="bg-[#282828] rounded-lg-lg min-h-[190px] animate-pulse"></div>
                  </div>
                  <div className="px-2">
                    <div className="bg-[#282828] rounded-lg min-h-[190px] animate-pulse">


            

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }
  return (
    <Profile data={problemData}/>
  )
}

export default Mainprofile