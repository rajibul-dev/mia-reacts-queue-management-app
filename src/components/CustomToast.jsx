import React, { useState, useEffect } from "react";
import "./CustomToast.css";

export default function CustomToast({
  message,
  type,
  duration = 3000,
  onClose,
  margin,
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    const timeout = setTimeout(() => {
      setShow(false);

      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  const classNames = `CustomToast ${type} ${show ? "show" : ""} ${margin}`;

  return <p className={classNames}>{message}</p>;
}
