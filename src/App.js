import './App.css';
import ForgotPage from './pages/forgot/ForgotPage';
import AdminHomePage from './pages/home/AdminHome';
import LoginPage from './pages/login/LoginPage';
import NotFoundPage from './pages/NotFound.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/' element={<LoginPage/>} />
        <Route path='/forgot' element={<ForgotPage/>} />
        <Route path='/adminhome' element={<AdminHomePage/>} />
      </Routes>      
    </BrowserRouter>
  );
}

export default App;
