import React, { useState, useEffect, useContext } from "react";
import Button from "../Components/Button/Button";
import image from "../Images/person-circle.svg";
import "./Pages.css";
import userId from "../Config/Context";
import Swal from "sweetalert2";
import Header from "../Components/Header/Header";

import {
  doc,
  setDoc,
  db,
  onAuthStateChanged,
  auth,
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  query,
  where,
  onSnapshot,
  getDoc,getDocs , signOut,getAuth
} from "../Config/Firebase";
import { useNavigate } from "react-router-dom";

const Dashboardlogin = () => {
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const [currid, setCurrId] = useState("");
  const [signUpdata, setSignUpData] = useState("");
  const [getUserData, setgetUserData] = useState([]);
  const navigate = useNavigate();
  const { userid } = useContext(userId);
  // console.log("userid----->",userid)

  const currentDate = new Date();
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTime = currentDate.toLocaleTimeString("en-US", options);
  const dateoptions = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", dateoptions);
  // console.log("currid------>",currid)
  const blogData = {
    title,
    blog,
    userid: currid,
    date: formattedDate,
    time: formattedTime,
    image : signUpdata.image
    
  };
  // console.log("blogData---->", blogData);
  // console.log("getUserData--->",getUserData)

  useEffect(() => {

    const Getdata = async () => {
      try{

        const docRef = doc(db, "blogusers", userid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setSignUpData(docSnap.data());
        
      } else {
        console.log("No such document!");
      }
    }
    catch(err){
      console.log(err)
    }
    };
    Getdata();
  }, []);

  // console.log("signupdata--image-->", signUpdata.image);

  
  const userLogOut = ()=>{
    alert("Hekllo")
    console.log("user log out ")
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("user sign out from firebase")
      navigate("/login")
    }).catch((error) => {
        console.log(error)
    });
  }
  // console.log("blogData---->",blogData)
   //blogs data saved
   const userimg = signUpdata.image  ? signUpdata.image  : image
  const publishBlogs = async () => {
    try {
      const docRef = await addDoc(collection(db, "blogsdata"), {
        ...blogData,
        firstName: signUpdata.firstName,
        image : userimg
      });
      // console.log("Document written with ID: ", docRef.id);
      // console.log("blogs data are saved");
      setBlog("")
      setTitle("")
      setCurrId(currid);
      Swal.fire({
        icon: "success",
        title: "Blog",
        text: "Blog Post successfuly ",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setCurrId(uid);

        navigate("/dashboardlogin");
      } else {
        console.log("user not found");
        navigate("/")

      }
    });
  }, []);
    //get real time data
  // console.log(currid)
  useEffect(() => {
    try {
      // console.log(currid);
      const q = query(
        collection(db, "blogsdata"),
        where("userid", "==", currid)
      );
      const userData = [];
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
          // console.log(userData)
          setgetUserData(userData);
        });
      });
    } catch (error) {
      console.log(error);
    }
  });

    // console.log("signUpdata----->", signUpdata)
    // console.log("signUpdata imageeee----->", signUpdata.image)
    const firstName = signUpdata.firstName
    // console.log("firstName------>",firstName)
  return (
    <>
      <Header userlogout = {userLogOut} username = {signUpdata.firstName ? signUpdata.firstName : "Profile"} dashboard = "Dashboard" status = "Logout"/>
      <div className="container container-fluid mt-3 ">
        <div className="row justify-content-center ">
          <div className=" row text-center">
            <textarea
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              name=""
              id=""
              cols="120"
              rows="2"
              className="px-5 mt-3 py-3 col-xs-4 col-sm-12 col-md-12 col-lg-12"
              placeholder="title"
            ></textarea>
          </div>
          <div className="row text-center">
            <textarea
              onChange={(e) => setBlog(e.target.value)}
              value={blog}
              name=""
              id=""
              cols="120"
              rows="10"
              className="px-5 mt-3 py-3 col-xs-4 col-sm-12 col-md-12 col-lg-12"
              placeholder="blogs content"
            ></textarea>
          </div>
          <Button
            onclick={publishBlogs}
            btnstyle="justify-content-center container w-100 fs-4 mt-3 bg-primary text-light fw-bold "
            value={"Publish Blog"}
          />
        </div>
      </div>
      <div>
        <h1 className="text-center fw-bold  mt-2 text-success">My Blogs</h1>
      </div>
      {getUserData.map((v, i) => (
        <>
          {/* {console.log("value", v ,"indexxx",i)} */}
          <div key={i} className="container blogContainer mt-5 rounded-3 mainBlogDiv">
            <div className="row">
              <div className="col">
                <div className="d-flex mt-3">
                  <img id="profilepic" src={ signUpdata.image ?  signUpdata.image : image} alt="profile image" />
                  <div>
                    <h1 className="mt-3 text-primary fw-bold text-uppercase name">{signUpdata.firstName}</h1>
                    <h3 className="mt-3 text-dark">Title: {v.title}</h3>

                    <h5 className="mx-2 fs-5 text-success">{v.date}</h5>
                    <h5 className="mx-2 fs-5 text-success">{v.time}</h5>
                  </div>
                </div>
                <div className=" text-dark py-3 fs-4">{v.blog}</div>
                <Button className="deleteBtn py-3" value={"delete"} btnstyle="bg-danger text-light "/>
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default Dashboardlogin;
