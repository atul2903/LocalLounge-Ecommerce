import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = ({path='login'}) => {

    const [count,setCount]=useState(5);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        const interval=setInterval(() => {
            setCount((prev)=> --prev)
            
        }, 1000);
        if (count===0) {
            navigate(`/${path}`,{
                state:location.pathname
            })
        }
        return ()=>clearInterval(interval)
    },[count,navigate,location,path])
  return (
    <div className='spinner-header'>
        <h1>Login First to view Dashboard!!!</h1>
        <h1>
            Redirecting you to login page in {count}</h1>
        <div class="custom-loader"></div>
    
  </ div>
  )
}

export default Spinner;