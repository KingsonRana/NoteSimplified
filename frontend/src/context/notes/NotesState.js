import { useContext, useState } from "react";
import NoteContext from "./noteContext";
import alertContext from "../alert/alertContext";

const NoteState = (props) => {

  const notesInitial = [];
  const {display} = useContext(alertContext)
  const [logIn,setLogin] = useState(false)
  const [user,setUser] = useState({_id:"",name:"",email:"",date:""})
  // const setLogin=(value) =>{
  //    setLogIn(value)
  // }
//get all notes
const getNotes = async()=>{
  const response = await fetch(process.env.REACT_APP_URL_GETNOTES,{
    method:"GET",
    headers:{
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    }
  });
  const json = await response.json()
  setNotes(json)

}



  //Add note
  const addNote = async (title, description, tag) => {
    const response = await fetch(process.env.REACT_APP_ADDNOTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = await response.json()
    const note = json
    setNotes(notes.concat(note));
  };

  //Delete note
  const deleteNote = async (id) => {
    console.log("Deleting note");
    const response = await fetch(process.env.REACT_APP_DELETENOTE+`${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const json = await response.json()
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    const data={
      message:"Note Deleted Successfully",
      type:"success"
    }
    display(data)
  };


  //Edit note
  const editNote = async (id, title, description, tag) => {
    console.log("editing",id,title,description,tag);
    const response = await fetch(process.env.REACT_APP_EDITNOTE+`${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}),
    });
    const data={
      message:"Note edited successfully",
      type:"success"
    }
    display(data)
    const json = await response.json()
    const newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
    setNotes(newNotes)
  };

  const [notes, setNotes] = useState(notesInitial);
  return (
    // value={{state,update}} is similar to value={{state:state,update:update}} if names are same we don't have to write it twice
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes, setLogin,logIn,setUser,user }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
