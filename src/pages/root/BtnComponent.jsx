import React from "react";
import { Link } from "react-router-dom";

import "./BtnComponent.css";

export default function BtnComponent({ title, desc, route, disabled = false }) {
  return (
    <Link className={`initial-btn${disabled ? " disabled" : ""}`} to={route}>
      <span className="link-title">{title}</span>
      <p className="btn-desc">{desc}</p>
    </Link>
  );
}
