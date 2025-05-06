import React, { useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import "../stylesheets/More.css";

function More({ title, infoComponent }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`more-container ${isOpen ? "active" : ""}`}>
      <div className={`title ${isOpen ? "active" : ""}`} onClick={handleClick}>
        <h3 className={"title-text"}>{title}</h3>
        {isOpen ? (
          <FaAngleUp className="arrow" />
        ) : (
          <FaAngleDown className="arrow" />
        )}
      </div>
      {isOpen && <div className={"info"}>{infoComponent}</div>}
    </div>
  );
}

export default More;
