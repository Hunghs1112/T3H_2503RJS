import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "../context/WrapperTheme.jsx";

const NewsPage = () => {
  const navigate = useNavigate();
  const { colors } = useTheme();

  const handleShowDetail = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <div style={{ backgroundColor: colors.backgroundColor }}>
      <ul>
        <li>
          Đăng -{" "}
          <button
            className="border rounded p-1 cursor-pointer transition-all"
            onClick={() => handleShowDetail(1)}
            style={{
              borderColor: colors.border,
              color: colors.color,
              backgroundColor: colors.inputBg,
            }}
          >
            Xem chi tiết
          </button>
        </li>
        <br />
        <li>
          Dương -{" "}
          <button
            className="border rounded p-1 cursor-pointer transition-all"
            onClick={() => handleShowDetail(2)}
            style={{
              borderColor: colors.border,
              color: colors.color,
              backgroundColor: colors.inputBg,
            }}
          >
            Xem chi tiết
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NewsPage;