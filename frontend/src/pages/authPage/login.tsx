import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/index.css'

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true); // start loading

  if (!email || !password) {
    setError('Please fill in all fields');
    setLoading(false); 
    return;
  }

  try {
    const response = await fetch('https://threew-social-post-app.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || 'Login failed');
    } else {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', email);
      navigate('/');
    }
  } catch (err) {
    console.error(err);
    setError('Server error, please try again later.');
  } finally {
    setLoading(false);
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
         <button
  type="submit"
  className="btn btn-primary w-100 rounded-3 py-2 fw-semibold"
  disabled={loading}
>
  {loading ? (
    <>
      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Logging in...
    </>
  ) : (
    'Login'
  )}
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