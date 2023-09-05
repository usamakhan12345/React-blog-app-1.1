import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import Profile from './Pages/Profile'
import Header from './Components/Header/Header'
import Approute from './Config/Route'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Dashboardlogin from './Pages/Dashboardlogin'
import userId from "./Config/Context";
import Forgetpass from './Pages/Forgetpass'
import {auth, onAuthStateChanged ,doc, getDoc , db } from "./Config/Firebase"
// import { useNavigate } from 'react-router-dom'


const App = () => {
  const [userid , setuserid] = useState("")
  const [ user , setUser ]  = useState({})
  // const navigate = useNavigate()

  return (
      <>
      <userId.Provider value={{userid,setuserid}}>
        {  useEffect(()=>{

          onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user)
       const uid = user.uid;
        setuserid(user)
        // navigate("/dashboardlogin")
      } else {
          console.log("user not found")        
      }
      //get user data 
      console.log(userid)
    
    });
  },[])
  
}
      <BrowserRouter>
      <Header/>
        <Routes>
            <Route path='/profile' element= {<Profile/>} />
            <Route path='/' element= {<SignUp/>} />
            <Route path='/login' element= {<Login/>} />
            <Route path='/dashboardlogin' element= {<Dashboardlogin/>} />
            <Route  path='/forgetpass' element={<Forgetpass/>}/>
     </Routes>
    </BrowserRouter>
      </userId.Provider>
      </>
  )
}

export default App