import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import menu from '../Images/menu (1).png'

const Innernav = () => {
  
  const [isMenuCalled, setIsMenuCalled] = useState(false);

  function toggleInnernav(){
    console.log("Clicked happend")
    setIsMenuCalled(!isMenuCalled);
  }

  return (
    <div className='main-innernav'>
    <img id='menu' src={menu} alt='img' onClick={toggleInnernav} style={{width: "2rem"}}/>
    <div className={`innernav ${ isMenuCalled? 'open': ''}`}>
        <Link to="/">Home</Link>
        <Link to="/podcast">Podcast</Link>
        <Link to="/createpodcast">Start a podcast</Link>
        <Link to="/profile">Profile</Link>
    </div>
    
    </div>
  )
}

export default Innernav
