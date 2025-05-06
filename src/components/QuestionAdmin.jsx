import { FaEye, FaEyeSlash, FaPencil, FaTrash } from "react-icons/fa6";
import "../stylesheets/Question.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "../stylesheets/QuestionAdmin.css";

function QuestionAdmin({
  question,
  answer,
  isOpen,
  onClick,
  view,
  btnUpdate,
  btnDelete,
  id,
  toggleVisibility,
}) {
  return (
    <div className="question-admin-container">
      <div
        className={`question-container question-container-admin ${
          isOpen ? "active" : ""
        }`}
      >
        <div className={`question ${isOpen ? "active" : ""}`} onClick={onClick}>
          <h3 className="question-text">{question}</h3>
          {isOpen ? (
            <FaAngleUp className="arrow" />
          ) : (
            <FaAngleDown className="arrow" />
          )}
        </div>
        {isOpen && (
          <div className="answer">
            <p className="answer-text">{answer}</p>
          </div>
        )}
      </div>
      <div className="actions-column-table actions-column-question">
        <button
          onClick={toggleVisibility}
          className="action-btn question-btn"
          aria-label="Edit"
        >
          {view ? <FaEye /> : <FaEyeSlash />}
        </button>
        <button
          onClick={btnUpdate}
          className="action-btn question-btn"
          aria-label="Edit"
        >
          <FaPencil />
        </button>
        <button
          onClick={btnDelete}
          className="action-btn question-btn"
          aria-label="Delete"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default QuestionAdmin;
