import './App.css';
import ForgotPage from './pages/forgot/ForgotPage';
import SuperHomePage from './pages/home/SuperAdminHome';
import AdminHomePage from './pages/home/AdminHome';
import LoginPage from './pages/login/LoginPage';
import NotFoundPage from './pages/NotFound.js'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') !== null);
  console.log(isAuthenticated)
  
    return (    
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/' element={<LoginPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/forgot' element={<ForgotPage/>} />
          
          <Route 
          path='/superhome' 
          element={ isAuthenticated ? <SuperHomePage /> : <Navigate to='/login' /> } 
          />          
          
          <Route 
          path='/adminhome' 
          element={ isAuthenticated ? <AdminHomePage/> : <Navigate to='/login' />} 
          />

        </Routes>      
      </BrowserRouter>
    );
  }

export default App;
