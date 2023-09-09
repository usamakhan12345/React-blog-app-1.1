import React, { useEffect } from 'react'
import { useContext } from 'react'
import userId from '../Config/Context'
import {getDocs,collection ,query, db} from "../Config/Firebase"
import image from "../Images/person-circle.svg"
import { useState } from 'react'
import Button from "../Components/Button/Button"
import { orderBy } from 'firebase/firestore'
import "./Pages.css"
import Header from "../Components/Header/Header"

const AllBlogs = () => {
    const [alluserblogs,setalluserblogs] = useState([])
     const currUserId = useContext(userId)
    console.log(currUserId)
    useEffect(()=>{
        const getallblogs =async ()=>{

            const querySnapshot = await (getDocs(collection(db, "blogsdata")))
            let  allblogs = []
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        //   allBlogsData(...)
            allblogs.push(doc.data())
        });
        console.log(allblogs)
            setalluserblogs(allblogs)

        }
        console.log("alluserblogs---->",alluserblogs)
        getallblogs();


    },[])
  return (
   <>
     <>
     <Header status= "Login"/>
     <h1 className='text-primary fw-bold text-center mt-3'>All Blogs</h1>

    <div className="container"></div>
        <div className="row">
            <div className="col">
            {alluserblogs.map((v,i)=>(
                <>
                {console.log("value--->",v)}
            <div key={i} className="container blogContainer mt-5 py-3 rounded-4 mainBlogDiv">
            <div className="row">
              <div className="col">
                <div className="d-flex mt-3">
                  <img id="profilepic" src={ v.image ?  v.image : image} alt="profile image" />
                  <div>
                    <h1 className="mt-3 text-danger fw-bold text-uppercase name">{v.firstName}</h1>
                    <h3 className="mt-3 text-dark">Title: {v.title}</h3>

                    <h5 className="mx-2 fs-5">{v.date}</h5>
                    <h5 className="mx-2 fs-5">{v.time}</h5>
                  </div>
                </div>
                <div className=" text-dark py-3 fs-4">{v.blog}</div>
                {/* <Button className="deleteBtn" value={"delete"} btnstyle="bg-danger text-light justify-content-center "/> */}
              </div>
            </div>
          </div>

                </>
            ))} 
            </div>
        </div>
    </> 
   </>
    )
}

export default AllBlogs