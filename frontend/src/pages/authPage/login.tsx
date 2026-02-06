import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/index.css'

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (email && password.length >= 6) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      navigate('/');
    } else {
      setError('Invalid credentials. Password must be at least 6 characters.');
    }
  };

  return (
    <div className="auth-container">
      <div className="bg-white rounded-4 p-4 shadow-lg w-100" style={{ maxWidth: 400 }}>
        <h2 className="text-center mb-4 text-dark">
          <i className="bi bi-people-fill me-2"></i>
          Welcome Back
        </h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3 rounded-3 py-2"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3 rounded-3 py-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary w-100 rounded-3 py-2 fw-semibold">
            Login
          </button>
        </form>

        <p className="text-center mt-3 text-secondary">
          Don't have an account? <Link to="/register" className="text-primary fw-semibold text-decoration-none">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;