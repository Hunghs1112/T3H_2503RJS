import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Users, CreditCard, Book, FileText, Phone, MapPin, ChevronUp, ChevronDown, Play, X } from 'lucide-react';
import { useTheme } from '../context/WrapperTheme.jsx';

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState('2025-07-08');
  const [guestCount, setGuestCount] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { colors } = useTheme();

  // Hero section data
  const heroData = {
    slides: [
      {
        title: "ưu đãi lên tới 30%",
        subtitle: "khi đặt set menu sum vầy",
        description: "Áp dụng cho tiệc tại Hà Nội, từ 15/11 - 20/11/2021",
        image: 'https://intern-project-chi.vercel.app/static/media/bg1.da6d3327978f205184d6.jpg',
      },
      {
        title: "tiệc tại gia sang trọng",
        subtitle: "trải nghiệm ẩm thực đỉnh cao",
        description: "Phù hợp cho mọi dịp đặc biệt của bạn",
        image: 'https://intern-project-chi.vercel.app/static/media/bg1.da6d3327978f205184d6.jpg',
      },
      {
        title: "đặt tiệc dễ dàng",
        subtitle: "chỉ trong vài bước",
        description: "Tiện lợi, nhanh chóng, chuyên nghiệp",
        image: 'https://intern-project-chi.vercel.app/static/media/bg1.da6d3327978f205184d6.jpg',
      },
    ],
  };

  // Service types data
  const serviceTypes = [
    { name: "tiệc tại gia", col: "col-span-1" },
    { name: "tiệc cưới hỏi", col: "col-span-1" },
    { name: "tiệc buffet", col: "col-span-1" },
    { name: "tiệc sự kiện", col: "col-span-1" },
    { name: "tiệc tea break", col: "col-span-2" },
  ];

  // Booking steps data
  const bookingSteps = [
    {
      icon: <Book className="w-8 h-8" style={{ color: colors.color }} />,
      title: "tìm hiểu thông tin",
      description: "Khách hàng tìm hiểu thông tin và đăng ký tư vấn",
    },
    {
      icon: <FileText className="w-8 h-8" style={{ color: colors.color }} />,
      title: "liên hệ tư vấn",
      description: "Nhân viên liên hệ trong 2 tiếng để nhận thông tin",
    },
    {
      icon: <Users className="w-8 h-8" style={{ color: colors.color }} />,
      title: "ký kết hợp đồng",
      description: "Khách hàng tìm hiểu thông tin và đăng ký tư vấn",
    },
    {
      icon: <CreditCard className="w-8 h-8" style={{ color: colors.color }} />,
      title: "phục vụ tiệc",
      description: "Khách hàng tìm hiểu thông tin và đăng ký tư vấn",
    },
    {
      icon: <Book className="w-8 h-8" style={{ color: colors.color }} />,
      title: "thanh toán",
      description: "Khách hàng tìm hiểu thông tin và đăng ký tư vấn",
    },
  ];

  // Why choose us data
  const whyChooseUs = [
    {
      image: "https://intern-project-chi.vercel.app/static/media/bg1.da6d3327978f205184d6.jpg",
      title: "sự lựa chọn ẩm thực số 1",
      description: "Thuộc Golden Gate Group - 15 năm kinh nghiệm, hơn 400 nhà hàng toàn quốc",
    },
    {
      image: "https://intern-project-chi.vercel.app/static/media/bg2.682ad3017ba51acb4d80.jpg",
      title: "thực phẩm an toàn",
      description: "Đảm bảo an toàn vệ sinh thực phẩm từ nguồn cung cấp đến khâu chế biến",
    },
    {
      image: "https://intern-project-chi.vercel.app/static/media/bg3.cd94ec83ef439a755c40.jpg",
      title: "thực đơn đa dạng",
      description: "Menu phong phú, kết hợp tinh hoa ẩm thực Á - Âu, đa dạng lựa chọn",
    },
    {
      image: "https://intern-project-chi.vercel.app/static/media/bg4.63e3fbb06b475740c09e.jpg",
      title: "phục vụ chuyên nghiệp",
      description: "Tư vấn tận tâm, phục vụ chu đáo, dịch vụ linh hoạt, thanh toán tiện lợi",
    },
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroData.slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroData.slides.length]);

  const HeroSection = ({ data }) => (
    <div className="relative h-screen overflow-hidden">
      {/* Slider container */}
      <div className="relative h-full">
        <div 
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            width: `${data.slides.length * 100}%`,
            transform: `translateX(-${currentSlide * (100 / data.slides.length)}%)`
          }}
        >
          {data.slides.map((slide, index) => (
            <div
              key={index}
              className="relative h-full flex-shrink-0"
              style={{ width: `${100 / data.slides.length}%` }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${slide.image}')`,
                }}
              />
              
              {/* Dark overlay */}
              <div
                className="absolute inset-0"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              />
              
              {/* Content */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center px-4 max-w-4xl">
                  <h1
                    className="text-3xl sm:text-4xl md:text-6xl font-bold uppercase mb-4 tracking-wide animate-fadeInUp"
                    style={{ color: colors.inputText }}
                  >
                    {slide.title}
                  </h1>
                  <h2
                    className="text-xl sm:text-2xl md:text-3xl uppercase mb-6 font-medium animate-fadeInUp delay-300"
                    style={{ color: colors.inputText }}
                  >
                    {slide.subtitle}
                  </h2>
                  <p
                    className="text-base sm:text-lg mb-8 max-w-md mx-auto leading-relaxed animate-fadeInUp delay-500"
                    style={{ color: colors.inputText }}
                  >
                    {slide.description}
                  </p>
                  <button
                    className="px-8 py-3 rounded-lg text-lg font-semibold uppercase transition-all duration-300 transform hover:scale-105 animate-fadeInUp delay-700"
                    style={{ backgroundColor: colors.primary, color: colors.inputText }}
                  >
                    xem chi tiết ưu đãi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {data.slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'scale-125' 
                : 'hover:scale-110'
            }`}
            style={{
              backgroundColor: index === currentSlide ? colors.inputText : 'rgba(255,255,255,0.5)',
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + data.slides.length) % data.slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: colors.inputText }}
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % data.slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: colors.inputText }}
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );

  const AboutSection = () => (
    <div
      className="py-16"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: colors.color }}
            >
              Tiệc tại gia chất nhà hàng
            </h2>
            <div
              className="space-y-4 leading-relaxed"
              style={{ color: colors.secondary }}
            >
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quae fugit accusantium commodi esse modi pariatur praesentium, voluptas dolor ea qui? Vel dolore ipsam vitae voluptatem esse repellat nobis sint.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quae fugit accusantium commodi esse modi pariatur praesentium, voluptas dolor ea qui? Vel dolore ipsam vitae voluptatem esse repellat nobis sint.</p>
            </div>
            <button
              className="mt-8 inline-block px-8 py-3 rounded-lg uppercase font-semibold transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: colors.primary, color: colors.inputText }}
            >
              Xem chi tiết ưu đãi
            </button>
          </div>
          <div className="lg:w-1/2 relative">
            <img
              src="https://picsum.photos/600/400?random=8"
              alt="Restaurant dining"
              className="w-full h-auto rounded-lg shadow-xl"
            />
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="absolute inset-0 flex items-center justify-center transition-all duration-300 rounded-lg group"
              style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
              aria-label="Play video"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <Play
                  className="w-8 h-8 ml-1"
                  style={{ color: colors.inputText }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
        >
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-12 right-0 transition-colors"
              style={{ color: colors.inputText }}
              aria-label="Close video modal"
            >
              <X className="w-8 h-8" />
            </button>
            <iframe
              className="w-full h-64 sm:h-96 rounded-lg"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Restaurant video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );

  const BookingSteps = ({ steps }) => (
    <div
      className="py-16"
      style={{ backgroundColor: colors.inputBg }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl font-bold text-center mb-12"
          style={{ color: colors.color }}
        >
          5 Bước Để Đặt Tiệc
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center mb-8 md:mb-0 md:w-1/5 relative">
              <div className="relative mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-2 shadow-lg"
                  style={{ backgroundColor: colors.backgroundColor }}
                >
                  {step.icon}
                </div>
                <div
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                  style={{ backgroundColor: colors.primary, color: colors.inputText }}
                >
                  {index + 1}
                </div>
              </div>
              <h3
                className="font-semibold mb-2 uppercase"
                style={{ color: colors.color }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm px-2"
                style={{ color: colors.secondary }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const BookingSection = () => (
    <div
      className="py-12 bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://picsum.photos/1200/400?random=9')`,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="lg:w-1/2">
            <h2
              className="text-3xl font-bold mb-4 uppercase"
              style={{ color: colors.inputText }}
            >
              đặt tiệc ở đây
            </h2>
            <p
              className="text-lg mb-6 max-w-md"
              style={{ color: colors.inputText }}
            >
              Đặt tiệc ngay hôm nay để những sự kiện quan trọng của bạn trở nên đơn giản và dễ dàng hơn bao giờ hết
            </p>
          </div>
          <div className="lg:w-1/2 max-w-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center flex-1">
                <label
                  className="block text-sm font-medium mb-2 uppercase"
                  style={{ color: colors.inputText }}
                >
                  chọn ngày đặt
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full max-w-[140px] p-3 border rounded-lg text-center font-semibold focus:ring-2 focus:border-transparent"
                  style={{
                    backgroundColor: colors.inputBg,
                    color: colors.inputText,
                    borderColor: colors.border,
                    outlineColor: colors.primary,
                  }}
                />
              </div>
              <div className="text-center flex-1">
                <label
                  className="block text-sm font-medium mb-2 uppercase"
                  style={{ color: colors.inputText }}
                >
                  số bàn tiệc
                </label>
                <div className="flex items-center justify-center">
                  <span
                    className="text-2xl font-bold mr-4"
                    style={{ color: colors.inputText }}
                  >
                    {guestCount}
                  </span>
                  <div className="flex flex-col">
                    <button
                      onClick={() => setGuestCount((prev) => prev + 1)}
                      className="p-1 rounded transition-colors"
                      style={{ color: colors.inputText }}
                      aria-label="Increase guest count"
                    >
                      <ChevronUp className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setGuestCount((prev) => Math.max(0, prev - 1))}
                      className="p-1 rounded transition-colors"
                      style={{ color: colors.inputText }}
                      aria-label="Decrease guest count"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                <button
                  className="block py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 uppercase text-center"
                  style={{ backgroundColor: colors.primary, color: colors.inputText }}
                >
                  đặt tiệc ngay
                </button>
                <button
                  className="block py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 uppercase text-center"
                  style={{ backgroundColor: colors.secondary, color: colors.inputText }}
                >
                  xem thực đơn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ServicesSection = ({ services }) => (
    <div
      className="py-16"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Services and Contact */}
          <div className="space-y-8">
            {/* Services */}
            <div
              className="p-8 rounded-lg shadow-lg h-[calc(50%-1rem)] flex flex-col"
              style={{ backgroundColor: colors.inputBg }}
            >
              <h3
                className="text-2xl font-bold mb-6 text-center"
                style={{ color: colors.color }}
              >
                Dịch Vụ
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm flex-grow">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`${service.col} text-center py-2`}
                    style={{ color: colors.color }}
                  >
                    <span className="uppercase">{service.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div
              className="p-8 rounded-lg shadow-lg h-[calc(50%-1rem)] flex flex-col"
              style={{ backgroundColor: colors.inputBg }}
            >
              <h3
                className="text-2xl font-bold mb-6 text-center"
                style={{ color: colors.color }}
              >
                Liên Hệ
              </h3>
              <div
                className="space-y-4 flex-grow"
                style={{ color: colors.secondary }}
              >
                <div className="flex items-center">
                  <MapPin
                    className="w-5 h-5 mr-3"
                    style={{ color: colors.primary }}
                  />
                  <span>Address: abc@cmcglobal.vn</span>
                </div>
                <div className="flex items-center">
                  <Phone
                    className="w-5 h-5 mr-3"
                    style={{ color: colors.primary }}
                  />
                  <span>Hotline: 0919319071</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Set Menu */}
          <div
            className="relative bg-cover bg-center rounded-lg overflow-hidden shadow-lg group h-[512px]"
            style={{
              backgroundImage: `url('https://picsum.photos/400/300?random=10')`,
            }}
          >
            <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-300" />
            <div className="relative flex items-center justify-center h-full">
              <div className="text-center">
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: colors.inputText }}
                >
                  Set Menu
                </h3>
                <button
                  className="text-sm underline hover:no-underline transition-all"
                  style={{ color: colors.inputText }}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>

          {/* Column 3: Menu Tự Chọn */}
          <div
            className="relative bg-cover bg-center rounded-lg overflow-hidden shadow-lg group h-[512px]"
            style={{
              backgroundImage: `url('https://picsum.photos/400/300?random=11')`,
            }}
          >
            <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-300" />
            <div className="relative flex items-center justify-center h-full">
              <div className="text-center">
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: colors.inputText }}
                >
                  Menu Tự Chọn
                </h3>
                <button
                  className="text-sm underline hover:no-underline transition-all"
                  style={{ color: colors.inputText }}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const WhyChooseUs = ({ data }) => (
    <div
      className="py-16"
      style={{ backgroundColor: colors.inputBg }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl font-bold text-center mb-12"
          style={{ color: colors.color }}
        >
          vì sao lựa chọn chúng tôi?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((item, index) => (
            <div key={index} className="text-center group">
              <div className="mb-4 overflow-hidden rounded-lg shadow-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hoverimg:scale-105 transition-transform duration-300"
                />
              </div>
              <h3
                className="font-semibold mb-2 uppercase"
                style={{ color: colors.color }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: colors.secondary }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      <HeroSection data={heroData} />
      <AboutSection />
      <BookingSteps steps={bookingSteps} />
      <BookingSection />
      <ServicesSection services={serviceTypes} />
      <WhyChooseUs data={whyChooseUs} />
    </div>
  );
};

export default HomePage;