import React, { useState } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';
import './LoginPage.css'; // Ensure to keep your existing CSS
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

function LoginPage() {
  // State variables for login inputs and form validation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  
  // React Router's useNavigate hook
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      
      // Assuming the response contains a token
      const token = response.data.user.email;  
      localStorage.setItem('token', token);
      console.log(token, 'ressssssss');
      
      setSnackbarSeverity('success');
      setErrorMessage('Login successful!');
      setSnackbarOpen(true);
      
      // Redirect to quiz page after successful login
      navigate('/quiz');
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <MDBContainer fluid className="d-flex flex-column min-vh-100">
      {/* Snackbar for login messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity} 
          sx={{ 
            backgroundColor: snackbarSeverity === 'success' ? '#4caf50' : '#f44336', 
            color: '#ffffff', 
            borderRadius: '8px', 
            padding: '16px', 
            fontWeight: 'bold', 
          }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      <MDBRow className="flex-grow-1">
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
                    <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-normal mb-0 me-3">Sign up with</p>
            <MDBBtn floating size="md" tag="a" className="me-2">
              <FontAwesomeIcon icon={faFacebookF} />
            </MDBBtn>
            <MDBBtn floating size="md" tag="a" className="me-2">
              <FontAwesomeIcon icon={faTwitter} />
            </MDBBtn>
            <MDBBtn floating size="md" tag="a" className="me-2">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </MDBBtn>
          </div>
          <div className="divider d-flex align-items-center my-4 justify-content-center">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <MDBInput
              wrapperClass="mb-4"
              placeholder="Email address"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Input */}
            <MDBInput
              wrapperClass="mb-4"
              placeholder="Password"
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Toggle password visibility */}
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
              onClick={() => setShowPassword(!showPassword)}
            />

            {/* Remember Me Checkbox */}
            <MDBCheckbox name="rememberMe" id="rememberMe" label="Remember me" />

            {/* Submit Button */}
            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn
                type="submit"
                className="mt-4 w-50 custom-button px-5"
                style={{ backgroundColor: "#0d6efd", color: "white" }}
              >
                Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account? <Link to="/register" className="link-danger">Register</Link>
              </p>
            </div>
          </form>
        </MDBCol>
      </MDBRow>

      {/* Footer */}
      <div className="footer w-100 d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2020. All rights reserved.
        </div>
      </div>
    </MDBContainer>
  );
}

export default LoginPage;
