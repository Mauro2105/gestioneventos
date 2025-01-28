import   { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from "../services/eventsService"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true)

    if (!/\S+@\S+\.\S+/.test(email)) {
        setErrorMessage('Please enter a valid email');
        return;
    }

    try {
        const response = await axios.post(API_URL+'users/login', {
            email,
            password,
        });
        localStorage.setItem('token', response.data.token);
        navigate('/events');
    } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Error logging in');
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
            Login
        </Typography>
        {errorMessage && (
            <Typography variant="body2" color="error" align="center" gutterBottom>
            {errorMessage}
            </Typography>
        )}
        <form onSubmit={handleLogin}>
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
        <Button type="submit" variant="contained" color="primary" fullWidth loading={isLoading}>
            Login
        </Button>
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Dont have an account? <Link to="/register">Register here</Link>
      </Typography>
    </Container>
  );
};

export default Login;
