import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BundesTable, LaLigaTable, LoginPage, PremierTable, RegisterPage, SerieATable } from "./pages/";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";

import './index.css'
import ProtectedRoute from "./components/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import LiveGames from "./components/LiveGames";

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
            <Route path="/home" element={<HomePage />} />
            <Route path="/premier-league" element={<PremierTable />} />
            <Route path="/la-liga" element={<LaLigaTable />} />
            <Route path="/bundesliga" element={<BundesTable />} />
            <Route path="/serie-a" element={<SerieATable />} />
            <Route path="/live" element={<LiveGames />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
