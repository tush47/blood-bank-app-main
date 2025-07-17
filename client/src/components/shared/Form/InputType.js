import React from "react";
import { useState } from "react";

const InputType = ({
  labelText,
  labelFor,
  inputType,
  value,
  onChange,
  name,
  required = true, // assume required by default for registration/login
  // icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = inputType === "password";
  return (
    <>
      <div className="mb-3 position-relative">
        <label htmlFor={labelFor} className="form-label">
          {labelText}
          {required && (
            <>
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
              <span
                style={{ color: "#6366f1", marginLeft: 4, cursor: "pointer" }}
                title="This field is required"
              >
                ℹ️
              </span>
            </>
          )}
        </label>
        <div className="input-icon-wrapper">
          <input
            type={isPassword && showPassword ? "text" : inputType}
            className="form-control modern-input rounded-pill py-2 px-3"
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            id={labelFor}
            style={isPassword ? { paddingRight: 40 } : {}}
          />
          {isPassword && (
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#6366f1",
                fontSize: "1.2rem",
                zIndex: 2,
              }}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // Eye with slash SVG
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.06 10.06 0 0 1 12 20c-5.05 0-9.29-3.36-10.71-8a10.05 10.05 0 0 1 4.2-5.27m3.13-1.32A9.93 9.93 0 0 1 12 4c5.05 0 9.29 3.36 10.71 8a10.06 10.06 0 0 1-2.17 3.32M9.88 9.88A3 3 0 0 1 12 9c1.66 0 3 1.34 3 3 0 .42-.09.82-.24 1.18"/><path stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m1 1 22 22"/></svg>
              ) : (
                // Open eye SVG
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3" stroke="#6366f1" strokeWidth="2"/></svg>
              )}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default InputType;
