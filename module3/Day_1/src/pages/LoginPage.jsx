import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useTheme } from "../context/WrapperTheme.jsx";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { colors } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const result = await login(username, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      <div
        className="p-8 rounded-lg shadow-lg w-full max-w-md"
        style={{ backgroundColor: colors.inputBg }}
      >
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: colors.color }}
        >
          Đăng Nhập
        </h2>
        {error && (
          <p
            className="mb-4 text-center"
            style={{ color: colors.primary }}
          >
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium"
              style={{ color: colors.color }}
            >
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="Nhập tên đăng nhập"
              required
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
              className="block text-sm font-medium"
              style={{ color: colors.color }}
            >
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="Nhập mật khẩu"
              required
              style={{
                backgroundColor: colors.inputBg,
                color: colors.inputText,
                borderColor: colors.border,
                outlineColor: colors.primary,
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg font-medium transition-colors duration-200"
            style={{ backgroundColor: colors.primary, color: colors.inputText }}
          >
            Đăng Nhập
          </button>
        </form>
        <p
          className="mt-4 text-center text-sm"
          style={{ color: colors.secondary }}
        >
          Chưa có tài khoản?{" "}
          <a
            href="/register"
            className="font-medium"
            style={{ color: colors.primary }}
          >
            Đăng ký
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;