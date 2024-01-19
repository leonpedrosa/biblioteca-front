import './Login.css'
import TextField from '@mui/material/TextField'
// import InputLabel from '@mui/material/InputLabel'
// import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import { Email } from '@mui/icons-material';


function LoginPage() {
    const [loading, setLoading] = useState(false)
    // const handleButtonClick = () => {
    //     // Aqui você pode realizar as ações desejadas ao clicar no botão.
    //     // Por exemplo, fazer uma requisição assíncrona, etc.
    //     // Quando a ação for concluída, você pode definir setLoading(false) para parar o estado de carregamento.
    //     setLoading(false);

    //     // Simulando uma ação assíncrona (pode ser uma requisição AJAX, etc.)
    //     setTimeout(() => {
    //         // Após a conclusão da ação, você pode parar o estado de carregamento.
    //         setLoading(false);
    //     }, 2000);
    // };

    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const navigate = useNavigate();
    const requestLogin = () => {
        // console.log('Email: ', Email)
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = (e) => {
        console.log(e.target.value)        
        // const { name, value } = e.target;
        // console.log(name.value)
        // if (name === 'email') {
        //     setEmail(value);
        // } else if (name === 'password') {
        //     setPassword(value);
        // }
    }

    return (
        <div className='Container'>
            <div className='Login'>
                <TextField 
                    className="InputLogin" 
                    variant='outlined' 
                    label="Email" 
                    id="inputLoginEmail"
                    type='email'
                    onChange={handleInputChange}
                    value={email}
                    name="email"
                    autoFocus
                /> 
                <TextField 
                    className="InputLogin" 
                    variant='outlined' 
                    label="Password" 
                    id="inputLoginPassword"      
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: 
                            <InputAdornment position='end'>
                                <IconButton
                                aria-label='toggle password visibility'
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>                        
                    }}                          
                />
                <Button 
                    type='submit' 
                    variant="outlined"
                    onClick={requestLogin}
                >
                    Login
                </Button>

                
                <Button                    
                    disabled={false}
                    size="small"
                    href="/forgot"
                    variant='text'
                    style={{fontSize: '3pt', color: 'gray'}}
                    
                >
                    Esqueci minha senha
                </Button>
            </div>
        </div>
    );
}

export default LoginPage;