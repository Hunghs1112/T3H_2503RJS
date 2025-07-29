import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { useCart } from '../hooks/useCart';
import { useTheme } from '../context/WrapperTheme';
import { toast } from 'react-toastify';

const DishDetailPage = () => {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();
  const { colors } = useTheme();

  const handleBackToMenu = () => {
    navigate('/menu');
  };

  const handleAddToCart = async () => {
    await addToCart(Number(id), 1);
    // Toast is handled by CartContext.jsx
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: colors.backgroundColor }}
      >
        <div className="text-center">
          <div
            className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-transparent mb-4"
            style={{ borderColor: colors.primary }}
          ></div>
          <p
            className="text-lg"
            style={{ color: colors.secondary }}
          >
            Đang tải chi tiết món ăn...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: colors.backgroundColor }}
      >
        <div
          className="border rounded-lg p-8 max-w-md text-center"
          style={{ backgroundColor: colors.inputBg, borderColor: colors.border }}
        >
          <p
            className="font-medium text-lg"
            style={{ color: colors.primary }}
          >
            {error}
          </p>
          <button
            onClick={handleBackToMenu}
            className="mt-4 px-6 py-2 rounded-lg font-medium transition-colors"
            style={{ backgroundColor: colors.primary, color: colors.inputText }}
          >
            Quay lại thực đơn
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div style={{ backgroundColor: colors.backgroundColor }}>
      {/* Header */}
      <div className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={handleBackToMenu}
            className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-sm border transition-all duration-200px"
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: colors.inputText,
              borderColor: 'rgba(255,255,255,0.3)',
            }}
          >
            <span>←</span> Quay lại thực đơn
          </button>
          <h1
            className="text-3xl sm:text-4xl font-bold mb-2"
            style={{ color: colors.color }}
          >
            {product.title}
          </h1>
          <p
            className="text-lg"
            style={{ color: colors.secondary }}
          >
            Chi tiết món ăn cho tiệc của bạn
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:p-6 lg:p-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div
              className="rounded-2xl shadow-lg overflow-hidden"
              style={{ backgroundColor: colors.inputBg }}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index ? 'ring-2' : ''
                  }`}
                  style={{
                    borderColor: selectedImage === index ? colors.primary : colors.border,
                    ringColor: colors.primary,
                  }}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div
            className="rounded-2xl shadow-lg p-6 sm:p-8"
            style={{ backgroundColor: colors.inputBg }}
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: colors.secondary, color: colors.inputText }}
                >
                  🎉 Món tiệc
                </span>
                <div className="flex items-center gap-1">
                  <span style={{ color: '#f4b400' }}>⭐</span>
                  <span
                    className="text-sm"
                    style={{ color: colors.secondary }}
                  >
                    {product.rating} / 5
                  </span>
                </div>
              </div>
              <p
                className="text-lg leading-relaxed mb-6"
                style={{ color: colors.secondary }}
              >
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div
              className="rounded-xl p-6 mb-6"
              style={{ backgroundColor: colors.primary }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm mb-1"
                    style={{ color: colors.inputText }}
                  >
                    Giá tiệc
                  </p>
                  <p
                    className="text-3xl font-bold"
                    style={{ color: colors.inputText }}
                  >
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(product.price * 23000)}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: colors.inputText }}
                  >
                    / phần ăn
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className="text-sm"
                    style={{ color: colors.inputText }}
                  >
                    Phù hợp cho
                  </p>
                  <p
                    className="text-lg font-semibold"
                    style={{ color: colors.inputText }}
                  >
                    10-50 khách
                  </p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: colors.backgroundColor }}
              >
                <p
                  className="text-sm mb-1"
                  style={{ color: colors.secondary }}
                >
                  Danh mục
                </p>
                <p
                  className="font-medium"
                  style={{ color: colors.color }}
                >
                  {product.category}
                </p>
              </div>
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: colors.backgroundColor }}
              >
                <p
                  className="text-sm mb-1"
                  style={{ color: colors.secondary }}
                >
                  Thương hiệu
                </p>
                <p
                  className="font-medium"
                  style={{ color: colors.color }}
                >
                  {product.brand || 'Nhà hàng'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                style={{ backgroundColor: colors.primary, color: colors.inputText }}
              >
                🛒 Thêm vào giỏ hàng
              </button>
              <div className="flex gap-3">
                <button
                  className="flex-1 border-2 py-3 rounded-lg font-medium transition-colors"
                  style={{
                    backgroundColor: colors.inputBg,
                    color: colors.primary,
                    borderColor: colors.border,
                  }}
                >
                  💬 Liên hệ tư vấn
                </button>
                <button
                  className="flex-1 border-2 py-3 rounded-lg font-medium transition-colors"
                  style={{
                    backgroundColor: colors.inputBg,
                    color: colors.primary,
                    borderColor: colors.border,
                  }}
                >
                  ❤️ Yêu thích
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div
          className="rounded-2xl shadow-lg p-6 sm:p-8 mb-8"
          style={{ backgroundColor: colors.inputBg }}
        >
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: colors.color }}
          >
            Thông tin thêm
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: colors.backgroundColor }}
            >
              <div className="text-3xl mb-2">🍽️</div>
              <h3
                className="font-semibold mb-1"
                style={{ color: colors.color }}
              >
                Phục vụ tiệc
              </h3>
              <p
                className="text-sm"
                style={{ color: colors.secondary }}
              >
                Thích hợp cho mọi loại tiệc
              </p>
            </div>
            <div
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: colors.backgroundColor }}
            >
              <div className="text-3xl mb-2">⏰</div>
              <h3
                className="font-semibold mb-1"
                style={{ color: colors.color }}
              >
                Thời gian chuẩn bị
              </h3>
              <p
                className="text-sm"
                style={{ color: colors.secondary }}
              >
                30-45 phút
              </p>
            </div>
            <div
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: colors.backgroundColor }}
            >
              <div className="text-3xl mb-2">📞</div>
              <h3
                className="font-semibold mb-1"
                style={{ color: colors.color }}
              >
                Hỗ trợ 24/7
              </h3>
              <p
                className="text-sm"
                style={{ color: colors.secondary }}
              >
                Tư vấn đặt tiệc miễn phí
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetailPage;