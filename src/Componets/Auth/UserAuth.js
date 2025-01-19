import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function UserAuth(state,{childern}){
  const data=useSelector(store=>store.user)
  const navigate=useNavigate()
  console.log(data,"this calling");
  if(data.state!==true){
    console.log("this navigating");
    navigate("/no")
   
  }
  return (
    <div>{data.data}</div>
  )
}

export default UserAuth