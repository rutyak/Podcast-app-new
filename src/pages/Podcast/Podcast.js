import React, { useEffect, useState } from 'react'
import Innernav from '../../components/Navbar/Innernav'
import "./Podcast.css"
import { useDispatch, useSelector } from 'react-redux'
import { setPodcasts } from '../../slice/podcastsSlice'
import { db } from "../../firebase"
import { collection, onSnapshot, query } from 'firebase/firestore'
import Podcastcard from '../../components/Podcastcard'
// import Podcastcards from '../components/Podcastcards'

const Podcast = () => {

  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [search, setSearch] = useState("");
  console.log(podcasts);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "podcasts")), 
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data()})
          // console.log(doc.id, " => ", doc.data());
        });
        dispatch(setPodcasts(podcastsData));
    },
    (error)=>{
      console.log("error", error);
    }
    );

    return () =>{
      unsub();
    }
  },[dispatch])



  const filtered = podcasts.filter((item) =>
    item.title.toLowerCase().trim().includes(search.trim().toLowerCase())
   );

  console.log("Filtered : ",filtered);

  return (
    <div>
      <Innernav />
      <div className='podcast-style'>
      <h1>Podcasts</h1>
      <input 
      type='text'
      onChange={(e)=>setSearch(e.target.value)}
      placeholder='Search for podcasts'
      >
      </input>
      {filtered.length > 0 ? (
       <div className='cards'>
       {filtered.map((item)=>{
            return (
            <>
            <Podcastcard 
            key={item.id}
            title={item.title}
            displayImage={item.displayImage} 
            id={item.id}/>
            </>
            )
       })
      }
      </div>
      ):
      ( 
      <p style={{textAlign: 'center'}}>Not Found</p>
      )
    }
      </div>
    </div>
  )
}

export default Podcast
