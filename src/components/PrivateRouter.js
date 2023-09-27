import React from 'react'
import { auth } from '../firebase'
import { useAuthState} from 'react-firebase-hooks/auth'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {

  const [user, loading, error] = useAuthState(auth);

  if(loading){   // when loading  show loading
    return <p>Loading...</p>
  }
  else if(!user || error){  // when error redirected towards home page
    return <Navigate to="/" replace />
  }
  else{  // desired page
    return <Outlet />
  }
}

export default PrivateRouter
