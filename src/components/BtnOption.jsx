import { FaHandHoldingHeart } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import {
  FaBookMedical,
  FaFileMedical,
  FaFileMedicalAlt,
  FaLock,
} from "react-icons/fa";
import { BsBox2HeartFill } from "react-icons/bs";
import { BiSolidReport } from "react-icons/bi";
import { RiQuestionnaireFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import React from "react";

function BtnOption({ text, iconName, selected, handleClick }) {
  const iconMap = {
    deliver: <FaHandHoldingHeart />,
    user: <FaUserPlus />,
    patient: <FaFileMedical />,
    box: <BsBox2HeartFill />,
    item: <FaBookMedical />,
    report: <FaFileMedicalAlt />,
    question: <RiQuestionnaireFill />,
    logout: <MdLogout />,
    password: <FaLock />,
  };

  return (
    <button
      onClick={() => handleClick(iconName)}
      className={`panel-btn ${selected ? "selected" : ""}`}
    >
      <i className="icon-btn">{iconMap[iconName]}</i>
      <p className="text-btn">{text}</p>
    </button>
  );
}

export default BtnOption;
