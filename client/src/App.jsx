import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage } from "./pages/";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";

import './index.css'
import ProtectedRoute from "./components/ProtectedRoute";

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Catch all route */}
          <Route path="*" element={<LoginPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
