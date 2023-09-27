import React,{useState} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { auth, db } from '../../firebase';
import { setUser } from '../../slice/userSlice';
import "./Login.css"
import { toast } from 'react-toastify';
import Innernav from '../../components/Navbar/Innernav';


const Login = () => {

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);

   async function handleLogin(){
    setLoading(true);
    try{

      let userCredentials = await signInWithEmailAndPassword(    // authentication
        auth,
        email,
        password
      )
      const user = userCredentials.user;
      
     
      // saving in database
      const userDoc = await getDoc(doc(db,"users",user.uid));
      const userData = userDoc.data();
      console.log("userData", userData)

      //save data in redux store, call redux store
      dispatch(setUser({
          name: userData.name,
          email: user.email,
          uid: user.uid,
        }))
      toast.success("Successfully login!!")
      navigate("/podcast")
    }
    catch(e){
      console.log(e);
      toast.error("Invalid Id or password!!")
      setLoading(false);
    }
   }
  return (
    <>
    <Innernav />
    <div className='signup'>
        <h1>Login</h1>
        <input
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        placeholder='Enter your email'
        required
        ></input><br></br>
        <input
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        placeholder='Password'
        require
        ></input><br></br>
        
        {/* loading when login */}
        <button onClick={handleLogin}>{loading ? "Loading...": "Login"}</button>   
        <p className='para'>Don't have account?<Link to='/profile'>Signup</Link></p>
    </div>
    </>
  )
}

export default Login
