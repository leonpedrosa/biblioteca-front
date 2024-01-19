import './Login.css'
import TextField from '@mui/material/TextField'
// import InputLabel from '@mui/material/InputLabel'
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import { Alert, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


function LoginPage() {
    const [loading, setLoading] = useState(false)
    const handleButtonClick = () => {
        // Aqui você pode realizar as ações desejadas ao clicar no botão.
        // Por exemplo, fazer uma requisição assíncrona, etc.
        // Quando a ação for concluída, você pode definir setLoading(false) para parar o estado de carregamento.
        setLoading(false);

        // Simulando uma ação assíncrona (pode ser uma requisição AJAX, etc.)
        setTimeout(() => {
            // Após a conclusão da ação, você pode parar o estado de carregamento.
            setLoading(false);
        }, 2000);
    };

    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const navigate = useNavigate();
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [token, setToken] = useState('');
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = (e) => {        
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }

    const requestLogin = () => {
        const credentials = {
                'username': email,
                'password': password
            };        
        setLoading(true)

        axios.post('http://127.0.0.1:8001/api/user/login/', credentials)
            .then(response => {                
                setToken(response.data.result.token);
                navigate('/home')
                setLoading(false)
            })
            .catch(error => {                
                setShowErrorAlert(true)
            })
            .finally(() => {
                setLoading(false)
            });
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
                    onChange={handleInputChange}
                    value={password}
                    name="password"
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
                
                {/* <Button 
                    // disabled={true}
                    type='submit' 
                    variant="outlined"
                    onClick={requestLogin}
                >
                    Login
                </Button> */}
                <LoadingButton
                    loading={loading}
                    type='submit'
                    variant='outlined'
                    onClick={requestLogin}
                >
                    Login
                </LoadingButton>
                
                <Button                    
                    disabled={false}
                    size="small"
                    href="/forgot"
                    variant='text'
                    style={{fontSize: '10pt', color: 'gray'}}                    
                >
                    Esqueci minha senha
                </Button>

                {showErrorAlert && (
                    <Alert 
                        severity="error" 
                        onClose={() => setShowErrorAlert(false)}
                    >
                        Erro ao fazer login.
                    </Alert>
                )}
            </div>
        </div>
    );
}

export default LoginPage;