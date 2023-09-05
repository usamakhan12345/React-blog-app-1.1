import React, { useEffect, useState } from "react";
import "./SignUp.css";
import MyInput from "../Components/MyInput";
import Button from "../Components/Button/Button";
import { NavLink } from "react-router-dom";
import {auth, createUserWithEmailAndPassword , onAuthStateChanged , db , doc, setDoc} from "../Config/Firebase" 
import {useNavigate} from "react-router-dom"
import Swal from 'sweetalert2'




const SignUp = () => {
  const navigate = useNavigate()
  const [isuserid , setIsUserId] = useState("")

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
       const uid = user.uid;
        // console.log(uid)
        setIsUserId(uid)
        navigate("/dashboardlogin")
      } else {
          console.log("user not found")        
      }
    });
  } )

  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
 
  const [formData, setFormData] = useState(initialFormData);


  const userLogin = ()=>{
    console.log(isuserid)
  createUserWithEmailAndPassword(auth, formData.email, formData.password)
  .then(async(userCredential) => {
    const user = userCredential.user;

    if(user.uid){
      try{

        await setDoc(doc(db, "blogusers", user.uid), {
          ...formData , userid : user.uid
        } ) ;
       
        Swal.fire({
          icon: 'success',
          title: 'Sign Up',
          text:   "User successfuly sign up",
        })
      console.log("data saved")
        setTimeout(() => {
          navigate("/login")
        }, (1000));

        }
      
      catch(error){
          console.log(error)
        }
  
  }

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
      console.log(errorMessage)
      console.log(errorCode)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:   errorMessage,
      })

      navigate("/")
    });
    console.log(formData)
  }
  return (
    <>
      <div className="container-fluid mt-3 main justify-content-center  ">
        <div className="row justify-content-center ">
          <div className=" col-sm-4 col-md-8 col-lg-3 loginContain border border-1 border-primary ">
            <div className="fw-bold fs-3 text-light bg-primary text-center w-100% col-12 rounded-4 signup ">
             Blog App
            </div>
            <div className="mb-1 mt-2">
              <label htmlFor="exampleInputPassword1" className="form-label">
                First Name
              </label>
              <MyInput
                type="text"
                feildName="firstName"
                formData={formData}
                setFormData={setFormData}
               
              />
            </div>
            <div className="mb-1">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Last Name
              </label>
              <MyInput
                type="text"
                feildName="lastName"
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            <div className="mb-1 mt-1">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <MyInput
                type="email"
                feildName="email"
                formData={formData}
                setFormData={setFormData}
                // emailpass = {emailpass}
                // setemailpass = {setemailpass}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <MyInput
                type="password"
                feildName="password"
                formData={formData}
                setFormData={setFormData}
                // emailpass = {emailpass}
                // setemailpass = {setemailpass}
              />
            </div>
            <Button
              value="SignUp"
              btnstyle={
                "bg-primary text-light fs-4 rounded-4 col-12 mt-1 mb-1 border border-primary-2 fw-bold"
              }
              onclick = {userLogin}
            />
            <div>
              <p className="text-dark">
                Already have an account ?{" "}
                <bold className="fs-4">
                  <NavLink to={"/login"}>Login</NavLink>
                </bold>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
