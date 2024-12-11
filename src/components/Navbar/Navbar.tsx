import { AppBar, Avatar, Button, Toolbar, Typography, useTheme, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import memoriesLogo from '../../images/new memorie.png';
import memoriesText from '../../images/memories-Text.png';
import { deepPurple } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { jwtDecode } from 'jwt-decode';
import { apis } from '../../store/apis';

const Navbar = () => {
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const theme = useTheme();
  const {
    data
  } = useSelector((state: RootState) =>  ({
    data: state.signin.data,
  }));
  const [user, setUser] = useState(data);

  const logout = () => {
    history("/");

    dispatch(apis.reset());

    setUser(null);
  }

  useEffect(()=>{
    const token = user?.access_token;

    if(token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken && typeof decodedToken.exp === 'number') {
          if(decodedToken?.exp * 1000 < new Date().getTime()) logout();
        }
    }

    setUser(data);
  },[location])


  return (
    <AppBar 
      position="static" 
      color="inherit" 
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 2,
        px: 5,
        borderRadius: '15px',
        my: 3
      }}
    >
      <Link 
        to='/' 
        style={{ textDecoration: 'none', color: theme.palette.primary.main }}
      >
        <Box display="flex" alignItems="center">
          <img className="h-[45px]" src={memoriesText} alt="logo" />
          <img className="ml-2 mt-1 h-[60px]" src={memoriesLogo} alt="icon" />
        </Box>
      </Link>

      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        {user?.userInfo ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ width: 'auto' }}>
            <Avatar 
              sx={{
                bgcolor: deepPurple[500], 
                color: theme.palette.getContrastText(deepPurple[500])
              }} 
              alt={user.userInfo.firstName} 
              src={user.userInfo.firste}
            >
              {user.userInfo.firstName.charAt(0)}
            </Avatar>
            <Typography variant="h6" sx={{ marginLeft: 2 }}>
              {user.userInfo.firstName}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginLeft: 2 }}
              onClick={logout}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
