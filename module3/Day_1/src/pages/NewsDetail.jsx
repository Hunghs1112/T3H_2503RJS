import React from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../context/WrapperTheme.jsx";

const NewsDetail = () => {
  const { id } = useParams();
  const { colors } = useTheme();

  return (
    <div style={{ backgroundColor: colors.backgroundColor }}>
      <h2 style={{ color: colors.color }}>
        Đây là thông tin của người dùng có id là {id}
      </h2>
    </div>
  );
};

export default NewsDetail;