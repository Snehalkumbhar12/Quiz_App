import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './QuizPage.css';

const QuizPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswerSelect = (questionId, selectedOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const score = Object.keys(selectedAnswers).reduce((total, questionId) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      return total + (question.correct_option === selectedAnswers[questionId] ? 1 : 0);
    }, 0);

    await axios.post('http://localhost:5000/api/scores', { score });
    navigate('/leaderboard');
  };

  return (
    <MDBContainer fluid className="d-flex flex-column min-vh-100 bg-light">
      <MDBRow className="flex-grow-1 align-items-start">
        <MDBCol col="12">
          <h1 className="text-center mb-4 text-primary">Quiz Page</h1>
        </MDBCol>
      </MDBRow>
      
      <MDBRow className="flex-grow-1 align-items-start">
        <MDBCol col="10" md="6" className="mx-auto text-center mb-4">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid rounded"
            alt="Sample"
          />
        </MDBCol>

        <MDBCol col="10" md="6" className="mx-auto">
          <div className="questions-scroll-container">
            <form onSubmit={handleSubmit}>
              {questions.map((question) => (
                <div key={question.id} className="question-block mb-3">
                  <h4>{question.question}</h4>
                  {[question.option1, question.option2, question.option3, question.option4].map((option, index) => (
                    <div key={index} className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name={`question-${question.id}`}
                        value={index + 1}
                        onChange={() => handleAnswerSelect(question.id, index + 1)}
                      />
                      <label className="form-check-label">{option}</label>
                    </div>
                  ))}
                </div>
              ))}
              <MDBBtn
                type="submit"
                className="mt-4 w-50 custom-button px-5"
                style={{ backgroundColor: "#0d6efd", color: "white" }}
              >
                Submit
              </MDBBtn>
            </form>
          </div>
        </MDBCol>
      </MDBRow>

      {/* Footer */}
      <footer className="footer w-100 d-flex justify-content-center align-items-center bg-primary text-white py-3 mt-auto">
        <div>
          <p>© 2020 Your Quiz App. All rights reserved.</p>
          <p>
            <a href="/about" className="text-white">About</a> | 
            <a href="/contact" className="text-white">Contact</a>
          </p>
        </div>
      </footer>
    </MDBContainer>
  );
};

export default QuizPage;
