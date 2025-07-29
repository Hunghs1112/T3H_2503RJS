import React from "react";
   import { Routes, Route, Navigate } from "react-router-dom";
   import { AuthProvider } from "./context/AuthContext.jsx";
   import { CartProvider } from "./context/CartContext.jsx";
   import { ThemeProvider } from "./context/WrapperTheme.jsx";
   import { ToastContainer } from 'react-toastify';
   import 'react-toastify/dist/ReactToastify.css';
   import MainLayout from "./layout/MainLayout";
   import HomePage from "./pages/HomePage";
   import AboutPage from "./pages/AboutPage";
   import NewsPage from "./pages/NewsPage";
   import NewsDetail from "./pages/NewsDetail";
   import BookPage from "./pages/BookPage";
   import MenuPage from "./pages/MenuPage";
   import DishDetailPage from "./pages/DishDetailPage";
   import LoginPage from "./pages/LoginPage";
   import RegisterPage from "./pages/RegisterPage";
   import UserInfo from "./pages/UserInfo.jsx";
   import CartPage from "./pages/CartPage.jsx";
   import { useAuth } from "./hooks/useAuth.js";

   const ProfilePage = () => (
     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
       <h1 className="text-3xl font-bold uppercase">Hồ Sơ</h1>
     </div>
   );

   const OrdersPage = () => (
     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
       <h1 className="text-3xl font-bold uppercase">Đơn Hàng</h1>
     </div>
   );

   const SettingsPage = () => (
     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
       <h1 className="text-3xl font-bold uppercase">Cài Đặt</h1>
     </div>
   );

   const ProtectedRoute = ({ children }) => {
     const { isAuthenticated } = useAuth();
     return isAuthenticated ? children : <Navigate to="/login" replace />;
   };

   const NotFound = () => (
     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
       <h1 className="text-3xl font-bold uppercase">404 Not Found</h1>
     </div>
   );

   function App() {
     return (
       <AuthProvider>
         <CartProvider>
           <ThemeProvider>
             <Routes>
               <Route path="/" element={<MainLayout />}>
                 <Route index element={<HomePage />} />
                 <Route path="about" element={<AboutPage />}>
                   <Route path="me" element={<h1 className="text-3xl font-bold uppercase">About Me</h1>} />
                 </Route>
                 <Route path="news" element={<NewsPage />} />
                 <Route path="news/:id" element={<NewsDetail />} />
                 <Route path="book" element={<BookPage />} />
                 <Route path="menu" element={<MenuPage />} />
                 <Route path="menu/:id" element={<DishDetailPage />} />
                 <Route path="cart" element={<CartPage />} />
                 <Route path="login" element={<LoginPage />} />
                 <Route path="register" element={<RegisterPage />} />
                 <Route
                   path="profile"
                   element={
                     <ProtectedRoute>
                       <ProfilePage />
                     </ProtectedRoute>
                   }
                 />
                 <Route
                   path="orders"
                   element={
                     <ProtectedRoute>
                       <OrdersPage />
                     </ProtectedRoute>
                   }
                 />
                 <Route
                   path="settings"
                   element={
                     <ProtectedRoute>
                       <SettingsPage />
                     </ProtectedRoute>
                   }
                 />
                 <Route
                   path="user-info"
                   element={
                     <ProtectedRoute>
                       <UserInfo />
                     </ProtectedRoute>
                   }
                 />
                 <Route path="*" element={<NotFound />} />
               </Route>
             </Routes>
             <ToastContainer
               position="top-right"
               autoClose={3000}
               hideProgressBar={false}
               closeOnClick
               pauseOnHover
               theme="colored"
             />
           </ThemeProvider>
         </CartProvider>
       </AuthProvider>
     );
   }

   export default App;