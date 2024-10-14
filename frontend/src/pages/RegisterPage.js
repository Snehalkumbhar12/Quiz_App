import React, { useState } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit'; // Import modal components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Correct import for faEye and faEyeSlash
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './LoginPage.css'; // Ensure you import the same CSS file
import axios from 'axios';
import { TextField, Button, Alert, Snackbar } from '@mui/material'; // Import Material UI components


function RegisterPage() {
  // State variables for name, email, password, repeat password and their respective error messages
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const [successModal, setSuccessModal] = useState(false); // State for success modal
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // For setting snackbar severity

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false); // Correct state definition
  const [showRepeatPassword, setShowRepeatPassword] = useState(false); // Correct state definition

  // Email validation function
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
    return emailPattern.test(email);
  };

  // Password validation function
  const validatePassword = (password) => {
    // Check if password meets conditions (minimum 8 characters, at least 1 letter and 1 number)
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
    return passwordPattern.test(password);
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    // Reset error messages
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setRepeatPasswordError('');
    setFormError('');
    setSuccessMessage(''); // Clear success message
    setErrorMessage(''); // Clear error message
  
    // Validate name
    if (!name) {
      setNameError('Name cannot be empty.');
      return;
    }
    
    // if (name.length < 2) {
    //   setNameError('Name must be at least 2 letters.');
    //   return;
    // }

    if (/[^a-zA-Z]/.test(name)) {
      setNameError('Name can only contain letters.');
      return;
    }
  
    // Validate email
    if (!email) {
      setEmailError('Email cannot be empty.');
      return;
    }
  
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
  
    // Validate password
    if (!password) {
      setPasswordError('Password cannot be empty.');
      return;
    }
  
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one letter and one number.');
      return;
    }
  
    if (password !== repeatPassword) {
      setRepeatPasswordError('Passwords do not match.');
      return;
    }
  
    try {
      // Make a POST request to the backend
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
  
      setSuccessMessage(response.data.message); // Set success message
      setSnackbarSeverity('success');
      setSnackbarOpen(true); // Open Snackbar
      setName(''); // Clear name input
      setEmail(''); // Clear email input
      setPassword(''); // Clear password input
      setRepeatPassword(''); // Clear repeat password input
    } catch (error) {
      // Check if it's a duplicate entry error
      if (error.response && error.response.data.error.includes('Duplicate entry')) {
        setErrorMessage('This email is already registered. Please use a different email.');
      } else {
        setErrorMessage('An error occurred during registration. Please try again later.');
      }
      setSnackbarSeverity('error'); // Set severity to error
    } finally {
      setSnackbarOpen(true); // Show snackbar regardless of success or error
    }
  };
  

  return (
    <MDBContainer fluid className="d-flex flex-column min-vh-100">
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
            backgroundColor: snackbarSeverity === 'success' ? '#4caf50' : '#f44336', // Green for success, Red for error
            color: '#ffffff', 
            borderRadius: '8px', 
            padding: '16px', 
            fontWeight: 'bold', 
          }}
        >
          {snackbarSeverity === 'success' ? successMessage : errorMessage}
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

          <form onSubmit={handleRegister}>
            <MDBInput
              wrapperClass="mb-4"
              placeholder="Name"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <div className="text-danger mb-3">{nameError}</div>}

            <MDBInput
              wrapperClass="mb-4"
              placeholder="Email address"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <div className="text-danger mb-3">{emailError}</div>}

            <MDBInput
              wrapperClass="mb-4"
              placeholder="Password"
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ position: 'relative' }}
            />
            {passwordError && <div className="text-danger mb-3">{passwordError}</div>}
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
              onClick={() => setShowPassword(!showPassword)}
            />

            <MDBInput
              wrapperClass="mb-4"
              placeholder="Repeat password"
              id="repeatPassword"
              type={showRepeatPassword ? 'text' : 'password'}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              style={{ position: 'relative' }}
            />
            {repeatPasswordError && <div className="text-danger mb-3">{repeatPasswordError}</div>}
            <FontAwesomeIcon
              icon={showRepeatPassword ? faEyeSlash : faEye}
              style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
            />

            {formError && <div className="text-danger mb-3">{formError}</div>}

            <MDBCheckbox name="terms" id="terms" label="I have read and agree to the terms" />

            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn
                type="submit"
                className="mt-4 w-50 custom-button px-5"
                style={{ backgroundColor: "#0d6efd", color: "white" }}
              >
                Register
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">&nbsp;&nbsp;&nbsp;&nbsp;
                Already have an account? <Link to="/login" className="link-danger">Login</Link>
              </p>
              
            </div>
          </form>
        </MDBCol>
      </MDBRow>

      <MDBModal show={successModal} setShow={setSuccessModal}>
        <MDBModalHeader>Registration Successful</MDBModalHeader>
        <MDBModalBody>
          Congratulations! You have registered successfully.
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={() => setSuccessModal(false)}>Close</MDBBtn>
        </MDBModalFooter>
      </MDBModal>

      <div className="footer w-100 d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2020. All rights reserved.
        </div>
        <div>
          <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
            <MDBIcon fab icon="facebook-f" size="md" />
          </MDBBtn>
          <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
            <MDBIcon fab icon="twitter" size="md" />
          </MDBBtn>
          <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
            <MDBIcon fab icon="google" size="md" />
          </MDBBtn>
          <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
            <MDBIcon fab icon="linkedin-in" size="md" />
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
}

export default RegisterPage;
