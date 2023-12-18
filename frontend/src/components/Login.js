import React, { useContext } from "react";
import {useState} from "react"
import { useNavigate } from "react-router-dom";
import alertContext from "../context/alert/alertContext";
import noteContext from "../context/notes/noteContext";
import { Link} from "react-router-dom";
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';

export const Login = () => {
    let navigate = useNavigate()
    const [data, setData] = useState({email:"",password:""}) 
    const {display} = useContext(alertContext)
    const {setLogin,setUser} = useContext(noteContext)
    const hadleSubmit= async (e)=>{
        e.preventDefault()
        const response = await fetch(process.env.REACT_APP_URL_LOGIN,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({email:data.email,password:data.password})

        })
        setData({email:"",password:""}) 
        const json = await response.json()

        if(json.success===true){
          localStorage.setItem("token",json.authToken)
          const data={
            message:"Log in success",
            type:"success"
          }
            display(data)
            setLogin(true)
            navigate("/Home")
            setUser(json.user)
            
        }else{
          const data={
            message:"Log in failed, bad credentials",
            type:"danger"
          }
          display(data)
        }
       
    }
  const onChange =(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  return (
    <div className="container signUpContainer">
    
    <div className="card signUpCard">
    <h5>Note Simplified</h5>
    
      <form className="signUpForm" onSubmit={hadleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <div>
            <FontAwesome name="user" className="icon" />
          <input
            type="email"
            className="form-control formInput"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={data.email}
          />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <div>
            <FontAwesome name="key" className="icon"/>
          <input
            type="password"
            className="form-control formInput"
            id="password"
            name="password"
            onChange={onChange}
            value={data.password}
          />
          </div>
        </div>
        <div className="signUpButton">
        <button type="submit" className="btn btn-primary">
          Log in
        </button>
        </div>
      </form>
      <span>Notes Simplified: Create, Edit, Delete, and Organize with Ease!</span>
      <h6>Don't have an account?<Link  to="/signUp" >
        Sign Up
    </Link></h6>
    </div>
</div>
  );
};

