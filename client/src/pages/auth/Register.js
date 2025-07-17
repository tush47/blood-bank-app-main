import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";
import "./LoginPage.css";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <div
      className="register-bg d-flex align-items-center justify-content-center min-vh-100"
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Background image with opacity */}
      <img
        src={process.env.PUBLIC_URL + "/assets/images/banner2.jpg"}
        alt="Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.25,
          zIndex: 0,
        }}
      />
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div
          className="login-card shadow rounded-4"
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 900,
            background: "rgba(255,255,255,0.95)",
            padding: "1.2rem 2rem 1rem 2rem",
            minHeight: "auto",
          }}
        >
          <div
            className="login-form-section w-100 d-flex flex-wrap justify-content-center align-items-start"
            style={{ gap: 24 }}
          >
            <div className="text-center mb-4 w-100">
              <h2 className="fw-bold mb-0" style={{ letterSpacing: 1 }}>
                Create Account
              </h2>
              <p className="text-muted small">Sign up to start using the Blood Bank App</p>
            </div>
            <div style={{ width: "100%", maxWidth: 800 }}>
              <Form
                formTitle={"Register"}
                submitBtn={"Sign Up"}
                formType={"register"}
                layout="horizontal"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
