import React from 'react'
import { useState } from 'react'
import {AiOutlineMail} from "react-icons/ai"

const MyInput = ({type,feildName ,formData ,setFormData }) => {

    const handleemail = (e)=>{
    const updateFormData = {...formData ,[feildName]: e.target.value}    
    // const setEmailpassVal = {...emailpass , [feildName]: e.target.value}
    // console.log(setEmailpassVal)
    // setemailpass(setEmailpassVal)
    setFormData(updateFormData)
    console.log(updateFormData)
    }
  return (
    
         <>
      <input
        type = {type}
        onChange={handleemail}
        value= {formData[feildName]}
        id = {feildName}
        className="form-control"
        aria-describedby="emailHelp"
        />
    </>
    
  )
}

export default MyInput