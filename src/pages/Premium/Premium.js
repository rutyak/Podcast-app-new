import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import image from '../../components/Images/crown_707163.png'
import image2 from '../../components/Images/girl_header.png'
import "./Premium.css"
import { useNavigate } from 'react-router-dom'

const Premium = () => {

  const navigate = useNavigate();

  return (
    <div>
        <Navbar />
        <div className='premium-main'>
        <div  className='banner-premium'>
            <div>
                <img src={image} style={{width: "55px"}}/>
                <h1 style={{ color: 'darkgoldenrod'}}>Go Premium.</h1>
                <h1 style={{ color: 'darkgoldenrod'}}>Go Unlimited.</h1><hr/>
                <button onClick={()=>navigate('/payment')} className='buy-btn'>Buy Premium</button>
            </div>
            <div>
                <img src={image2}/>
            </div>
        </div>
        <div className='buttons' style={{ color: 'darkgoldenrod'}}>
            <button onClick={()=>navigate('/accesspremium')}>Access your premium podcasts</button>
            <button onClick={()=>navigate('/downloaded')}>Downloads</button>
        </div>
        </div>
    </div>
  )
}

export default Premium
