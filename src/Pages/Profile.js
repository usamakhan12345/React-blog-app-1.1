import React, { useEffect, useState, useRef } from "react";
import image from "../Images/person-circle.svg";
import "./Pages.css";
import Input from "antd/es/input/Input";
import Button from "../Components/Button/Button";
import { useContext } from "react";
import userId from "../Config/Context";
import Header from "../Components/Header/Header";
import {
  db,
  doc,
  updateDoc,
  onSnapshot,
  updatePassword,
  getDocs,
  where,
  collection,
  query,
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  storage,
} from "../Config/Firebase";
import camera from "../Images/camera-fill.svg";
import Swal from "sweetalert2";

const Profile = () => {
  const fileInputRef = useRef(null);
  const [newpass, setNewPass] = useState("");
  const [newName, setNewName] = useState("");
  const [getData, setGetData] = useState("");
  const [uplimgUrl, setuplimgUrl] = useState("");
  const [imgUrl, setimgUrl] = useState("");
  const [file, setFile] = useState({});
  const { userid } = useContext(userId);

  useEffect(() => {
    console.log(userid)
    console.log(getData);
    const fetchData = async () => {
      const unsub = onSnapshot(doc(db, "blogusers", userid), (doc) => {
        console.log("Current data: ", doc.data());
        setGetData(doc.data());
        console.log(doc.data());
      });
      // console.log(getData)
      //     const q = query(collection(db, "blogsdata"), where("userid", "==", userid));

      // const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      // });
    };
    fetchData();
  }, []);

  const uploaduserImg = () => {
    fileInputRef.current.click();
  };
  console.log("getData--->", getData);
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const imageURL = URL.createObjectURL(selectedFile);
    // console.log("imageURL----->",imageURL)
    setuplimgUrl(imageURL);
    console.log("Selected file:", selectedFile);
  };

  // console.log(uplimgUrl)
  console.log("fiel...........>",file)
  const UploadImage = (userfile) => {
    console.log("ulploadfole---------->", userfile);
    return new Promise((resolve, reject) => {

      const storageRef = ref(storage, `images/${userfile.name}.jpg`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
            setimgUrl(downloadURL)
          });
        }
      );
    });
  };
  console.log("fiel...........>",file)
 
  const UpdateUserProfile = async () => {
    console.log(userid);
    updatePassword(userid, newpass)
      .then(() => {
        console.log("pass update hogya");
      })
      .catch((error) => {
        console.log(error);
      });
    const updateData = {};
    if (newName) {
      updateData.firstName = newName;
    }
    if (newpass) {
      updateData.password = newpass;
    }
    // if(uplimgUrl){
    //   updateData.image = uplimgUrl
    //  }
  console.log("fiel...........>",file)

    console.log(file)
    if (file) {
      let res = await UploadImage(file);
      setimgUrl(res);
      updateData.image = res;
      
      console.log("image after upload url  ",res);
      console.log(imgUrl)
      if (imgUrl) {
        updateData.image = imgUrl;
      }

      console.log("updateData------>", updateData);
      console.log(userid);
      const washingtonRef = doc(db, "blogusers", userid);
  
      try {
        await updateDoc(washingtonRef, {
          ...updateData
        });
        Swal.fire({
          icon: "success",
          title: "Profile",
          text: "Profile Updated  successfuly ",
        });
        setNewName("")
        setNewPass("")
      } catch (error) {
        console.log(error);
      }

      // const blogsDataRef = collection(db, "blogsdata");
      // const q = query(blogsDataRef, where("userid", "==", userid));
  
      // try {
      //   await updateDoc(q, {
      //     ...updateData
      //   });
      //   Swal.fire({
      //     icon: "success",
      //     title: "Profile",
      //     text: "Profile Updated  successfuly ",
      //   });
      // } catch (error) {
      //   console.log(error);
      // }
    }
    console.log("imgUrl--->", imgUrl);
    console.log("getData--->",getData)
  }
    return (
      <>
        <Header dashboard = "Dashboard" username={getData.firstName}/>
        <h1 className="text-center text-primary">Profile</h1>
        <div className="profileName">
          <h1 className="text-start text-primary fw-bold border-bottom ">
            {getData.firstName}
          </h1>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col text-center">
              {/* {console.log(uplimgUrl)} */}
              <img
                id="profilepic"
                src={
                  uplimgUrl ? uplimgUrl :( getData.image ? getData.image : image)
                }
                alt=""
              />
              <div>
                <img onClick={uploaduserImg} src={camera} alt="" />
                <input
                  type="file"
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
                <Input
                  type="text"
                  placeholder="old password"
                  value={getData.password}
                />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-4 text-center mt-4">
              <label htmlFor="Old Password">Email</label>
              <Input
                type="email"
                disabled={true}
                placeholder="email"
                value={getData.email}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-4 text-center mt-4">
              <label htmlFor="Old Password">New Password</label>
              <Input
                value={newpass}
                onChange={(e) => setNewPass(e.target.value)}
                type="password"
                placeholder="New Password"
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-4 lh-base text-center mt-4">
              <label htmlFor="Old Password">Update Name</label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                type="text"
                placeholder="Repeat New Password"
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-4 lh-base text-center mt-4">
              <Button
                onclick={UpdateUserProfile}
                value="Update Profile"
                btnstyle="bg-primary text-light"
              />
            </div>
          </div>
        </div>
      </>
    );
  
};
export default Profile;
