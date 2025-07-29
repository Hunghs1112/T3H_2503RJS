import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useTheme } from "../context/WrapperTheme.jsx";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { colors } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[email]) {
      setError("Email này đã được đăng ký!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp!");
      return;
    }
    users[email] = { email, password };
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify({ email }));
    login();
    setError("");
    navigate("/");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2
            className="text-center text-3xl font-bold uppercase"
            style={{ color: colors.color }}
          >
            Đăng Ký
          </h2>
          <p
            className="mt-2 text-center text-sm"
            style={{ color: colors.secondary }}
          >
            Tạo tài khoản để đặt tiệc dễ dàng hơn
          </p>
        </div>
        <div
          className="p-8 rounded-lg shadow-lg"
          style={{ backgroundColor: colors.inputBg }}
        >
          <div className="space-y-6">
            {error && (
              <p
                className="text-center text-sm"
                style={{ color: colors.primary }}
              >
                {error}
              </p>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium uppercase"
                style={{ color: colors.color }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                placeholder="Nhập email của bạn"
                style={{
                  backgroundColor: colors.inputBg,
                  color: colors.inputText,
                  borderColor: colors.border,
                  outlineColor: colors.primary,
                }}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium uppercase"
                style={{ color: colors.color }}
              >
                Mật Khẩu
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                placeholder="Nhập mật khẩu"
                style={{
                  backgroundColor: colors.inputBg,
                  color: colors.inputText,
                  borderColor: colors.border,
                  outlineColor: colors.primary,
                }}
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium uppercase"
                style={{ color: colors.color }}
              >
                Xác Nhận Mật Khẩu
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                placeholder="Xác nhận mật khẩu"
                style={{
                  backgroundColor: colors.inputBg,
                  color: colors.inputText,
                  borderColor: colors.border,
                  outlineColor: colors.primary,
                }}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 shadow-sm uppercase"
              style={{ backgroundColor: colors.primary, color: colors.inputText }}
            >
              Đăng Ký
            </button>
            <p
              className="text-center text-sm"
              style={{ color: colors.secondary }}
            >
              Đã có tài khoản?{" "}
              <NavLink
                to="/login"
                className="hover:underline"
                style={{ color: colors.primary }}
              >
                Đăng Nhập
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;