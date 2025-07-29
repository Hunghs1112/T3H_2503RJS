import React, { useState } from "react";
import { Play, Heart, Users, Calendar, Coffee, Utensils, Clock } from "lucide-react";
import { useTheme } from "../context/WrapperTheme.jsx";

const AboutPage = () => {
  const { colors } = useTheme();

  // Video section data
  const [videoData] = useState({
    title: "SỰ LỰA CHỌN ẨM",
    subtitle: "THỰC SỐ 1",
    buttonText: "XEM HÌNH ẢNH TIỆC",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  });

  // Statistics data
  const [statsData] = useState([
    { number: "80+", label: "MÓN ĂN ĐA DẠNG 1", icon: <Utensils className="w-6 h-6" style={{ color: colors.primary }} /> },
    { number: "6+", label: "SET MENU TIÊU CHUẨN", icon: <Coffee className="w-6 h-6" style={{ color: colors.primary }} /> },
    { number: "15+", label: "NĂM KINH NGHIỆM", icon: <Calendar className="w-6 h-6" style={{ color: colors.primary }} /> },
    { number: "100+", label: "NHÂN VIÊN CHUYÊN NGHIỆP", icon: <Users className="w-6 h-6" style={{ color: colors.primary }} /> }
  ]);

  // Services data
  const [servicesData] = useState([
    {
      icon: <Heart className="w-8 h-8" style={{ color: colors.primary }} />,
      title: "TIỆC TẠI GIA",
      description: "Tiết kiệm thời gian cho bữa tiệc ấm cúng, dành trọn khoảnh khắc sum vầy bên người thân yêu - Bạn chỉ cần lựa chọn thực đơn yêu thích, Tiệc tại gia sẽ mang trải nghiệm trọn vẹn đến với gia đình"
    },
    {
      icon: <Utensils className="w-8 h-8" style={{ color: colors.primary }} />,
      title: "TIỆC BUFFET",
      description: "Tiệc buffet với nhiều lựa chọn thực đơn đa dạng dành cho các sự kiện lớn nhỏ, từ các hoạt động mở và có nhiều thời gian như gala dinner đến liên hoan nội bộ hay tiệc gia đình."
    },
    {
      icon: <Coffee className="w-8 h-8" style={{ color: colors.primary }} />,
      title: "TIỆC TEA BREAK",
      description: "Tea break được tổ chức dưới hình thức tiệc đứng với trà, bánh ngọt, và hoa quả, diễn ra vào giữa giờ giải lao của các buổi hội nghị, khai trương... giúp khách mời có khoảng thời gian thư giãn trước khi tiếp tục tham dự sự kiện."
    },
    {
      icon: <Clock className="w-8 h-8" style={{ color: colors.primary }} />,
      title: "TIỆC CƯỚI HỎI",
      description: "Sự kiện đặc biệt, không thể thiếu đội ngũ tận tâm. Với thực đơn phong phú từ truyền thống tới hiện đại, cùng đội ngũ phục vụ chuyên nghiệp, Tiệc tại gia sẽ đồng hành cùng bạn và gia đình trong ngày vui một cách trọn vẹn nhất"
    },
    {
      icon: <Calendar className="w-8 h-8" style={{ color: colors.primary }} />,
      title: "TIỆC SỰ KIỆN",
      description: "Tiệc tại gia sẽ giúp bạn lo chu toàn các sự kiện lớn cho công ty, hội thao cần sự chỉn chu từ khâu chuẩn bị tới quy trình phục vụ chuyên nghiệp, đảm bảo hình ảnh mọi khách hàng tham dự"
    }
  ]);

  // Food service categories
  const [foodCategories] = useState([
    {
      image: "/api/placeholder/400/300",
      title: "THỰC PHẨM AN TOÀN CHẤT LƯỢNG NHÀ HÀNG",
    },
    {
      image: "/api/placeholder/400/300",
      title: "DỊCH VỤ CHU ĐÁO CHĂM SÓC TẬN TÂM",
    },
    {
      image: "/api/placeholder/400/300",
      title: "ĐỒNG HÀNH TRONG MỌI LỰA CHỌN ẨM THỰC",
    }
  ]);

  // Reusable components
  const StatCard = ({ stat }) => (
    <div className="text-center" style={{ color: colors.inputText }}>
      <div className="flex justify-center mb-2">{stat.icon}</div>
      <div
        className="text-4xl md:text-5xl font-bold mb-2"
        style={{ color: colors.inputText }}
      >
        {stat.number}
      </div>
      <div
        className="text-sm md:text-base font-medium"
        style={{ color: colors.inputText }}
      >
        {stat.label}
      </div>
    </div>
  );

  const ServiceCard = ({ service }) => (
    <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 p-4">
      <div className="flex-shrink-0">{service.icon}</div>
      <div>
        <h3
          className="text-lg md:text-xl font-bold mb-2"
          style={{ color: colors.color }}
        >
          {service.title}
        </h3>
        <p
          className="text-sm md:text-base leading-relaxed"
          style={{ color: colors.secondary }}
        >
          {service.description}
        </p>
      </div>
    </div>
  );

  const FoodCategoryCard = ({ category }) => (
    <div className="relative group overflow-hidden rounded-lg shadow-lg">
      <img
        src={category.image}
        alt={category.title}
        className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <h3
          className="text-lg md:text-xl font-bold text-center px-4 leading-tight"
          style={{ color: colors.inputText }}
        >
          {category.title}
        </h3>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      {/* Hero Section with Video */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div>
                <h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
                  style={{ color: colors.color }}
                >
                  {videoData.title}
                </h1>
                <h2
                  className="text-xl md:text-2xl lg:text-3xl font-semibold"
                  style={{ color: colors.secondary }}
                >
                  {videoData.subtitle}
                </h2>
              </div>
              <button
                className="px-6 py-3 md:px-8 md:py-4 rounded-lg font-medium text-sm md:text-base transition-colors duration-200"
                style={{ backgroundColor: colors.primary, color: colors.inputText }}
              >
                {videoData.buttonText}
              </button>
            </div>

            {/* Right Video Player */}
            <div className="relative">
              <div
                className="aspect-video rounded-lg overflow-hidden"
                style={{ backgroundColor: colors.backgroundColor }}
              >
                <iframe
                  src={videoData.videoUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title="Video Player"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lorem Ipsum Content */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            style={{ color: colors.secondary }}
          >
            <div className="space-y-4">
              <p className="text-sm md:text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porta ante dui, nec condimentum diam auctor nec. sInteger auctor turpis odio, eu lacinia lorem ultricies at. Morbi maximus in sem vitae tempor. Donec dictum lectus et bibendum faucibus. Integer mollis arcu sit amet mollis blandit.
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porta ante dui, nec condimentum diam auctor nec. sInteger auctor turpis odio, eu lacinia lorem ultricies at. Morbi maximus in sem vitae tempor. Donec dictum lectus et bibendum faucibus. Integer mollis arcu sit amet mollis blandit. Nulla imperdiet molestie nunc. Curabitur consectetur nulla massa, sed vehicula mi dictum in.
              </p>
            </div>
            <div>
              <p className="text-sm md:text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porta ante dui, nec condimentum diam auctor nec. sInteger auctor turpis odio, eu lacinia lorem ultricies at. Morbi maximus in sem vitae tempor. Donec dictum lectus et bibendum faucibus. Integer mollis arcu sit amet mollis blandit. Nulla imperdiet molestie nunc. Curabitur consectetur nulla massa, sed vehicula mi dictum in.
              </p>
              <p className="text-sm md:text-base leading-relaxed mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porta ante dui, nec condimentum diam auctor nec. sInteger auctor turpis odio, eu lacinia lorem ultricies at. Morbi maximus in sem vitae tempor. Donec dictum lectus et bibendum faucibus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative py-16 md:py-20">
        <div
          className="absolute inset-0"
          style={{ backgroundColor: colors.primary }}
        ></div>
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: colors.inputText }}
            >
              TIỆC TẠI GIA
            </h2>
            <h3
              className="text-xl md:text-2xl"
              style={{ color: colors.inputText }}
            >
              CHẤT NHÀ HÀNG
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        className="py-16 md:py-20"
        style={{ backgroundColor: colors.backgroundColor }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: colors.color }}
            >
              DỊCH VỤ CUNG CẤP
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesData.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Food Categories Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: colors.color }}
            >
              TÔN CHỈ PHỤC VỤ
            </h2>
            <p
              className="max-w-2xl mx-auto"
              style={{ color: colors.secondary }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porta ante dui, nec condimentum diam auctor nec. sInteger auctor turpis odio, eu lacinia lorem ultricies at.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodCategories.map((category, index) => (
              <FoodCategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;