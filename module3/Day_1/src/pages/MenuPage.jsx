import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProduct';
import { useTheme } from '../context/WrapperTheme';
import { Star } from 'lucide-react';

const MenuPage = () => {
  const { products, loading, error, pagination, setPagination } = useProducts();
  const { colors } = useTheme();

  const handlePrevious = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };

  const handleNext = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, pagination.currentPage - delta);
      i <= Math.min(pagination.totalPages - 1, pagination.currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (pagination.currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (pagination.currentPage + delta < pagination.totalPages - 1) {
      rangeWithDots.push('...', pagination.totalPages);
    } else if (pagination.totalPages > 1) {
      rangeWithDots.push(pagination.totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      {/* Menu Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading && (
          <div className="text-center py-20">
            <div
              className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-t-transparent"
              style={{ borderColor: colors.primary }}
            ></div>
            <p
              className="text-xl font-medium"
              style={{ color: colors.secondary }}
            >
              Đang tải thực đơn...
            </p>
          </div>
        )}

        {error && (
          <div
            className="border-l-4 rounded-lg p-6 mb-12 max-w-2xl mx-auto"
            style={{ backgroundColor: colors.inputBg, borderColor: colors.primary }}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div
                  className="w-5 h-5"
                  style={{ color: colors.primary }}
                >
                  ⚠
                </div>
              </div>
              <div className="ml-3">
                <p
                  className="font-medium"
                  style={{ color: colors.primary }}
                >
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2
                className="text-4xl lg:text-5xl font-bold mb-4"
                style={{ color: colors.color }}
              >
                Bộ Sưu Tập Món Ăn
              </h2>
              <div
                className="w-24 h-1 mx-auto mb-6"
                style={{ backgroundColor: colors.primary }}
              ></div>
              <p
                className="text-xl max-w-2xl mx-auto leading-relaxed"
                style={{ color: colors.secondary }}
              >
                Mỗi món ăn là một tác phẩm nghệ thuật, được tạo nên từ đam mê và tài năng của đội ngũ đầu bếp chuyên nghiệp
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/menu/${product.id}`}
                  className="group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border hover:-translate-y-2"
                  style={{
                    backgroundColor: colors.inputBg,
                    borderColor: colors.border,
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.thumbnail || 'https://via.placeholder.com/400x300'}
                      alt={product.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    ></div>
                    <div className="absolute top-4 right-4">
                      <div
                        className="px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
                        style={{ backgroundColor: colors.primary, color: colors.inputText }}
                      >
                        Đặc biệt
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div
                        className="flex items-center"
                        style={{ color: colors.inputText }}
                      >
                        <Star
                          className="w-4 h-4 fill-current mr-1"
                          style={{ color: '#f4b400' }}
                        />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3
                      className="text-xl font-bold mb-3 line-clamp-2 transition-colors duration-300"
                      style={{ color: colors.color }}
                    >
                      {product.title}
                    </h3>
                    <p
                      className="mb-4 line-clamp-3 leading-relaxed text-sm"
                      style={{ color: colors.secondary }}
                    >
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div
                        className="text-2xl font-bold"
                        style={{ color: colors.primary }}
                      >
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(product.price * 23000)}
                      </div>
                      <div
                        className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{ backgroundColor: colors.inputBg, color: colors.secondary }}
                      >
                        /phần
                      </div>
                    </div>
                    <button
                      className="w-full mt-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      style={{ backgroundColor: colors.primary, color: colors.inputText }}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            {/* Enhanced Pagination */}
            <div className="flex flex-col items-center space-y-6">
              <div
                className="px-6 py-3 rounded-full shadow-md border"
                style={{
                  backgroundColor: colors.inputBg,
                  color: colors.secondary,
                  borderColor: colors.border,
                }}
              >
                <span className="font-medium">
                  Hiển thị {(pagination.currentPage - 1) * pagination.limit + 1} -{' '}
                  {Math.min(pagination.currentPage * pagination.limit, pagination.total)} trong tổng số{' '}
                  {pagination.total} món ăn
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {getVisiblePages().map((page, index) => (
                  <React.Fragment key={index}>
                    {page === '...' ? (
                      <span
                        className="px-4 py-2 font-medium"
                        style={{ color: colors.secondary }}
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        onClick={() => setPagination((prev) => ({ ...prev, currentPage: page }))}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 min-w-[44px] ${
                          pagination.currentPage === page
                            ? 'shadow-lg transform scale-110'
                            : 'border hover:shadow-md'
                        }`}
                        style={{
                          backgroundColor: pagination.currentPage === page ? colors.primary : colors.inputBg,
                          color: pagination.currentPage === page ? colors.inputText : colors.color,
                          borderColor: colors.border,
                        }}
                      >
                        {page}
                      </button>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuPage;