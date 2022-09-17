import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import PersonIcon from '@mui/icons-material/Person';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useGeneralStore from '../../stores/GeneralStore';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// const pages = ['Home', 'Type!',];
const pages: any = {
  Home: '/',
  'Type!': '/typerace',
};
const settings: any = {
  Profile: '#',
  Logout: '',
  mode: '',
};
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const Header = () => {
  const { themeMode } = useGeneralStore();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleThemeMode = () => {
    useGeneralStore.setState({
      themeMode: themeMode === 'light' ? 'dark' : 'light',
    });
  };

  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Link href="/">
            <Typography
              variant="h6"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'arial',
                fontWeight: 700,
                letterSpacing: '',
                textDecoration: 'none',
              }}
            >
              KeKrazy
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
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
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {Object.keys(pages).map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link href={pages[page]}>
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Link href="/">
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'arial',
                fontWeight: 700,
                letterSpacing: '',
                textDecoration: 'none',
              }}
            >
              KeKrazy
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {Object.keys(pages).map((page) => (
              <Link href={pages[page]} key={page}>
                <a onClick={handleCloseNavMenu}>
                  <Typography variant="body1" mr={1}>
                    {page}
                  </Typography>
                </a>
              </Link>
            ))}
          </Box>

          {!session && (
            <Box>
              <IconButton
                sx={{ ml: 1 }}
                onClick={toggleThemeMode}
                color="inherit"
              >
                {themeMode === 'dark' ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Box>
          )}

          {session ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <PersonIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {Object.keys(settings).map((setting) => {
                  if (setting == 'Logout') {
                    if (session) {
                      return (
                        <MenuItem
                          key={setting}
                          onClick={() => {
                            signOut();
                            handleCloseUserMenu();
                          }}
                        >
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      );
                    } else {
                      return null;
                    }
                  }
                  if (setting == 'mode') {
                    return (
                      <MenuItem>
                        <IconButton onClick={toggleThemeMode} color="inherit">
                          {themeMode === 'dark' ? (
                            <Brightness7Icon />
                          ) : (
                            <Brightness4Icon />
                          )}
                        </IconButton>
                      </MenuItem>
                    );
                  }
                  return (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
          ) : (
            <Box>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => signIn()}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
