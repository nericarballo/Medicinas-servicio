import "../stylesheets/Home.css";
import Button from "../components/Button.jsx";
import Question from "../components/Question.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaqApi } from "../api/FaqApi.js";

const Faq = () => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const handleQuestionClick = (index) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const faq = await FaqApi.getFaqUser();
        console.log(faq);

        setQuestions(faq);
      } catch (error) {
        console.error("Error faqVIEW:", error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="Faq">
      <div className={"center"}>
        <h1>Preguntas frecuentes</h1>
      </div>
      {questions.map((q, index) => (
        <Question
          key={index}
          question={q.question}
          answer={q.answer}
          isOpen={openQuestionIndex === index}
          onClick={() => handleQuestionClick(index)}
        />
      ))}
    </div>
  );
};

export default function FAQ() {
  const navigate = useNavigate();
  return (
    <div className={"home"}>
      <div className={"welcome"}>
        <h1>Llevando salud a los más necesitados</h1>
        <div className={"center"}>
          <img
            src="https://www.nicepng.com/png/detail/204-2049937_logo-de-farmacia-png.png"
            alt=""
          />
        </div>
        <div className={"center"}>
          <Button
            variant={"primary"}
            children={"Volver"}
            onClick={() => navigate("/")}
          />
        </div>
      </div>
      <div className={"container faq"}>
        <Faq />
      </div>
    </div>
  );
}
