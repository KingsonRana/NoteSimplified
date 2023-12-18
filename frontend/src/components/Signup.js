import React, { useContext, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import alertContext from "../context/alert/alertContext";
import noteContext from "../context/notes/noteContext";
import FontAwesome from 'react-fontawesome';

import 'font-awesome/css/font-awesome.min.css';

export const Signup = () => {
 const navigate = useNavigate()
 const{display} = useContext(alertContext)
 const {setLogin,setUser} = useContext(noteContext)
  const [credentials,setCredentials] = useState({name:"",semail:"",spassword:""})

  const onChange =(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  const handleSubmit= async(e)=>{
    e.preventDefault()
    const response = await fetch(process.env.REACT_APP_URL_SIGNUP,{
       method:"POST",
       headers:{
              "Content-Type": "application/json",
       },
       body:JSON.stringify({name:credentials.name,email:credentials.semail,password:credentials.spassword})
    })
    const json = await response.json()
    if(json.success===true){
      localStorage.setItem("token",json.authToken)
      const data={
        message:"Sign up success",
        type:"success"
      }
      display(data)
      setLogin(true)
       navigate("/home")
    }else{
      const data={
        message:"Sign up failed",
        type:"danger"
      }
      display(data)
      
    }
    setUser(json.user)
    setCredentials({name:"",semail:"",spassword:""})
  }
  
  return (
    <div className="container signUpContainer">
      <div className="left"></div>
      <div className="card signUpCard">
        <h5>Sign up</h5>
      <form className="signUpForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <div>
          <FontAwesome name="user" className="icon" />
          <input type="text" className="form-control formInput" id="name" name="name" value={credentials.name} onChange={onChange}></input></div>
        </div>
        <div className="mb-3">
          <label htmlFor="semail" className="form-label">
            Email address
          </label>
          <div>
          <FontAwesome name="envelope" className="icon" />
          <input
            type="email"
            className="form-control formInput"
            id="semail"
            name="semail"
            aria-describedby="emailHelp"
            value={credentials.semail}
            onChange={onChange}
          />
        </div>
        </div>
        <div className="mb-3">
          <label htmlFor="spassword" className="form-label">
            Create Password
          </label>
          <div>
            <FontAwesome name="key" className="icon"/>
          <input
            type="password"
            className="form-control formInput"
            id="spassword"
            name="spassword"
            value={credentials.spassword}
            onChange={onChange}
          />
          </div>
        </div>
        <div className="signUpButton">
        <button type="submit" className="btn btn-primary">
           Create Account
        </button></div>
      </form>
      <span>Notes Simplified: Create, Edit, Delete, and Organize with Ease!</span>
      <h6>Already have an account?<Link  to="/" >
              Log In
          </Link></h6>
      </div>
    </div>
  );
};
