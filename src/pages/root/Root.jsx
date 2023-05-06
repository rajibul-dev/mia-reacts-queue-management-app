import React from "react";
import Navbar from "../../components/Navbar";

// components
import BtnComponent from "./BtnComponent";

// styles
import "./Root.css";

export default function Root() {
  return (
    <>
      <Navbar onRoot={true} />

      <div className="Root">
        <div className="root-container">
          <h1>What do you want to do?</h1>
          <div className="btn-flex-initial">
            <BtnComponent
              title="Queue"
              desc="Request Mia to react on a song, and view the queue list"
              route="/viewer"
            />
            <BtnComponent
              title="Reaction videos"
              desc="Watch from the library of Mia’s twitch stream reactions."
              disabled={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
