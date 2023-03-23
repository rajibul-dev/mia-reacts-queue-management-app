import React, { useEffect, useState } from "react";

// styles
import "./QueueEditForm.css";

export default function QueueEditForm({ queue, onClose }) {
  const [inputValues, setInputValues] = useState({
    user: "",
    videoLink: "",
  });

  useEffect(() => {
    setInputValues({
      user: queue.name,
      videoLink: queue.videoLink
    })
  }, [queue])
  
  // Define a state variable to keep track of whether the inputs are focused
  const [inputFocus, setInputFocus] = useState({
    user: false,
    videoLink: false,
  });

  // Define a function to handle the input field changes
  const handleInputChange = (event) => {
    setInputValues({
      ...inputValues,
      [event.target.id]: event.target.value,
    });
  };

  // Define a function to handle the input field focus
  const handleInputFocus = (event) => {
    setInputFocus({
      ...inputFocus,
      [event.target.id]: true,
    });
  };

  // Define a function to handle the input field blur
  const handleInputBlur = (event) => {
    setInputFocus({
      ...inputFocus,
      [event.target.id]: false,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <form className="q-edit-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          id="user"
          type="text"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={inputValues.user}
        />
        <label
          htmlFor="user"
          className={
            inputFocus.user || inputValues.user !== "" ? "floating-label" : ""
          }
        >
          User
        </label>
      </div>

      <div className="input-container">
        <input
          id="videoLink"
          type="text"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={inputValues.videoLink}
        />
        <label
          htmlFor="videoLink"
          className={
            inputFocus.videoLink || inputValues.videoLink !== ""
              ? "floating-label"
              : ""
          }
        >
          Video link
        </label>
      </div>

      <button className="remove">Remove</button>

      <button className="cancel" onClick={(onClose)}>Cancel</button>

      <button type="submit" className="save">
        Save
      </button>
    </form>
  );
}