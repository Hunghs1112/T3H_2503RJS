import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login as loginApi, refreshToken as refreshTokenApi, getCurrentUser as getCurrentUserApi } from '../api/authApi';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { setIsAuthenticated, setUser } = context;

  const login = async (username, password) => {
    try {
      const response = await loginApi(username, password);
      if (response.status === 200) {
        const userData = {
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          gender: response.data.gender,
          image: response.data.image,
          // Include other fields as needed
        };
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
        toast.success('Đăng nhập thành công!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        return { success: true, data: userData };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('cart'); // Clear cart on logout
    setIsAuthenticated(false);
    setUser(null);
    toast.success('Đã đăng xuất thành công!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      const response = await refreshTokenApi(refreshToken);
      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        return { success: true, data: response.data };
      }
    } catch (error) {
      logout();
      const errorMessage = error.response?.data?.message || 'Làm mới token thất bại. Vui lòng đăng nhập lại.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return { success: false, error: errorMessage };
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await getCurrentUserApi();
      if (response.status === 200) {
        const userData = {
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          gender: response.data.gender,
          image: response.data.image,
          // Include other fields as needed
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, data: userData };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Không thể lấy thông tin người dùng.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return { success: false, error: errorMessage };
    }
  };

  return { ...context, login, logout, refreshToken, getCurrentUser };
};