import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import Button from "../../button/Button";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [unverifiedEmail, setUnverifiedEmail] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setUnverifiedEmail(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          setUnverifiedEmail(formData.email);
          setError(data.message);
        } else if (response.status === 401) {
          throw new Error(data.error || "Credenziali non valide ");
        } else {
          setError("Errore imprevisto nel Login, prova più tardi");
        }
        return;
      }

      localStorage.setItem("token", data.token);

      setSuccessMessage("Login effettuato con successo!");

      setTimeout(() => {
        const redirectPath = localStorage.getItem("redirectAfterLogin");
        if (redirectPath) {
          localStorage.removeItem("redirectAfterLogin");
          navigate(redirectPath);
        } else {
          navigate("/dashboard");
        }
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseLayout>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Accedi al tuo account</h2>

        <form className="mx-auto" onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              required
              autoComplete="new-email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-danger mt-2">{error}</p>}
          {successMessage && (
            <p className="text-success mt-2">{successMessage}</p>
          )}

          <div className="d-flex justify-content-center mt-4">
            <div className="mt-4 d-flex justify-content-center">
              <Button
                isLoading={isLoading}
                type="submit"
                text="Accedi"
                variant="success"
              />
            </div>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
};

export default Login;
