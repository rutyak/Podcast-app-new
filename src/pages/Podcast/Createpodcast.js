import React, { useState } from "react";
import Innernav from "../../components/Navbar/Innernav";
import FileInput from "../../components/FileInput";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Createpodcast.css"

const Contact = () => {

  const navigator = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImg, setDisplayImg] = useState(null);
  const [bannerImg, setBannerImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    console.log(title);
    console.log(desc);
    console.log(displayImg);
    console.log(bannerImg);
    try {
      if (title && desc && displayImg && bannerImg && profileImg) {    
        //banner image
        const banner = ref(   
          storage,
          `podcast/${auth.currentUser.uid}/${Date.now()}`
        );          // storage needed for image objects. storage path creating here

        await uploadBytes(banner, bannerImg);     // uploading in storage
        const bannerImgUrl = await getDownloadURL(banner);

        //display image
        const display = ref(
          storage,
          `podcast/${auth.currentUser.uid}/${Date.now()}`
        );          // storage needed for image objects. storage path creating here
        await uploadBytes(display, displayImg);   // uploading in storage
        const displayImgUrl = await getDownloadURL(display);

        //profile image
        const profileRef = ref(
          storage,
          `podcast/${auth.currentUser.uid}/${Date.now()}`
        );          // storage needed for image objects. storage path creating here
        await uploadBytes(profileRef, profileImg);   // uploading in storage
        const profileUrl = await getDownloadURL(profileRef);   // downloadable link

        const podcastsData = {
          title: title,
          description: desc,
          bannerImage: bannerImgUrl,
          displayImage: displayImgUrl,
          profileImage: profileUrl,
          createdBy: auth.currentUser.uid,
        };

        const docRef = await addDoc(collection(db, "podcasts"), podcastsData);   // adding in database  not storing in redux because it will not a good approach

        console.log("docRef", docRef);
        setTitle("");    // reset all
        setDesc("");
        setBannerImg(null);
        setDisplayImg(null);
        setProfileImg(null);
        toast.success("Created successfully!!");
        navigator("/podcast")
        setLoading(false);
      }
    } catch (error) {
      console.log("Error",error)
      setLoading(false);
    }
  }

  return (
    <div>
      <Innernav />
      <div className="signup">
        <div>
          <h1>Create Podcast</h1>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Podcast title"
            required
          />
          <br></br>
          <textarea
            className="textarea"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            placeholder="Podcast description"
            required
            style={{
              height: "100px",
              marginBottom: "1rem",
              resize: "none",
              paddingLeft: "0.5rem",
              paddingTop:"0.5rem"
            }}
          ></textarea>

          <FileInput                     // input from fileInput
            accept="image/*"
            id="banner-image"
            text="Podcast image upload"
            fileFun={setDisplayImg}
          />

          <FileInput
            accept="image/*"
            id="small-banner-image"
            text="Banner image upload"
            fileFun={setBannerImg}
          />

          <FileInput
            className="textarea"
            accept="image/*"
            id="profile-image"
            text="profile image upload"
            fileFun={setProfileImg}
          />
          
       
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Loading..." : "Create Podcast"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
