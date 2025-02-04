import React, { useEffect, useState } from "react";

const QuestionItem = ({ question, responses, setResponses }) => {
  const [answer, setAnswer] = useState("");

  const handleInputChange = (e) => {
    const newAnswer = e.target.value;
    setAnswer(newAnswer);

    setResponses((prevResponses) => {
      const updatedResponses = prevResponses.filter((res) => res.id !== question.id);
      return [...updatedResponses, { id: question.id, question: question.question, answer: newAnswer }];
    });
  };

  useEffect(() => {
    if (responses.length === 0) {
      setAnswer("");
    }
  }, [responses]);

  return (
    <div className="question-item">
      <label htmlFor={question.id} className="question-item__label">
        {question.id}. {question.question}
      </label>
      <input
        className="question-item__input"
        type="text"
        id={question.id}
        value={answer}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default QuestionItem;
