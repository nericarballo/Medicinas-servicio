import { useEffect, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import InputField from "./InputField";
import QuestionAdmin from "./QuestionAdmin";
import "../stylesheets/InputField.css";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "../utils/LocalStorage";
import { FaqApi } from "../api/FaqApi";
import Swal from "sweetalert2";

function DashFAQ() {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const handleQuestionClick = (index) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  const handleQuestionDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres eliminar esta pregunta?",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const jwt = LocalStorage.Get("token");
        //TODO Eliminar pregunta
        await FaqApi.deleteFaq(jwt, id);

        Swal.fire("¡Eliminado!", "La pregunta ha sido eliminada.", "success");

        // Recargar las preguntas
        const faq = await FaqApi.getFaq(jwt);
        setQuestions(faq);
      } catch (error) {
        console.error("Error:", error);
        Swal.fire(
          "Error",
          "Hubo un problema al eliminar la pregunta.",
          "error"
        );
      }
    }
  };

  const clickShowModal = (type, question = null) => {
    if (type === "add") {
      setTitleModal("Agregar pregunta frecuente");
      setSelectedQuestion(null);
      setQuestionInput("");
      setAnswerInput("");
    } else {
      setTitleModal("Actualizar pregunta frecuente");
      setSelectedQuestion(question);
      setQuestionInput(question.question);
      setAnswerInput(question.answer);
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: selectedQuestion
        ? "¿Quieres actualizar esta pregunta?"
        : "¿Quieres agregar esta pregunta?",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const jwt = LocalStorage.Get("token");
        if (selectedQuestion) {
          //TODO Actualizar pregunta

          await FaqApi.updateFaq(
            jwt,
            selectedQuestion.id,
            questionInput,
            answerInput
          );
        } else {
          //TODO Crear nueva pregunta
          await FaqApi.createFaq(jwt, questionInput, answerInput);
        }

        Swal.fire(
          "¡Guardado!",
          selectedQuestion
            ? "La pregunta ha sido actualizada."
            : "La pregunta ha sido agregada.",
          "success"
        );

        setShowModal(false);
        // Recargar las preguntas
        const faq = await FaqApi.getFaq(jwt);
        setQuestions(faq);
      } catch (error) {
        console.error("Error:", error);
        Swal.fire("Error", "Hubo un problema al guardar la pregunta.", "error");
      }
    }
  };

  const toggleVisibility = async (id, currentView, ques, ans) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: currentView
        ? "¿Quieres ocultar esta pregunta?"
        : "¿Quieres hacer visible esta pregunta?",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const jwt = LocalStorage.Get("token");
        //TODO cambiar estado de la pregunta

        await FaqApi.updateFaqVisible(jwt, id, ques, ans, !currentView);

        Swal.fire(
          "¡Actualizado!",
          currentView
            ? "La pregunta ha sido ocultada."
            : "La pregunta es ahora visible.",
          "success"
        );

        // Recargar las preguntas
        const faq = await FaqApi.getFaq(jwt);
        setQuestions(faq);
      } catch (error) {
        console.error("Error:", error);
        Swal.fire(
          "Error",
          "Hubo un problema al actualizar la visibilidad de la pregunta.",
          "error"
        );
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const jwt = LocalStorage.Get("token");
      if (!jwt) {
        navigate("/");
        return;
      }
      try {
        const faq = await FaqApi.getFaq(jwt); //llamando a las faq
        setQuestions(faq);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
      <div className="faq-header">
        <h2>Preguntas frecuentes</h2>
        <Button
          variant={"primary"}
          children={"Agregar pregunta"}
          onClick={() => clickShowModal("add")}
        />
      </div>
      <br />
      <div className="faq-content">
        <Modal
          show={showModal}
          className="modal"
          handleClose={() => setShowModal(false)}
        >
          <div className="modal-content-faq">
            <h2>{titleModal}</h2>
            <InputField
              type="text"
              label="Pregunta"
              className="form"
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
            />
            <label htmlFor="myTextarea">Respuesta</label>
            <textarea
              className="textarea"
              rows="4"
              cols="80"
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
            ></textarea>
            <Button
              variant={"primary"}
              children={"Guardar"}
              onClick={handleSave}
            />
          </div>
        </Modal>
        <div className="faq-list">
          {questions.map((q, index) => (
            <QuestionAdmin
              key={index}
              id={q.id}
              question={q.question}
              answer={q.answer}
              view={q.is_visible}
              isOpen={openQuestionIndex === index}
              onClick={() => handleQuestionClick(index)}
              btnUpdate={() => clickShowModal("update", q)}
              btnDelete={() => handleQuestionDelete(q.id)}
              toggleVisibility={() =>
                toggleVisibility(q.id, q.is_visible, q.question, q.answer)
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default DashFAQ;
