import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

export const Navbar = () => {
  const {setLogin} = useContext(noteContext)
  let location = useLocation();
  const {logIn} = useContext(noteContext)
  return (
    <> {logIn?<nav
      className="navbar navbar-expand-lg bg-body-tertiary navbar navBarPosition"
      style={{ background: "black" }}
    >
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
         

            <Link style={logIn===true?{display:"block"}:{display:"none"}} className="btn btn-primary mx-1 fa-sharp fa-solid" onClick={()=>{ localStorage.removeItem('token'); setLogin(false)}} to="/" role="button">
              Log Out
            </Link>      
             </div>
      </div>
    </nav>:""}</>
  );
};
