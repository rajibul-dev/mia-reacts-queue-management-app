import React, { useState, useEffect } from "react";

// styles
import "./CopyBtn.css";

// icons
import CopyIcon from "../../icons/copy.svg";
import DoneIcon from "../../icons/done.svg";

export default function CopyBtn({ queues }) {
  const [textToCopy, setTextToCopy] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (queues) {
      const text = queues
        .map((item) => `${item.onNumber}. ${item.name} --> ${item.videoLink}`)
        .join("\n");
      setTextToCopy(text);
    }
  }, [queues]);

  const handleCopyToClipboard = () => {
    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 3000);
        })
        .catch((error) => {
          console.error("Failed to copy: ", error);
        });
    }
  };

  return (
    <button onClick={handleCopyToClipboard} className="copyBtn">
      <img src={copied ? DoneIcon : CopyIcon} alt="google font icons" />
      <span>{copied ? "Copied successfully" : "Copy list to clipboard"}</span>
    </button>
  );
}
