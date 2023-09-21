import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import homeImg from '../../components/Images/banner.png'
import "./Home.css"
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  function handlePremium(){

    navigate("/premium")
  }
  return (
    <div>
      <Navbar />
      <div className='banner'>
           <img src={homeImg} alt='img' />
           <div className='premium'>
                <h1>Listen Premium podcasts</h1>
                <p>Listen newly published podcasts. Buy our premium package with less amount and enjoy podcasts for a year
                </p>
                <button onClick={handlePremium}>Premium</button>
           </div>
           
      </div>
    </div>
  )
}

export default Home
