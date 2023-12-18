import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";

export default function NoteItem(props) {
  const { note, updateNote } = props;
  const date = new Date(note.date).toDateString()
  const {deleteNote} = useContext(noteContext)
  const [color,setColor] = useState("#ee3a3a")
  useEffect(()=>{
       const colorCode = ["#8f8f23","#7b7b4b","#43bf48","#ea844d","#df84e8","#e698ba","#e7e7e7","#ee3a3a","#93ee3a","#3aeed4"]
       const number = Math.floor(Math.random() * (9 - 0));
       setColor(colorCode[number])

  },[])
  return (
    <div className="col-md-3 cardItem noteItemParent ">
      <div className="card my-3 noteItems" style={{background:color}}>
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">Title : {note.title} </h5>
          </div>
          <p className="card-text descriptionNoteItem">Description : {note.description}</p>
          <p className="card-text">Tag : {note.tag}</p>
          <p className="card-text">Date created : {date}</p>
          <i className="fa fa-trash " style={{ color: "#d30d0d" }} onClick={()=>{ deleteNote(note._id)}}></i>
          <i className="fa fa-edit mx-3 " onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
}
