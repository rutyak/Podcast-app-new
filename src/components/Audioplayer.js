import React, { useEffect, useRef, useState } from 'react'
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import "./Audioplayer.css"

const Audioplayer = ({audioSrc, image}) => {

  const audioRef = useRef();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(true);


  useEffect(()=>{
    if(isPlaying){
      audioRef.current.play();
    }
    else{
      audioRef.current.pause();
    }
  },[isPlaying])

  useEffect(()=>{
    if(isMute){
      audioRef.current.volume = 1;
    }
    else{
      audioRef.current.volume = 0;
    }
  },[isMute])

  useEffect(()=>{
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata",handleMetaData);
    audio.addEventListener("ended", handleEnd);

    return () =>{
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata",handleMetaData);
      audio.removeEventListener("ended", handleEnd);
    }
  },[])
  
  function handleTimeUpdate(){
    setCurrentTime(audioRef.current.currentTime);
  }

  function handleMetaData(){
    setDuration(audioRef.current.duration)
  }

  function handleEnd(){
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

  function toggleAudio(){
    if(isPlaying){
      setIsPlaying(false);
    }
    else{
      setIsPlaying(true);
    }
  }

  function toggleVolume(){
    if(isMute){
      setIsMute(false);
    }
    else{
      setIsMute(true);
    }
  }

  function formatTime(time){
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0": ""}${seconds}`;
  }
  return (
    <div className='audio-player'>
      <img  src={image} alt='img' />
      <audio ref={audioRef} src={audioSrc}/>
      <p onClick={toggleAudio}>{ isPlaying ? <FaPause />: <FaPlay />}</p>
      <div className='duration-audio'>
        <p>{formatTime(currentTime)}</p>
        <input 
        type='range' 
        max={duration}
        value={currentTime}
        step={0.01}
        onChange={handleDuration} />
        <p>{formatTime(duration - currentTime)}</p>
      </div>
      <div className='volume-player'>
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
