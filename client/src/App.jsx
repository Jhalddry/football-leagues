import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage, RegisterPage } from './pages/'
import Navbar from './components/Navbar'

export const App = () => {
  return (
    <BrowserRouter>

      <Navbar />
      
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

      </Routes>
    
    </BrowserRouter>
  )
}