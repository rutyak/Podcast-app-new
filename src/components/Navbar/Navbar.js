import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import poadcastimg from "../Images/pngegg.png";
import dark from '../Images/moon.png'
import light from '../Images/sun.png'


const Navbar = () => {
  
  const [darkTheme, setDarkTheme] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const Images = [dark, light];

  function handleTheme(){
     console.log("Theme toggled");
     setDarkTheme(!darkTheme);
    
    

     if(!darkTheme){
       document.body.classList.add("dark-theme")
     }
     else{
      document.body.classList.remove("dark-theme")
     }

     setImageIndex((imageIndex + 1)% Images.length);
    
  }

  return (
    <div className='navbar'>
      <div className='icons'>
      <img id='main-icon' src= {poadcastimg} alt='img' />
      
      </div>
      
      <div className='links'>
        <Link to="/">Home</Link>
        <Link to="/podcast">Podcast</Link>
        <Link to="/createpodcast">Start a podcast</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/signup" className='right'>Login/SignUp</Link>       
        <p>Theme</p><img id='theme' src={Images[imageIndex]} onClick={handleTheme} alt='img'></img> 
      </div>
    </div>
  )
}

export default Navbar
