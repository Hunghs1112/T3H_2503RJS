import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/WrapperTheme';

const UserInfo = () => {
  const { user, getCurrentUser, isAuthenticated, logout } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { colors } = useTheme();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!user) {
      getCurrentUser().then((result) => {
        if (!result.success) {
          setError(result.error || 'Không thể lấy thông tin người dùng');
          alert(result.error || 'Không thể lấy thông tin người dùng');
        }
      });
    }
  }, [isAuthenticated, getCurrentUser, navigate, user]);

  const handleLogout = () => {
    logout();
    alert('Đã đăng xuất thành công!');
    navigate('/login');
  };

  if (!user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.backgroundColor }}
      >
        <div className="text-center max-w-sm mx-auto px-6">
          <div
            className="w-16 h-16 mx-auto mb-6 rounded-full animate-spin"
            style={{ 
              background: `conic-gradient(from 0deg, ${colors.primary}, transparent, ${colors.primary})`,
              mask: 'radial-gradient(circle at center, transparent 40%, black 42%)'
            }}
          ></div>
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: colors.color }}
          >
            Đang tải thông tin
          </h2>
          <p
            className="text-sm opacity-70"
            style={{ color: colors.secondary }}
          >
            Vui lòng đợi trong giây lát...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      {/* Header Section */}
      <div
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}10)`,
          borderBottom: `1px solid ${colors.border}`
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center relative z-10">
            <div className="inline-block relative mb-6">
              <img
                src={user.image || 'https://dummyjson.com/icon/default/128'}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full object-cover mx-auto shadow-2xl"
                style={{ 
                  border: `4px solid ${colors.primary}30`,
                  boxShadow: `0 20px 40px ${colors.primary}20`
                }}
              />
              <div
                className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </div>
            </div>
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3"
              style={{ color: colors.color }}
            >
              {user.firstName} {user.lastName}
            </h1>
            <p
              className="text-base sm:text-lg opacity-80 mb-2"
              style={{ color: colors.secondary }}
            >
              @{user.username}
            </p>
            <p
              className="text-sm opacity-60"
              style={{ color: colors.secondary }}
            >
              ID: {user.id}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - User Details */}
          <div className="lg:col-span-2 space-y-6">
            {error && (
              <div
                className="p-4 rounded-xl border-l-4"
                style={{ 
                  backgroundColor: `${colors.primary}08`,
                  borderColor: colors.primary,
                  border: `1px solid ${colors.primary}20`
                }}
              >
                <p
                  className="font-medium text-center"
                  style={{ color: colors.primary }}
                >
                  {error}
                </p>
              </div>
            )}

            {/* Personal Information Card */}
            <div
              className="p-6 sm:p-8 rounded-2xl shadow-sm border"
              style={{ 
                backgroundColor: colors.inputBg,
                borderColor: colors.border
              }}
            >
              <h2
                className="text-xl sm:text-2xl font-bold mb-6 pb-4 border-b"
                style={{ 
                  color: colors.color,
                  borderColor: colors.border
                }}
              >
                Thông Tin Cá Nhân
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium uppercase tracking-wide opacity-70"
                    style={{ color: colors.secondary }}
                  >
                    Họ và Tên
                  </label>
                  <p
                    className="text-lg font-semibold p-4 rounded-xl border"
                    style={{ 
                      color: colors.color,
                      backgroundColor: colors.backgroundColor,
                      borderColor: colors.border
                    }}
                  >
                    {user.firstName} {user.lastName}
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium uppercase tracking-wide opacity-70"
                    style={{ color: colors.secondary }}
                  >
                    Tên Đăng Nhập
                  </label>
                  <p
                    className="text-lg font-semibold p-4 rounded-xl border"
                    style={{ 
                      color: colors.color,
                      backgroundColor: colors.backgroundColor,
                      borderColor: colors.border
                    }}
                  >
                    {user.username}
                  </p>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label
                    className="text-sm font-medium uppercase tracking-wide opacity-70"
                    style={{ color: colors.secondary }}
                  >
                    Địa Chỉ Email
                  </label>
                  <p
                    className="text-lg font-semibold p-4 rounded-xl border"
                    style={{ 
                      color: colors.color,
                      backgroundColor: colors.backgroundColor,
                      borderColor: colors.border
                    }}
                  >
                    {user.email}
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium uppercase tracking-wide opacity-70"
                    style={{ color: colors.secondary }}
                  >
                    Giới Tính
                  </label>
                  <p
                    className="text-lg font-semibold p-4 rounded-xl border"
                    style={{ 
                      color: colors.color,
                      backgroundColor: colors.backgroundColor,
                      borderColor: colors.border
                    }}
                  >
                    {user.gender === 'male' ? 'Nam' : user.gender === 'female' ? 'Nữ' : 'Khác'}
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium uppercase tracking-wide opacity-70"
                    style={{ color: colors.secondary }}
                  >
                    Số Điện Thoại
                  </label>
                  <p
                    className="text-lg font-semibold p-4 rounded-xl border"
                    style={{ 
                      color: colors.color,
                      backgroundColor: colors.backgroundColor,
                      borderColor: colors.border
                    }}
                  >
                    {user.phone || 'Chưa cập nhật'}
                  </p>
                </div>
              </div>
            </div>


          </div>

          {/* Right Column - Navigation & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              
              {/* Actions & Navigation Card */}
              <div
                className="p-6 rounded-2xl shadow-sm border"
                style={{ 
                  backgroundColor: colors.inputBg,
                  borderColor: colors.border
                }}
              >
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/settings')}
                    className="w-full p-4 rounded-xl font-semibold text-left transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    style={{ 
                      backgroundColor: colors.primary,
                      color: colors.inputText
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span>Cài Đặt Tài Khoản</span>
                      <span className="text-xs opacity-70">→</span>
                    </div>
                  </button>

                  <button
                    onClick={() => navigate('/cart')}
                    className="w-full p-4 rounded-xl font-semibold text-left transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    style={{ 
                      backgroundColor: colors.backgroundColor,
                      color: colors.color,
                      border: `2px solid ${colors.border}`
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span>Giỏ Hàng</span>
                      <span className="text-xs opacity-70">→</span>
                    </div>
                  </button>

                  <button
                    onClick={() => navigate('/orders')}
                    className="w-full p-4 rounded-xl font-semibold text-left transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    style={{ 
                      backgroundColor: colors.backgroundColor,
                      color: colors.color,
                      border: `2px solid ${colors.border}`
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span>Lịch Sử Đơn Hàng</span>
                      <span className="text-xs opacity-70">→</span>
                    </div>
                  </button>

                  <button
                    onClick={() => navigate('/')}
                    className="w-full p-4 rounded-xl font-semibold text-left transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    style={{ 
                      backgroundColor: colors.backgroundColor,
                      color: colors.primary,
                      border: `2px solid ${colors.primary}30`
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span>Về Trang Chủ</span>
                      <span className="text-xs opacity-70">←</span>
                    </div>
                  </button>

                  <div className="pt-3 mt-6 border-t"
                    style={{ borderColor: colors.border }}
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full p-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                      style={{ 
                        backgroundColor: colors.secondary,
                        color: colors.inputText
                      }}
                    >
                      Đăng Xuất Tài Khoản
                    </button>
                    

                
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;