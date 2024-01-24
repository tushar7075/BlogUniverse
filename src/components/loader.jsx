import React from 'react'
import LoadingGif from '../pictures/Loader.gif'
const loader = () => {
  return (
    <div className="loader">
    <img className="loader_image" src={LoadingGif} alt="" />   
    </div>
  )
}

export default loader