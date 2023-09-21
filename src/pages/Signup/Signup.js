import React, { useState } from 'react'
import Innernav from '../../components/Navbar/Innernav';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db} from "../../firebase"
import {
  createUserWithEmailAndPassword,
} from "firebase/auth"
import { doc, setDoc } from 'firebase/firestore';
import {useDispatch} from 'react-redux'
import { setUser } from '../../slice/userSlice';
import { toast } from 'react-toastify';



function Signup() {
  
  let dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);


  async function handlesignup(){
    console.log("Handling Signup..");
    setLoading(true);
    if(password === cpassword && password.length > 6){
      try{

        let userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        const user = userCredentials.user;
        console.log("user", user)
        toast.success("User successfully registed!!");
        // saving in database
        await setDoc(doc(db,"users",user.uid),{
          name : name,
          email: user.email,
          uid: user.uid,
        })

        //save data in redux store, call redux store
        dispatch(setUser({
            name : name,
            email: user.email,
            uid: user.uid,
          }))

        navigate("/podcast")
      }
      catch(e){
        console.log(e);
        toast.error("User already registed!!");
        setLoading(false);
      }
    }else{
      if(password !== cpassword ){
        toast.error("Passwords not matching!!");
      }
      if(password.length < 6){
        toast.error("Password must contains at least 6 character!!")
      }
      setLoading(false);
    }
   
  }
  return (
    <div>
      <Innernav />
      <div className='signup'> 
      <div>
        <h1>Signup</h1>
        <input
        type='text'
        onChange={(e)=>setName(e.target.value)}
        value={name}
        placeholder='Enter your name'
        required
        ></input><br></br>
        <input
        type='email'
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        placeholder='Enter your email'
        required
        ></input><br></br>
        <input
        type='password'
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        placeholder='Password'
        required
        ></input><br></br>
        <input
        type='password'
        onChange={(e)=>setCpassword(e.target.value)}
        value={cpassword}
        placeholder='Confirm password'
        required
        ></input><br></br>
        <button onClick={handlesignup} disabled={loading} >{loading ? "Loading...": "Signup"}</button>
        
      </div>
      <p className='para'>Already have an account?<Link to='/login'>Login</Link></p>
      </div>
    </div>
  )
}

export default Signup
