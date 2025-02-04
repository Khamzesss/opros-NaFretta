import { useEffect, useState } from 'react';
import { database } from '../../db/database';
import './question.css';
import QuestionItem from './QuestionItem';
import axios from 'axios';
import { url } from '../../api/url';

const Question = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots(prevDots => (prevDots.length < 3 ? prevDots + "." : ""));
      }, 500);

      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleButton = async () => {
    if (responses.length < database.length) {
      alert('Пожалуйста, ответьте на все вопросы!');
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        url,
        { responses },
        { headers: { 'Content-Type': 'text/plain;charset=UTF-8' } }
      );

      alert('Ответы успешно отправлены!');
      setResponses([]);
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      alert('Ошибка отправки. Попробуйте снова.');
    }

    setLoading(false);
  };

  if (loading) {
    return <div className="loading">Отправка ответов{dots}</div>;
  }

  return (
    <div className="question-list">
      {database.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          responses={responses}
          setResponses={setResponses}
        />
      ))}
      <button className="question-button" onClick={handleButton}>
        Отправить
      </button>
    </div>
  );
};

export default Question;
