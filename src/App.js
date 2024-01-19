import './App.css';
import ForgotPage from './pages/forgot/ForgotPage';
import LoginPage from './pages/login/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/forgot' element={<ForgotPage/>} />
      </Routes>      
    </BrowserRouter>
  );
}

export default App;
