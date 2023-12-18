import React, { useContext, useState, useRef } from 'react';
import noteContext from '../context/notes/noteContext';
import alertContext from '../context/alert/alertContext';
import { Link} from "react-router-dom";


export const Addnote = () => {
  const {display} = useContext(alertContext)
    const{notes,addNote,setLogin} = useContext(noteContext)
    const [note,setNote] = useState({title:"", description:"",tag:""})
    const ref2 = useRef(null)
    const handleClick = (e)=>{
      
       e.preventDefault(); 
       if(note.title.length<5 || note.description.length<5){
        const data={
          message:"Make sure title and description are greater than 4 characters",
          type:"warning"
        }
        display(data)
        return
      }
      const data={
        message:"Note added successfully",
        type:"success"
      }
      ref2.current.click()
      display(data)
       addNote(note.title,note.description,note.tag);
       setNote({title:"", description:"",tag:""})
    }
      
    const onChange = (e) => {
    setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
{/* <!-- Button trigger modal --> */}
<div className='noteTop'>
<button type="button" className="btn btn-primary addNoteButton" data-bs-toggle="modal" data-bs-target="#exampleModal2">
<i className="fa fa-plus"> </i>
</button>
<h2 className="yournotes">{notes.length===0?'No Notes':"Your Notes"}</h2>
<Link className="btn btn-primary logout" onClick={()=>{ localStorage.removeItem('token'); setLogin(false)}} to="/" role="button">Logout</Link>
</div>
<div className="modal fade " id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h2 className="modal-title fs-5" id="exampleModalLabel">Add Note</h2>
        <button type="button" ref={ref2} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body " >
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={5}
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Description" className="form-label">
            Description
          </label>
          <textarea
            type="textbox"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            minLength={5}
            value={note.description}
          />
        </div>
       <div> 
         <button type="submit" id='addNote' className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
 </div>
 </form>
      </div>
    </div>
  </div>
</div>
   </div>

  )
}
