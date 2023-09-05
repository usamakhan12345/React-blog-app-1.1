import React, { useState, useEffect, useContext } from "react";
import Header from "antd/es/layout/layout";
import Button from "../Components/Button/Button";
import image from "../Images/person-circle.svg";
import "./Pages.css";
import userId from "../Config/Context";
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
  getDoc,
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

  useEffect(() => {
    const Getdata = async () => {
      const docRef = doc(db, "blogusers", userid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setSignUpData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    Getdata();
  }, []);

  console.log("signupdata---->", signUpdata.image);
  const publishBlogs = async () => {
    try {
      const docRef = await addDoc(collection(db, "blogsdata"), {
        ...blogData,
        firstName: signUpdata.firstName,
        image : signUpdata.image ? signUpdata.imag : image
      });

      console.log("blogs data are saved");
      setCurrId(currid);
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
      }
    });
    //get real time data
  }, []);
  useEffect(() => {
    try {
      console.log(currid);
      const q = query(
        collection(db, "blogsdata"),
        where("userid", "==", currid)
      );
      const userData = [];
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
          console.log(userData)
          setgetUserData(userData);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [currid]);
  const currentDate = new Date();
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTime = currentDate.toLocaleTimeString("en-US", options);
  const dateoptions = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", dateoptions);

  const blogData = {
    title,
    blog,
    userid: currid,
    date: formattedDate,
    time: formattedTime,
    
  };
  console.log("blogData---->", blogData);
  console.log("getUserData--->",getUserData)
  return (
    <>
      <Header />
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
      {getUserData.map((v, i) => (
        <>
          {console.log("imageeeeeeee",v.image)}
          <div key={i} className="container blogContainer mt-5">
            <div className="row">
              <div className="col">
                <div className="d-flex">
                  <img id="profilepic" src={v.image ? v.image : image} alt="" />
                  <div>
                    <h1 className="mt-3">{v.title}</h1>
                    <h5 className="mx-2">{v.date}</h5>
                    <h5 className="mx-2">{v.time}</h5>
                  </div>
                </div>
                <div className="mt-4">{v.blog}</div>
                <Button className="deleteBtn" value={"delete"} btnstyle="bg-danger text-light "/>
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default Dashboardlogin;
