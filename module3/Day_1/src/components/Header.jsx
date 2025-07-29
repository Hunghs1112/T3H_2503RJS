import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Search, User, ShoppingCart, Menu, X, Sun, Moon } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useTheme } from "../context/WrapperTheme";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const { theme, toggleTheme, colors } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
    navigate("/");
  };

  return (
    <header
      className="shadow-sm border-b sticky top-0 z-50 transition-colors duration-200"
      style={{ backgroundColor: colors.backgroundColor, borderColor: colors.border }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4 lg:space-x-8">
            <button
              className="lg:hidden p-2 transition-colors duration-200"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              style={{ color: colors.color }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="hidden lg:flex items-center space-x-4 lg:space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${isActive ? "font-semibold" : ""}`
                }
                style={({ isActive }) => ({
                  color: isActive ? colors.primary : colors.color,
                })}
                end
              >
                Trang Chủ
              </NavLink>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${isActive ? "font-semibold" : ""}`
                }
                style={({ isActive }) => ({
                  color: isActive ? colors.primary : colors.color,
                })}
              >
                Thực Đơn
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${isActive ? "font-semibold" : ""}`
                }
                style={({ isActive }) => ({
                  color: isActive ? colors.primary : colors.color,
                })}
              >
                Về Chúng Tôi
              </NavLink>
              <NavLink
                to="/news"
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${isActive ? "font-semibold" : ""}`
                }
                style={({ isActive }) => ({
                  color: isActive ? colors.primary : colors.color,
                })}
              >
                Tin Tức
              </NavLink>
              <NavLink
                to="/book"
                className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm"
                style={{ backgroundColor: colors.primary, color: colors.inputText }}
              >
                Đặt Tiệc Ngay
              </NavLink>
            </div>
          </div>
          <div className="flex items-center space-x-2 lg:space-x-4">
            <div className="flex items-center">
              <button
                className="md:hidden p-2 transition-colors duration-200"
                onClick={toggleSearch}
                aria-label="Toggle search"
                style={{ color: colors.color }}
              >
                <Search className="h-5 w-5" />
              </button>
              <div
                className={`${
                  isSearchOpen ? "block" : "hidden"
                } md:block absolute md:static top-16 left-0 w-full md:w-auto px-4 md:px-0 py-2 md:py-0 z-40 md:z-auto shadow-md md:shadow-none transition-colors duration-200`}
                style={{ backgroundColor: colors.backgroundColor }}
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm món ăn"
                    className="w-full md:w-40 lg:w-64 pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                    style={{
                      backgroundColor: colors.inputBg,
                      color: colors.inputText,
                      borderColor: colors.border,
                      outlineColor: colors.primary,
                    }}
                  />
                  <Search
                    className="absolute right-3 top-2.5 h-4 w-4"
                    style={{ color: colors.secondary }}
                  />
                </div>
              </div>
            </div>
            <button
              className="p-2 rounded-lg transition-colors duration-200"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{ color: colors.color }}
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <div className="relative" ref={dropdownRef}>
              <button
                className="p-2 rounded-lg transition-colors duration-200"
                onClick={toggleUserDropdown}
                aria-label="User menu"
                style={{ color: colors.color }}
              >
                <User className="h-5 w-5" />
              </button>
              {isUserDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 border rounded-lg shadow-lg z-50 transition-colors duration-200"
                  style={{ backgroundColor: colors.inputBg, borderColor: colors.border }}
                >
                  {isAuthenticated ? (
                    <div className="flex flex-col py-2">
                      <NavLink
                        to="/user-info"
                        className="px-4 py-2 transition-colors duration-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                        style={{ color: colors.color }}
                      >
                        Thông Tin Người Dùng
                      </NavLink>
                      {/* <NavLink
                        to="/orders"
                        className="px-4 py-2 transition-colors duration-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                        style={{ color: colors.color }}
                      >
                        Đơn Hàng
                      </NavLink> */}
                      <NavLink
                        to="/settings"
                        className="px-4 py-2 transition-colors duration-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                        style={{ color: colors.color }}
                      >
                        Cài Đặt
                      </NavLink>
                      <button
                        className="px-4 py-2 text-left transition-colors duration-200"
                        onClick={handleLogout}
                        style={{ color: colors.color }}
                      >
                        Đăng Xuất
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col py-2">
                      <NavLink
                        to="/login"
                        className="px-4 py-2 transition-colors duration-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                        style={{ color: colors.color }}
                      >
                        Đăng Nhập
                      </NavLink>
                      <NavLink
                        to="/register"
                        className="px-4 py-2 transition-colors duration-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                        style={{ color: colors.color }}
                      >
                        Đăng Ký
                      </NavLink>
                    </div>
                  )}
                </div>
              )}
            </div>
            <NavLink
              to="/cart"
              className="p-2 rounded-lg transition-colors duration-200 relative"
              style={{ color: colors.color }}
            >
              <ShoppingCart className="h-5 w-5" />
              {isAuthenticated && cart.items.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold"
                  style={{ backgroundColor: colors.primary, color: colors.inputText }}
                >
                  {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/book"
              className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm lg:hidden"
              style={{ backgroundColor: colors.primary, color: colors.inputText }}
            >
              Đặt Tiệc
            </NavLink>
          </div>
        </nav>
      </div>
      {isMenuOpen && (
        <div
          className="lg:hidden shadow-md absolute top-16 left-0 w-full z-40 transition-colors duration-200"
          style={{ backgroundColor: colors.backgroundColor }}
        >
          <div className="flex flex-col space-y-4 px-4 py-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 ${isActive ? "font-semibold" : ""}`
              }
              style={({ isActive }) => ({
                color: isActive ? colors.primary : colors.color,
              })}
              end
              onClick={toggleMenu}
            >
              Trang Chủ
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 ${isActive ? "font-semibold" : ""}`
              }
              style={({ isActive }) => ({
                color: isActive ? colors.primary : colors.color,
              })}
              onClick={toggleMenu}
            >
              Thực Đơn
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 ${isActive ? "font-semibold" : ""}`
              }
              style={({ isActive }) => ({
                color: isActive ? colors.primary : colors.color,
              })}
              onClick={toggleMenu}
            >
              Về Chúng Tôi
            </NavLink>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 ${isActive ? "font-semibold" : ""}`
              }
              style={({ isActive }) => ({
                color: isActive ? colors.primary : colors.color,
              })}
              onClick={toggleMenu}
            >
              Tin Tức
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;