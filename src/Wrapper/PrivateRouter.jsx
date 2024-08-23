import React, {useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom';
import IsAuthenticated from '../Utils/IsAuthenticated';
import './Loader.scss'

function PrivateRouter({children}) {
  const [ShouldRedirect, setRedirect] = useState(false)
  const [showLoader, setLoader] = useState(true)

  useEffect(()=>{
    if(!IsAuthenticated){
      setRedirect(true)
    }
    setLoader(false)

  }, [])

  if(showLoader){
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="loader"></div>
      </div> 
    );
  }

  if(ShouldRedirect){
    return <Navigate to="/"/>
  }
  
  return children;
}

export default PrivateRouter
