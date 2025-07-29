import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../hooks/useAuth.js';
import { useTheme } from '../context/WrapperTheme.jsx';

const BookPage = () => {
  const { isAuthenticated } = useAuth();
  const { colors } = useTheme();

  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
      notes: '',
      consultation: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Họ và tên là bắt buộc'),
      email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
      phone: Yup.string()
        .matches(/^[0-9]{10,11}$/, 'Số điện thoại phải có 10-11 chữ số')
        .required('Số điện thoại là bắt buộc'),
      date: Yup.date().required('Ngày tổ chức là bắt buộc').min(new Date(), 'Ngày phải từ hôm nay trở đi'),
      time: Yup.string().required('Giờ tổ chức là bắt buộc'),
      guests: Yup.number()
        .min(1, 'Số lượng khách phải lớn hơn 0')
        .required('Số lượng khách là bắt buộc'),
      notes: Yup.string(),
      consultation: Yup.boolean(),
    }),
    onSubmit: (values, { resetForm }) => {
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      bookings.push({ ...values, timestamp: new Date().toISOString() });
      localStorage.setItem('bookings', JSON.stringify(bookings));
      const consultationText = values.consultation
        ? 'Có yêu cầu tư vấn trọn gói'
        : 'Không yêu cầu tư vấn trọn gói';
      alert(
        `Đặt tiệc thành công!\n\nThông tin đã gửi:\n- Họ và Tên: ${values.name}\n- Email: ${values.email}\n- Số điện thoại: ${values.phone}\n- Ngày tổ chức: ${values.date}\n- Giờ tổ chức: ${values.time}\n- Số lượng khách: ${values.guests}\n- Ghi chú: ${values.notes || 'Không có'}\n- Tư vấn trọn gói: ${consultationText}`
      );
      resetForm();
    },
  });

  return (
    <div style={{ backgroundColor: colors.backgroundColor }}>
      {/* Hero Section */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-3xl sm:text-4xl font-bold mb-4 text-center"
            style={{ color: colors.color }}
          >
            Đặt Tiệc Cùng Nhà Hàng Của Sự Kết Nối
          </h1>
          <p
            className="text-base sm:text-lg mb-6 text-center"
            style={{ color: colors.secondary }}
          >
            Liên hệ và đặt tiệc dễ dàng cho mọi dịp đặc biệt tại nhà hàng của chúng tôi! Thưởng thức ẩm thực tinh tế và trải nghiệm không gian ấm cúng.
          </p>
        </div>
      </section>

      {/* Booking Form with Background Image */}
      <section
        className="py-8 sm:py-12 bg-cover bg-center"
        style={{ backgroundImage: `url('https://picsum.photos/800/400?random=1')` }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="max-w-2xl mx-auto bg-opacity-90 p-6 sm:p-8 rounded-lg shadow-md"
            style={{ backgroundColor: colors.inputBg }}
          >
            <h2
              className="text-xl sm:text-2xl font-semibold mb-6"
              style={{ color: colors.color }}
            >
              Form Đặt Tiệc
            </h2>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium"
                  style={{ color: colors.color }}
                >
                  Họ và Tên *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
                  placeholder="Nhập họ và tên"
                  style={{
                    backgroundColor: colors.inputBg,
                    color: colors.inputText,
                    borderColor: formik.touched.name && formik.errors.name ? colors.primary : colors.border,
                    outlineColor: colors.primary,
                  }}
                />
                {formik.touched.name && formik.errors.name && (
                  <p
                    className="mt-1 text-sm"
                    style={{ color: colors.primary }}
                  >
                    {formik.errors.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium"
                  style={{ color: colors.color }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
                  placeholder="Nhập email"
                  style={{
                    backgroundColor: colors.inputBg,
                    color: colors.inputText,
                    borderColor: formik.touched.email && formik.errors.email ? colors.primary : colors.border,
                    outlineColor: colors.primary,
                  }}
                />
                {formik.touched.email && formik.errors.email && (
                  <p
                    className="mt-1 text-sm"
                    style={{ color: colors.primary }}
                  >
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium"
                  style={{ color: colors.color }}
                >
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
                  placeholder="Nhập số điện thoại"
                  style={{
                    backgroundColor: colors.inputBg,
                    color: colors.inputText,
                    borderColor: formik.touched.phone && formik.errors.phone ? colors.primary : colors.border,
                    outlineColor: colors.primary,
                  }}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p
                    className="mt-1 text-sm"
                    style={{ color: colors.primary }}
                  >
                    {formik.errors.phone}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium"
                    style={{ color: colors.color }}
                  >
                    Ngày tổ chức *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
                    style={{
                      backgroundColor: colors.inputBg,
                      color: colors.inputText,
                      borderColor: formik.touched.date && formik.errors.date ? colors.primary : colors.border,
                      outlineColor: colors.primary,
                    }}
                  />
                  {formik.touched.date && formik.errors.date && (
                    <p
                      className="mt-1 text-sm"
                      style={{ color: colors.primary }}
                    >
                      {formik.errors.date}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium"
                    style={{ color: colors.color }}
                  >
                    Giờ tổ chức *
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formik.values.time}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
                    style={{
                      backgroundColor: colors.inputBg,
                      color: colors.inputText,
                      borderColor: formik.touched.time && formik.errors.time ? colors.primary : colors.border,
                      outlineColor: colors.primary,
                    }}
                  />
                  {formik.touched.time && formik.errors.time && (
                    <p
                      className="mt-1 text-sm"
                      style={{ color: colors.primary }}
                    >
                      {formik.errors.time}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="guests"
                  className="block text-sm font-medium"
                  style={{ color: colors.color }}
                >
                  Số lượng khách *
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  value={formik.values.guests}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  min="1"
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
                  placeholder="Nhập số lượng khách"
                  style={{
                    backgroundColor: colors.inputBg,
                    color: colors.inputText,
                    borderColor: formik.touched.guests && formik.errors.guests ? colors.primary : colors.border,
                    outlineColor: colors.primary,
                  }}
                />
                {formik.touched.guests && formik.errors.guests && (
                  <p
                    className="mt-1 text-sm"
                    style={{ color: colors.primary }}
                  >
                    {formik.errors.guests}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium"
                  style={{ color: colors.color }}
                >
                  Ghi chú thêm
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows="4"
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
                  placeholder="Yêu cầu đặc biệt về món ăn, đồ uống hoặc không gian"
                  style={{
                    backgroundColor: colors.inputBg,
                    color: colors.inputText,
                    borderColor: colors.border,
                    outlineColor: colors.primary,
                  }}
                ></textarea>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="consultation"
                  name="consultation"
                  checked={formik.values.consultation}
                  onChange={formik.handleChange}
                  className="h-4 w-4 focus:ring-2 rounded"
                  style={{
                    color: colors.primary,
                    borderColor: colors.border,
                    outlineColor: colors.primary,
                  }}
                />
                <label
                  htmlFor="consultation"
                  className="ml-2 block text-sm"
                  style={{ color: colors.color }}
                >
                  Nhận tư vấn trọn gói cho sự kiện
                </label>
              </div>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm text-sm sm:text-base"
                style={{
                  backgroundColor: formik.isSubmitting ? colors.secondary : colors.primary,
                  color: colors.inputText,
                }}
              >
                Gửi Đặt Tiệc
              </button>
            </form>
            {isAuthenticated && (
              <p
                className="mt-4 text-sm text-center"
                style={{ color: colors.secondary }}
              >
                Đã đăng nhập?{' '}
                <a
                  href="/profile"
                  className="hover:underline"
                  style={{ color: colors.primary }}
                >
                  Xem thông tin đặt tiệc của bạn
                </a>
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookPage;