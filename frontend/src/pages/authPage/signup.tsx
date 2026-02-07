import { useNavigate, Link } from "react-router-dom";
import "../../styles/index.css";
import { useState } from "react";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://threew-social-post-app.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
      } else {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); 
      }
    } catch (err) {
      console.error(err);
      setError("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div
        className="bg-white rounded-4 p-4 shadow-lg w-100"
        style={{ maxWidth: 400 }}
      >
        <h2 className="text-center mb-4 text-dark">
          <i className="bi bi-person-plus-fill me-2"></i>
          Create Account
        </h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3 rounded-3 py-2"
            placeholder="Full Name"
            value={username}
            onChange={(e) => setuserName(e.target.value)}
            disabled={loading}
          />
          <input
            type="email"
            className="form-control mb-3 rounded-3 py-2"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            className="form-control mb-3 rounded-3 py-2"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            className="form-control mb-3 rounded-3 py-2"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />

          <button
            type="submit"
            className="btn btn-primary w-100 rounded-3 py-2 fw-semibold"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Signing up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center mt-3 text-secondary">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary fw-semibold text-decoration-none"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
