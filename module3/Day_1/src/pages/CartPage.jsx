import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useTheme } from '../context/WrapperTheme';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';

const CartPage = () => {
  const { cart, updateCartItem, removeFromCart, clearCart } = useCart();
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [loadingItems, setLoadingItems] = useState({}); // Track loading state per item

  // Debounced update function to limit API calls
  const debouncedUpdateCartItem = useCallback(
    debounce(async (productId, quantity) => {
      try {
        setLoadingItems((prev) => ({ ...prev, [productId]: true }));
        await updateCartItem(productId, quantity);
        toast.success(`Cập nhật số lượng thành công!`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          style: {
            backgroundColor: colors.inputBg,
            color: colors.color,
            border: `1px solid ${colors.border}`,
          },
        });
      } catch (error) {
        toast.error('Lỗi khi cập nhật số lượng. Vui lòng thử lại.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          style: {
            backgroundColor: colors.inputBg,
            color: colors.primary,
            border: `1px solid ${colors.border}`,
          },
        });
      } finally {
        setLoadingItems((prev) => ({ ...prev, [productId]: false }));
      }
    }, 300),
    [updateCartItem, colors]
  );

  const handleRemoveItem = async (productId, title) => {
    if (!window.confirm(`Bạn có chắc muốn xóa "${title}" khỏi giỏ hàng?`)) return;
    try {
      setLoadingItems((prev) => ({ ...prev, [productId]: true }));
      await removeFromCart(productId);
      toast.success(`Đã xóa "${title}" khỏi giỏ hàng!`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        style: {
          backgroundColor: colors.inputBg,
          color: colors.color,
          border: `1px solid ${colors.border}`,
        },
      });
    } catch (error) {
      toast.error('Lỗi khi xóa sản phẩm. Vui lòng thử lại.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        style: {
          backgroundColor: colors.inputBg,
          color: colors.primary,
          border: `1px solid ${colors.border}`,
        },
      });
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleCheckout = async () => {
    try {
      await clearCart();
      toast.success('Thanh toán thành công!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        style: {
          backgroundColor: colors.inputBg,
          color: colors.color,
          border: `1px solid ${colors.border}`,
        },
      });
      navigate('/menu');
    } catch (error) {
      toast.error('Lỗi khi thanh toán. Vui lòng thử lại.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        style: {
          backgroundColor: colors.inputBg,
          color: colors.primary,
          border: `1px solid ${colors.border}`,
        },
      });
    }
  };

  if (!cart.items.length) {
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
            Giỏ hàng trống.
          </p>
          <button
            onClick={() => navigate('/menu')}
            className="mt-4 px-6 py-2 rounded-lg font-medium transition-colors"
            style={{ backgroundColor: colors.primary, color: colors.inputText }}
          >
            Quay lại thực đơn
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      <div className="container mx-auto">
        <h1
          className="text-3xl sm:text-4xl font-bold mb-8 text-center"
          style={{ color: colors.color }}
        >
          Giỏ Hàng
        </h1>
        <div
          className="rounded-2xl shadow-lg p-6 sm:p-8 mb-8"
          style={{ backgroundColor: colors.inputBg }}
        >
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4"
                style={{ borderColor: colors.border }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.thumbnail || 'https://via.placeholder.com/80'}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: colors.color }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: colors.secondary }}
                    >
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(item.price * 23000)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => debouncedUpdateCartItem(item.id, Math.max(1, item.quantity - 1))}
                      className="px-2 py-1 border rounded-lg disabled:opacity-50"
                      style={{ borderColor: colors.border, color: colors.color }}
                      disabled={loadingItems[item.id] || item.quantity <= 1}
                    >
                      {loadingItems[item.id] ? (
                        <div
                          className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent"
                          style={{ borderColor: colors.primary }}
                        ></div>
                      ) : (
                        '−'
                      )}
                    </button>
                    <span style={{ color: colors.color }}>{item.quantity}</span>
                    <button
                      onClick={() => debouncedUpdateCartItem(item.id, item.quantity + 1)}
                      className="px-2 py-1 border rounded-lg disabled:opacity-50"
                      style={{ borderColor: colors.border, color: colors.color }}
                      disabled={loadingItems[item.id]}
                    >
                      {loadingItems[item.id] ? (
                        <div
                          className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent"
                          style={{ borderColor: colors.primary }}
                        ></div>
                      ) : (
                        '+'
                      )}
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id, item.title)}
                    className="text-sm disabled:opacity-50"
                    style={{ color: colors.primary }}
                    disabled={loadingItems[item.id]}
                  >
                    {loadingItems[item.id] ? (
                      <div
                        className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent"
                        style={{ borderColor: colors.primary }}
                      ></div>
                    ) : (
                      'Xóa'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <p
              className="text-lg font-semibold"
              style={{ color: colors.color }}
            >
              Tổng cộng:{' '}
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(cart.total * 23000)}
            </p>
            <button
              onClick={handleCheckout}
              className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50"
              style={{ backgroundColor: colors.primary, color: colors.inputText }}
              disabled={Object.values(loadingItems).some((loading) => loading)}
            >
              Thanh Toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;