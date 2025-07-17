import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "./../../components/shared/Spinner";
import "./LoginPage.css";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <div className="login-bg d-flex align-items-center justify-content-center min-vh-100">
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="login-card shadow rounded-4">
          <div className="login-visual d-none d-lg-flex">
            <img src={process.env.PUBLIC_URL + "/assets/images/banner1.jpg"} alt="Visual" />
          </div>
          <div className="login-form-section w-100">
            <div className="text-center mb-4">
              <h2 className="fw-bold mb-0" style={{letterSpacing: 1}}>Welcome Back</h2>
              <p className="text-muted small">Sign in to your account</p>
            </div>
            <Form
              formTitle={"Login"}
              submitBtn={"Login"}
              formType={"login"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
