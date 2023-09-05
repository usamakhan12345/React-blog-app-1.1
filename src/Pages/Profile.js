import React, { useEffect, useState ,useRef } from "react";
import image from "../Images/person-circle.svg";
import "./Pages.css";
import Input from "antd/es/input/Input";
import  Button  from "../Components/Button/Button";
import { useContext } from "react";
import userId from "../Config/Context";
import {db , doc  ,  updateDoc ,  onSnapshot ,updatePassword } from "../Config/Firebase"
import camera from "../Images/camera-fill.svg"
import Swal from 'sweetalert2'


const Profile = () => {
  const fileInputRef = useRef(null);
  const [newpass, setNewPass] = useState("");
  const [newName ,setNewName] = useState("");
  const [getData ,setGetData] = useState("");
  const[uplimgUrl,setuplimgUrl] = useState("")


  const {userid} = useContext(userId)
  
  console.log(userid)
  // console.log(userid)
  useEffect(()=>{
    const fetchData = async()=>{
      
      const unsub = onSnapshot(doc(db, "blogusers", userid), (doc) => {
        console.log("Current data: ", doc.data());
        setGetData(doc.data())
        console.log(doc.data())
    });
    console.log(getData)
    }
    fetchData();
   
  },[]);

  const UpdateUserProfile =async()=>{

      updatePassword(userid, newpass).then(() => {
  console.log("pass update hogya")
      }).catch((error) => {
  console.log(error)  
});


      const washingtonRef = doc(db, "blogusers", userid);

      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        password : newpass,
        firstName : newName,
        image : uplimgUrl,
      });
      Swal.fire({
        icon: 'success',
        title: 'Profile',
        text:   "Profile Updated  successfuly ",
      })
    }
    const uploaduserImg = ()=>{
      fileInputRef.current.click();
    }
    console.log(getData)
    const handleFileSelect = (e) => {
      const selectedFile = e.target.files[0];
      const imageURL = URL.createObjectURL(selectedFile);
      // console.log(imageURL)
      setuplimgUrl(imageURL)
      console.log("Selected file:", selectedFile);
    };
  return (
    <>
      <h1 className="text-center text-primary">Profile</h1>
      <div className="profileName" ><h1 className="text-start text-primary fw-bold border-bottom ">{getData.firstName}</h1></div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col text-center">
            {/* {console.log(uplimgUrl)} */}
            <img  id="profilepic" src={uplimgUrl ? uplimgUrl :getData.image ?getData.image : image } alt="" />
            <div>
              <img onClick={uploaduserImg} src={camera} alt="" />
              <input  type="file" 
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-4 text-center mt-4 ">
            <div>
              <label htmlFor="Old Password">Old Password</label>
              <Input type="text" placeholder="old password"
                value={getData.password} 
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-4 text-center mt-4">
            <label htmlFor="Old Password">Email</label>
            <Input type="email" disabled={true} placeholder="email"   value={getData.email} />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-4 text-center mt-4">
            <label htmlFor="Old Password">New Password</label>
            <Input value={newpass} onChange={(e)=> setNewPass(e.target.value)} type="password"  placeholder="New Password"/>

          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-4 lh-base text-center mt-4">
            <label htmlFor="Old Password">Update Name</label>
            <Input value={newName} onChange={(e)=> setNewName(e.target.value)}  type="text"  placeholder="Repeat New Password" 
               
            />


          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-4 lh-base text-center mt-4">
            <Button onclick={UpdateUserProfile} value="Update Profile" btnstyle = "bg-primary text-light"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
