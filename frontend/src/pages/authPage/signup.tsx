import { useNavigate, Link } from 'react-router-dom';
import '../../styles/index.css';
import { useState } from 'react';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="bg-white rounded-4 p-4 shadow-lg w-100" style={{ maxWidth: 400 }}>
        <h2 className="text-center mb-4 text-dark">
          <i className="bi bi-person-plus-fill me-2"></i>
          Create Account
        </h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3 rounded-3 py-2"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3 rounded-3 py-2"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary w-100 rounded-3 py-2 fw-semibold">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3 text-secondary">
          Already have an account? <Link to="/login" className="text-primary fw-semibold text-decoration-none">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;