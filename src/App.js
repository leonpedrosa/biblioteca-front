import './App.css';
import ForgotPage from './pages/forgot/ForgotPage';
import HomePage from './pages/home/Home';
import LoginPage from './pages/login/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/forgot' element={<ForgotPage/>} />
        <Route path='/home' element={<HomePage/>} />
      </Routes>      
    </BrowserRouter>
  );
}

export default App;
