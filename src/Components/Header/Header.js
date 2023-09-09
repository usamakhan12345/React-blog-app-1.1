import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Header.css"
import  userId from "../../Config/Context"
import { useContext } from 'react'
import {signOut, auth} from "../../Config/Firebase"
import { useNavigate } from 'react-router-dom'


const Header = ({username , status , dashboard , userlogout}) => {
  const navigate = useNavigate()
  const id = useContext(userId)



  return (
        <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary text-light">
  <div className="container-fluid d-flex bg-primary text-light py-2  justify-content-between align-items-center">
    <NavLink to={"/dashboardlogin"}  className="navbar-brand fw-bold text-light mx-5">{dashboard ? dashboard : "Blog App"}</NavLink>
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
            <NavLink className="nav-link text-light mx-5 text-center" to={"/allblogs"}>{"All Blogs"}</NavLink>
        </li>
        <li className="nav-item text-center float-right">
            <NavLink className="nav-link text-light mx-5 text-center" to={"/profile"}>{username ? username : "usama"} </NavLink>
        </li>
        {/* <li className="nav-item">
          <a  className="nav-link mx-5 text-light" href="#">
          {status}
          </a>
        </li> */}
        <li className="nav-item text-center float-right">
            <NavLink onClick = {userlogout} className="nav-link text-light mx-5 text-center" to={"/login"}>{status} </NavLink>
        </li>
       
      
      </ul>
    </div>
  </div>
</nav>
        </>
  )
}

export default Header