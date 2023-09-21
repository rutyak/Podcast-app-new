import React from 'react'
import "./Podcastcard.css"
import { Link } from 'react-router-dom'

const Podcastcard = ({title, displayImage, id}) => {
  return (
    <Link to={`/podcast/${id}`}>
    <div className='podcast-cards' >
      <img src={displayImage} alt='img' />
      <p>{title}</p>
    </div>
    </Link>
  )
}

export default Podcastcard
