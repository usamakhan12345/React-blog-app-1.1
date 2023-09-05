import React from "react";
import MyInput from "../Components/MyInput";
import Button from "../Components/Button/Button";
import "./SignUp.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {signInWithEmailAndPassword,auth} from "../Config/Firebase"
import Swal from 'sweetalert2'
import {AiOutlineMail } from "react-icons/ai"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  // const initailemailpass = {
  //   email: "",
  //   password: "",
  // };
  const initialFormData = {
  
    email: "",
    password: "",
  };
  // const[emailpass , setemailpass] =useState(initailemailpass)
  const [formData, setFormData] = useState(initialFormData);



  const userLogin = ()=>{
    console.log("func is running")
    console.log(formData.email)
    
    
    signInWithEmailAndPassword(auth, formData.email, formData.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    console.log("user sign in")
    Swal.fire({
      icon: 'success',
      title: 'Sign Up',
      text:   "User successfuly sign in",
    })
  console.log("data saved")
    setTimeout(() => {
      navigate("/dashboardlogin")
    }, (500));

  })
  .catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text:   errorMessage,
    })
  });



  }
  return (
    <>
      <div className="container container-fluid mt-3 justify-content-center  ">
        <div className="row justify-content-center ">
          <div className="col-xs-4 col-md-6 col-lg-6 loginContain1 border border-1 border-primary login-main  ">
            <div className="fw-bold fs-3 text-light bg-primary text-center w-100 col-12 signup rounded-4 login-main">
              Blog App
            </div>

            <div className="mb-3 mt-4">
              <label htmlFor="exampleInputEmail1" className="form-label fs-4">
                Email
              </label>
              <span> <AiOutlineMail/> </span>  <span><MyInput
                type="email"
                feildName="email"
                // formData={formData}
                // setFormData={setFormData}
                // emailpass = {emailpass}
                // setemailpass = {setemailpass}
                formData={formData}
                setFormData={setFormData}
                />
</span>
            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputPassword1" className="form-label fs-4">
                Password
              </label>
              <MyInput
                type="password"
                feildName="password"
                // formData={formData}
                // setFormData={setFormData}
                // emailpass = {emailpass}
                // setemailpass = {setemailpass}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            <Button
              value={"Login"}
              btnstyle={
                "bg-primary fw-bold text-light col-12 mt-1 mb-1 border border-primary-2 fs-4 rounded-4"
              }
              onclick={userLogin}
            />
            <div>
            <h5 className="text-center mt-2 text-dark ">
            <NavLink to={"/forgetpass"}>Forget Password ?</NavLink>

                  <br />
                Don't have an account ?
                <NavLink to={"/"}>SignUp</NavLink>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
