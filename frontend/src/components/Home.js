import React, { useContext, useEffect } from "react";
import { Notes } from "./Notes";
import noteContext from "../context/notes/noteContext";

export const Home = () => {
  const { user } = useContext(noteContext);
  const date = new Date(user.date);
  return (
    <div className="home">
      <div className="proAbt">
        <div id="profile" className="card">
          <h4>Profile</h4>
          <div className="card-body">
            <p>
              <i className="fa fa-id-card"> {" " + user._id}</i>
            </p>
            <p>
              <i class="fa fa-user">{" " + user.name}</i>
            </p>
            <p>
              <i className="fa fa-envelope">{" " + user.email}</i>
            </p>
            <p>
              <i className="fa fa-calendar">
                {" Joined since " + date.toDateString()}
              </i>
            </p>
          </div>
        </div>
        <div id="about" className="card">
          <div className="card-body">
            <div className="modal-header">
              <h3>About</h3>
            </div>
            <p className="aboutP">
              Welcome to your ultimate digital notepad! Our note-taking website
              is your go-to tool for capturing, organizing, and accessing your
              ideas and information. With a user-friendly interface and
              accessibility from any device, we empower you to streamline your
              note-taking, boost productivity, and embrace the joy of organized
              thoughts. Welcome aboard!
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <Notes />
      </div>
    </div>
  );
};
