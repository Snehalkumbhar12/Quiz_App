import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import QuizPage from './pages/QuizPage';
import LeaderboardPage from './pages/LeaderboardPage';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from './context/ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to="/">Quiz App</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                {/* <Nav.Link as={Link} to="/leaderboard">Leaderboard</Nav.Link> */}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container className="my-5">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/quiz" element={<QuizPage />} />
                        <Route path="/leaderboard" element={<LeaderboardPage />} />

                    </Routes>
                </Container>
            </Router>
        </ThemeProvider>
    );
}

export default App;
