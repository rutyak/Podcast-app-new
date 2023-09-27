import React, { useEffect, useRef, useState } from 'react'
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import "./Audioplayer.css"

const Audioplayer = ({audioSrc, image}) => {    // from podcastsDetails

  const audioRef = useRef();  // use to retain audio
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(true);


  useEffect(()=>{
    if(isPlaying){
      audioRef.current.play();   // audio play
    }
    else{
      audioRef.current.pause();   // audio pause
    }
  },[isPlaying])  // when play then execute

  useEffect(()=>{
    if(isMute){
      audioRef.current.volume = 1;  // unmute
    }
    else{
      audioRef.current.volume = 0;  // mute
    }
  },[isMute]) 

  useEffect(()=>{
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);     // time update of audio
    audio.addEventListener("loadedmetadata",handleMetaData);    
    audio.addEventListener("ended", handleEnd);                  

    return () =>{
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata",handleMetaData);
      audio.removeEventListener("ended", handleEnd);
    }
  },[])
  
  function handleTimeUpdate(){
    setCurrentTime(audioRef.current.currentTime);   // time vary 
  }

  function handleMetaData(){
    setDuration(audioRef.current.duration) //  setting duration of audio
  }

  function handleEnd(){      // when end reset all
    setCurrentTime(0);
    setIsPlaying(false);
  }

  function handleDuration(e){    
     setCurrentTime(parseFloat(e.target.value))
     audioRef.current.currentTime = parseFloat(e.target.value);
  }

  function handleVolume(e){
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value
  }

  function toggleAudio(){   // toggle audio
    if(isPlaying){
      setIsPlaying(false);
    }
    else{
      setIsPlaying(true);
    }
  }

  function toggleVolume(){   // toggle volume
    if(isMute){
      setIsMute(false);
    }
    else{
      setIsMute(true);
    }
  }

  function formatTime(time){      // time format  // come from duration
      const minutes = Math.floor(time / 60);   
      const seconds = Math.floor(time % 60);   
      return `${minutes}:${seconds < 10 ? "0": ""}${seconds}`;   // if second lesser than 0 then add 01 02 like that. else add seconds 10 12 13
  }
  return (
    <div className='audio-player'>
      <img  src={image} alt='img' />

      {/* // adding audio */}
      <audio ref={audioRef} src={audioSrc}/>  
      
      {/* play pause toggle */}
      <p onClick={toggleAudio}>{ isPlaying ? <FaPause />: <FaPlay />}</p>   
      <div className='duration-audio'>
        {/* correct time  */}
        <p>{formatTime(currentTime)}</p>   
        <input 
        type='range' 
        max={duration}
        value={currentTime}
        step={0.01}
        onChange={handleDuration} />
        {/* time vary */}
        <p>{formatTime(duration - currentTime)}</p>
      </div>
      <div className='volume-player'>

      {/* mute unmute */}
      <p onClick={toggleVolume}>{ isMute ? <FaVolumeUp />: <FaVolumeMute />}</p>   
      <input
       type='range' 
       value={volume}
       max={1}
       min={0}
       step={0.01}
      onChange={handleVolume} />
      </div>
    </div>
  )
}

export default Audioplayer
