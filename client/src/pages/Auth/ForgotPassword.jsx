import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast  from "react-hot-toast";
import axios from 'axios';

import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {

    
  
    const [email, setemail] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [answer, setAnswer] = useState("");


   const navigate=useNavigate();

    const handleSubmit=async(e)=>{
  
      e.preventDefault();
      try{
          const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{email,newpassword,answer} )
          if(res && res.data.success){
            
   

              navigate('/login')   
            
              toast.success(res.data.message)
  
  
          }
  
          else{
              toast.error(res.data.message)
          }
          
      }catch(error){
          console.log(error)
          toast("something went wrong")
      }
  }


  return (
    <Layout>
    <h1>Forgot Password</h1>

    
    <form onSubmit={handleSubmit}> 
     
     <div className="mb-3">
       <label htmlFor="exampleInputEmail1" className="form-label">
         Email address
       </label>
       <input
         type="email"
         className="form-control"
         id="exampleInputEmail1"
         value={email}
         onChange={(e)=>setemail(e.target.value)}
         required
       />
       <div id="emailHelp" className="form-text">
         We'll never share your email with anyone else.
       </div>
     </div>
     <div className="mb-3">
       <label htmlFor="exampleInputPassword1" className="form-label">
         Reset Password
       </label>
       <input
         type="password"
         className="form-control"
         id="exampleInputPassword1"
           value={newpassword}
           onChange={(e)=>setnewpassword(e.target.value)}
           required
       />
     </div>

     <div className="mb-3">
       <label htmlFor="exampleInputPassword1" className="form-label">
      Enter Your Favourite Sport?
       </label>
       <input
         type="text"
         className="form-control"
         id="exampleInputPassword1"
           value={answer}
           onChange={(e)=>setAnswer(e.target.value)}
           required
       />
     </div>
    
   <div className="login-btn" >
     <button type="submit" className="btn btn-primary">
       Reset
     </button>

     
     </div>
   </form>
    </Layout>
  )
}

export default ForgotPassword