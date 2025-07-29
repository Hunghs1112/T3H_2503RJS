import React, { useState } from 'react';
import { useTheme } from '../context/WrapperTheme.jsx';

// Sub-component for Payment Methods
const PaymentMethods = ({ methods = [], className = '' }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { colors } = useTheme();

  return (
    <div className={`grid grid-cols-4 gap-1 sm:gap-2 ${className}`}>
      {methods.map((method, index) => (
        <div
          key={index}
          className={`rounded-md p-1 sm:p-2 flex items-center justify-center transition-transform duration-200 ${
            hoveredIndex === index ? 'scale-105 border' : ''
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            backgroundColor: colors.inputBg,
            borderColor: hoveredIndex === index ? colors.primary : 'transparent',
          }}
        >
          <img
            src={method.src}
            alt={method.alt}
            className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
          />
        </div>
      ))}
    </div>
  );
};

const Footer = () => {
  const { colors } = useTheme();

  // Default payment methods (using placeholder images)
  const defaultPaymentMethods = [
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ7NLEhx9NXhhdHXQS4f8ypbiQRec72Zw_Rw&s', alt: 'Visa' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ7NLEhx9NXhhdHXQS4f8ypbiQRec72Zw_Rw&s', alt: 'MasterCard' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ7NLEhx9NXhhdHXQS4f8ypbiQRec72Zw_Rw&s', alt: 'PayPal' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ7NLEhx9NXhhdHXQS4f8ypbiQRec72Zw_Rw&s', alt: 'Momo' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ7NLEhx9NXhhdHXQS4f8ypbiQRec72Zw_Rw&s', alt: 'ZaloPay' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ7NLEhx9NXhhdHXQS4f8ypbiQRec72Zw_Rw&s', alt: 'Bank Transfer' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ7NLEhx9NXhhdHXQS4f8ypbiQRec72Zw_Rw&s', alt: 'Cash' },
  ];

  return (
    <footer
      className="py-6 sm:py-8 lg:py-10"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {/* Về chúng tôi */}
          <div>
            <h3
              className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"
              style={{ color: colors.color }}
            >
              Về chúng tôi
            </h3>
            <p
              className="text-sm sm:text-base mb-2"
              style={{ color: colors.secondary }}
            >
              Số điện thoại: 095.366.4722
            </p>
            <p
              className="text-sm sm:text-base"
              style={{ color: colors.secondary }}
            >
              Địa chỉ: Số 33 Nhân Chính, Trung Hòa, Cầu Giấy, Hà Nội
            </p>
          </div>

          {/* Phương thức thanh toán */}
          <div>
            <h3
              className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"
              style={{ color: colors.color }}
            >
              Phương thức thanh toán
            </h3>
            <PaymentMethods methods={defaultPaymentMethods} />
          </div>

          {/* Truyền thông xã hội */}
          <div>
            <h3
              className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"
              style={{ color: colors.color }}
            >
              Truyền thông xã hội
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <a
                href="https://facebook.com"
                className="flex items-center text-sm sm:text-base transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.secondary }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
              <a
                href="https://youtube.com"
                className="flex items-center text-sm sm:text-base transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.secondary }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Youtube
              </a>
            </div>
          </div>

          {/* Hỗ trợ khách hàng */}
          <div>
            <h3
              className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"
              style={{ color: colors.color }}
            >
              Hỗ trợ khách hàng
            </h3>
            <div
              className="space-y-2 sm:space-y-3 text-sm sm:text-base"
              style={{ color: colors.secondary }}
            >
              <p>Liên hệ Hotline: 036.555.1123</p>
              <p>Email: happy@gmail.com</p>
              <p>Địa chỉ: Số 33 Nhân Chính, Trung Hòa, Cầu Giấy, Hà Nội</p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div
          className="border-t mt-6 sm:mt-8 pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left"
          style={{ borderColor: colors.border }}
        >
          <div
            className="mb-4 sm:mb-0"
            style={{ color: colors.secondary }}
          >
            <p className="font-semibold text-sm sm:text-base">Công ty TNHH Minh Trí</p>
            <p className="text-xs sm:text-sm">Số CN/ĐPN/ cấp ngày 2/1/2020</p>
          </div>
          
          <div className="flex items-center">
            <div
              className="px-2 sm:px-3 py-1 rounded flex items-center"
              style={{ backgroundColor: colors.primary, color: colors.inputText }}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span className="text-xs sm:text-sm">ĐÃ THÔNG BÁO</span>
            </div>
            <p
              className="text-xs sm:text-sm ml-2"
              style={{ color: colors.secondary }}
            >
              © Thông báo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;