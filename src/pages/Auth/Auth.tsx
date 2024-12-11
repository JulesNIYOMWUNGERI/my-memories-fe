import { LockOutlined } from '@mui/icons-material'
import { Alert, Avatar, Button, CircularProgress, Container, Grid, Paper, Snackbar, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { apis } from '../../store/apis'
import Input from '../../components/Input/Input'
import { RootState } from '../../store/store'

const initialState = { firstName:'', lastName:'', email:'', password:'', comfirmPassword:''}

const Auth = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState<any>(initialState);
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const { 
    loading,
    registering
  } = useSelector((state: RootState) =>  ({
    loading: state.signin.loading,
    registering: state.signup.registering,
  }));

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if(isSignUp) {
       const res = await dispatch(apis?.signup(formData) as any);

       if (res?.payload?.role) {
        setSnackbarMessage('Signup successful!');
        setSnackbarSeverity('success');
        setFormData(initialState);
        setOpenSnackbar(true);
        setIsSignUp(false);
    } else {
        setSnackbarMessage(res?.payload?.error?.data?.message);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
    }
    }else {
        const res = await dispatch(apis?.signin(formData) as any);
        
        if (res?.payload?.access_token) {
            navigate('/posts')
        }
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData,[e.target.name]:e.target.value })
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setShowPassword(false)
  };


  return (
    <Container component='main' maxWidth='xs'>
        <Paper 
          sx={{
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(2),
          }}
          elevation={3}
        >
            <Avatar 
                sx={{
                    margin: theme.spacing(1),
                    backgroundColor: theme.palette.secondary.main,
                }}
            >
                <LockOutlined />
            </Avatar>
            <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
            <form className='w-full mt-3' onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                            </>
                        )}
                    <Input name='email' label='Email Address' handleChange={handleChange} type="email" />
                    <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    {isSignUp && <Input name='comfirmPassword' label='Repeat Password' handleChange={handleChange} type='password'/>}
                </Grid>
                <Button
                    type='submit' 
                    fullWidth 
                    variant='contained' 
                    color='primary' 
                    sx={{ margin: theme.spacing(3, 0, 2) }}
                    disabled={loading || registering}
                >
                    {loading || registering ? (
                        <CircularProgress size={24} sx={{ color: 'white' }} /> // Display a loading spinner
                    ) : (
                        isSignUp ? 'Sign Up' : 'Sign In'
                    )}
                </Button>
                {/* <GoogleLogin 
                onSuccess={googleSuccess}
                onError={googleFailure}
                /> */}
                <Grid container sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item>
                        <Button onClick ={switchMode}>
                            {isSignUp ? 'Allready Have An Account? Sign In' : 'Dont Have An Account? Sign Up'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>

        <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
    </Container>
  )
}

export default Auth