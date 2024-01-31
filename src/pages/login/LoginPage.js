import './Login.css'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import { Alert, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig'


function LoginPage() {
    const [loading, setLoading] = useState(false)    

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

        api.post('user/login/', credentials)
            .then(response => {                
                const token = response.data.result.token
                setToken(token);                
                localStorage.setItem('token', token)                
                if (response.data.result.superuser) {
                    navigate('/superhome')
                } else {
                    navigate('/adminhome')
                }                
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