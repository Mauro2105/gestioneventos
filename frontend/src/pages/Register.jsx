import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');

    if (!/\S+@\S+\.\S+/.test(email)) {
        setErrorMessage('Please enter a valid email');
        return;
    }

    if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long');
        return;
    }

    try {
        await axios.post('http://localhost:5001/users/register', {
        name,
        email,
        password,
    });
        navigate('/', { state: { successMessage: 'Registration successful. Please log in!' } });
    } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Error registering user');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
            Register
        </Typography>
        {errorMessage && (
            <Typography variant="body2" color="error" align="center" gutterBottom>
            {errorMessage}
            </Typography>
        )}
        <form onSubmit={handleRegister}>
            <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
            <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Register
            </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account? <Link to="/">Login here</Link>
        </Typography>
    </Container>
  );
};

export default Register;