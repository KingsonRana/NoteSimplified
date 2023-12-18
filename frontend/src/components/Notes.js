import React, { useEffect, useRef } from "react";
import { useContext,useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import { Addnote } from "./Addnote";
import alertContext from "../context/alert/alertContext";
import { useNavigate } from "react-router-dom";

export const Notes = () => {
  const [creationDate,setDate] = useState();
  let navigate = useNavigate()
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  const {display} = useContext(alertContext)
  useEffect(() => {
    if(localStorage.getItem('token')){
     getNotes();
     }else{
     navigate("/")
    }

    //eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const{editNote} = useContext(noteContext)
  const [note,setNote] = useState({id:"",etitle:"", edescription:"",etag:"",date:""})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description, etag:currentNote.tag,date:currentNote.date})
    const date = new Date(note.date).toDateString()
    setDate(date)

  };

  const handleClick = (e)=>{
    if(note.etitle.length<5||note.edescription.length<5){
      const data={
        message:"Please make sure title and description are atleast 5 character long",
        type:"warning"
      }
      display(data)
      return
    }

    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click()
 }

 const onChange = (e) => {
 setNote({...note,[e.target.name]:e.target.value})
 }
  return (
    <div className="parentNoteSection">
      <div className="top">
   
      <Addnote />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
      </button>

      <div
        className="modal fade editModal"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refClose}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
          <textarea
            type="textbox"
            className="form-control"
            id="edescription"
            name="edescription"
            onChange={onChange}
            minLength={5}
            value={note.edescription}
          />
          <p>Created on: {creationDate}</p>
                </div>
                <button type="button" id="editNote" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="noteItem">
      <div className="row my-3">
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              updateNote={updateNote}
              note={note}
            ></NoteItem>
          );
        })}
      </div></div>
    </div>
  );
};
