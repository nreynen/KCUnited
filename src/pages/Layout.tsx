import React, { FunctionComponent } from 'react';
// import { useTheme } from '@mui/material/styles';
// import { useNavigate } from 'react-router-dom';

// @ts-ignore
import Logo from "../images/logo_trans.png";

import MenuIcon from '@mui/icons-material/Menu';

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import { Typography } from '../components/interface';
import { useNavigate } from 'react-router-dom';

// import {Sidebar} from '../components/Sidebar';

type LayoutProps = {
  sx?: object;
  children?: React.ReactNode;
  version?: string;
  loginId?: number;
}

export const Layout: FunctionComponent<LayoutProps> = ({sx, children, version}) => {
  // const theme = useTheme();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  // check queues




  const menuMenuItem = (key:string, name: string) => {
    return <MenuItem key={key} onClick={() => {
      setAnchorElNav(null);

      if (window.location.pathname === "/") {
        var element = document.getElementById(`scroll${key}`);
        var headerOffset = 108;
        // @ts-ignore
        var elementPosition = element.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      } else {
        navigate("/", {state: {scrllto: `scroll${key}`}});
      }
    }}>
      <Typography sx={{ textAlign: 'center' }}>{name}</Typography>
    </MenuItem>;
  }
  const menuButton = (key:string, name: string) => {
    return <Button
      key={key}
      onClick={() => {
        setAnchorElNav(null);

        if (window.location.pathname === "/") {
          var element = document.getElementById(`scroll${key}`);
          var headerOffset = 108;
          // @ts-ignore
          var elementPosition = element.getBoundingClientRect().top;
          var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        } else {
          navigate("/", {state: {scrllto: `scroll${key}`}});
        }
      }}
      sx={{ my: 2, color: 'white', display: 'block' }}
    >
      {name}
    </Button>;
  }








  return (<Box sx={{
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: 0
  }}>
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            src={Logo}
            sx={{
              mr: 1,
              height: '60px',
              width: 'auto',
              cursor: 'pointer'
            }}
            variant='square'
            onClick={() => {
              if (window.location.pathname === "/") {
                window.scrollTo(0, 0);
              } else {
                navigate("/");
                window.scrollTo(0, 0);
              }
            }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => {
                setAnchorElNav(e.currentTarget);
              }}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={(e) => {
                setAnchorElNav(null);
                if (window.location.pathname === "/") {
                  window.scrollTo(0, 0);
                } else {
                  navigate("/");
                  window.scrollTo(0, 0);
                }
              }}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem key='home' onClick={() => {
                setAnchorElNav(null);
              }}>
                <Typography sx={{ textAlign: 'center' }}>Home</Typography>
              </MenuItem>
              {menuMenuItem('news', 'Nieuws')}
              {menuMenuItem('agenda', 'Agenda')}
              {menuMenuItem('about', 'Over ons')}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key='home'
              onClick={() => {
                setAnchorElNav(null);
                if (window.location.pathname === "/") {
                  window.scrollTo(0, 0);
                } else {
                  navigate("/");
                  window.scrollTo(0, 0);
                }
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Home
            </Button>
            {menuButton('news', 'Nieuws')}
            {menuButton('agenda', 'Agenda')}
            {menuButton('about', 'Over ons')}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

    
    {children}
  </Box>);
}

