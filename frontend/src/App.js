import logo from "./logo.svg";
import { Home } from "./components/Home";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import NoteState from "./context/notes/NotesState";
import { Alert } from "./components/Alert";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import './App.css'
import StateAlert from "./context/alert/StateAlert";
import { useEffect } from "react";

function App() {

 useEffect(()=>{
   localStorage.removeItem('token')
 },[]) 
  return (
    <div className="appComponent"> <StateAlert>
      <NoteState>
          <Router>
            {/* <Navbar /> */}
            <Alert/>
            <div className="container viewPort">
            <Routes>
              <Route exact path="/Home" element={<Home />}></Route>
              <Route exact path="/" element={<Login />}></Route>
              <Route exact path="/signUp" element={<Signup />}></Route>
            </Routes>
            </div>
          </Router>
         
      </NoteState>
      </StateAlert>
    </div>
  );
}

export default App;
