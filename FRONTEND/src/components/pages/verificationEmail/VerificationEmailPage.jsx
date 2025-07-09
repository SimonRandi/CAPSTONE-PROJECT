import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerificationEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Token mancante nell'URL.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/auth/verify-email?token=${token}`
        );
        const text = await response.text();

        if (response.ok) {
          setStatus("success");
          setMessage(text || "Email verificata con successo!");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setStatus("error");
          setMessage(text || "Errore durante la verifica.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("Errore di connessione al server.");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="container mt-5 text-center">
      {status === "loading" && <p>Verifica in corso...</p>}
      {status === "success" && (
        <div>
          <h2 className="text-success">✅ Verifica completata</h2>
          <p className="text-center">{message}</p>
        </div>
      )}
      {status === "error" && (
        <div>
          <h2 className="text-danger">❌ Verifica fallita</h2>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default VerificationEmailPage;
