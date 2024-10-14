import React from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Ensure the CSS is imported

function HomePage() {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle login button click
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <MDBContainer fluid className="d-flex flex-column min-vh-100">
      <MDBRow className="flex-grow-1 d-flex align-items-center">
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <h2 className="text-center">Welcome to the Quiz Application</h2>
          <p className="text-center">
            Test your knowledge by taking quizzes on various topics. Track your
            progress and compete with others on the leaderboard!
          </p>

          <div className="d-flex flex-column align-items-center">
            <MDBBtn
              variant="secondary"
              className="mt-4 w-50 custom-button px-5"
              onClick={handleLoginClick}
              style={{ backgroundColor: "#0d6efd", color: "white" }}
            >
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </MDBBtn>
            <MDBBtn
              variant="outline-info"
              className="mt-4 w-50 custom-button px-5"
              onClick={handleRegisterClick}
              style={{ backgroundColor: "#0d6efd", color: "white" }}
            >
              <FontAwesomeIcon icon={faUser} /> Register
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>

      {/* Footer */}
      <footer className="footer mt-auto w-100 d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 bg-primary text-white">
        <div className="mb-3 mb-md-0">
          Copyright © 2020. All rights reserved.
        </div>
        <div className="social-icons">
          <MDBBtn tag="a" color="none" className="mx-3" style={{ color: "white" }}>
            <MDBIcon fab icon="facebook-f" size="md" />
          </MDBBtn>
          <MDBBtn tag="a" color="none" className="mx-3" style={{ color: "white" }}>
            <MDBIcon fab icon="twitter" size="md" />
          </MDBBtn>
          <MDBBtn tag="a" color="none" className="mx-3" style={{ color: "white" }}>
            <MDBIcon fab icon="google" size="md" />
          </MDBBtn>
          <MDBBtn tag="a" color="none" className="mx-3" style={{ color: "white" }}>
            <MDBIcon fab icon="linkedin-in" size="md" />
          </MDBBtn>
        </div>
      </footer>
    </MDBContainer>
  );
}

export default HomePage;
