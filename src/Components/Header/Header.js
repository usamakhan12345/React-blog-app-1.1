import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Header.css"
import  userId from "../../Config/Context"
import { useContext } from 'react'
import {signOut, auth} from "../../Config/Firebase"
import { useNavigate } from 'react-router-dom'


const Header = ({user}) => {
  const navigate = useNavigate()
  const id = useContext(userId)


  const userLogOut = ()=>{
    console.log("user log out ")
    console.log(id)

    signOut(auth).then(() => {
      console.log("user sign out from firebase")
      navigate("/login")
    }).catch((error) => {
        console.log(Error)
    });
  }

  return (
        <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary text-light">
  <div className="container-fluid d-flex bg-primary text-light py-2  justify-content-between align-items-center">
    <NavLink to={"/"}  className="navbar-brand fw-bold text-light mx-5">Blogs App</NavLink>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon text-light" />
    </button>
    <div className="collapse navbar-collapse text-light" id="navbarNav">
      <ul className="navbar-nav nav-list">
        <li className="nav-item text-center float-right">
            <NavLink className="nav-link text-light mx-5 text-center" to={"/profile"}>Usama</NavLink>
        </li>
        <li className="nav-item">
          <a onClick={userLogOut}  className="nav-link mx-5 text-light" href="#">
            LogOut
          </a>
        </li>
       
      
      </ul>
    </div>
  </div>
</nav>
        </>
  )
}

export default Header