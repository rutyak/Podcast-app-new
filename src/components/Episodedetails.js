import "./Episodedetails.css"
import React from 'react'

function Episodedetails({index, title, audioFile, description, onClick}) {   // for podcast details page
  return (
    <div>
      <h2>{index}{"  "}{title}</h2>  
      <p>{description}</p>
      <button onClick={()=>onClick(audioFile) } className='play-btn'>Play</button>
    </div>
  )
}

export default Episodedetails
