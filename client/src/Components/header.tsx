import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link as ScrollLink } from "react-scroll";
import { useScrollTrigger, Divider, TextField, Badge, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, CircularProgress } from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useState } from "react";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const pages = ["About-Us", "Contact-Us"];
function LoginHeader() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate()
  const open = Boolean(anchorElNav);
  const trigger = useScrollTrigger();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  return (
    <AppBar elevation={0} position="sticky" sx={{ backgroundColor: "#E4F1FF" }}>
      <Container maxWidth='xl' sx={{ marginTop: "0.5em" }}>
        <Toolbar disableGutters>
          <img
            src={process.env.PUBLIC_URL + "logo.png"}
            style={{ maxWidth: 70 }}
            alt=""
          />

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
            }}
          >
            {pages.map((page) => (
              <ScrollLink
                activeClass="active"
                to={page.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-70}
                duration={800}
              >
                <Button sx={{ fontSize: 12, color: "black", display: "block" }}>
                  {page.replace("-", " ")}
                </Button>
              </ScrollLink>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              color: "black",
              justifyContent: "end",
            }}
          >
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              //   onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* <Menu
              id="menu-appbar"
            //   anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            //   open={Boolean(anchorElNav)}
            //   onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            > */}
            {pages.map((page) => (
              <ScrollLink
                activeClass="active"
                to={page.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-70}
                duration={800}
              >
                <MenuItem key={page}
                //   onClick={handleCloseNavMenu}
                >
                  {page.replace("-", " ")}
                </MenuItem>
              </ScrollLink>
            ))}
            {/* </Menu> */}
          </Box>
        </Toolbar>
      </Container>
      {trigger ? <Divider /> : null}
    </AppBar>
  );
}


function DashboardHeader() {
  const trigger = useScrollTrigger();
  const [activeButton, setActiveButton] = useState<string | null>('Tasks');
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [signoutAlert, setSignoutAlert] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [signOutErr, setSignOutErr] = useState<boolean>(false)
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();
  const open = Boolean(anchorElNav);


  const handleButtonClick = (buttonName: string) => {

    setActiveButton(buttonName)

  };


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    setAnchorElNav(null);
    setSignoutAlert(true)
  }
  const handleSignoutClose = () => {
    setSignoutAlert(false)
  }
  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    const token = localStorage.getItem('token')
    !token ? setTimeout(() => navigate('/'), 3400) : setSignOutErr(true)
  }
  useEffect(() => {

    if (showAnimation) {
      navigate('/animation');
      setTimeout(() => {
      }, 3400)
    }
  }, [showAnimation, navigate]);
  const handleSignoutBtn = () => {
    setLoading(true)
    signOut()
    setTimeout(() => {
      setShowAnimation(true)
    }, 1500)
  }
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '2em',
    border: `1px  solid ${alpha(theme.palette.common.black, 0.2)}`,

    backgroundColor: alpha(theme.palette.common.white, 0.35),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.75),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'grey',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));


  return (
    <AppBar elevation={0} position="sticky" sx={{ backgroundColor: "#fff" }}>
      <Container maxWidth='xl' sx={{ my: "1em" }}>
        <Toolbar disableGutters sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={process.env.PUBLIC_URL + "logo.png"}
            style={{ maxWidth: 70, marginLeft: '1.5em' }}
            alt=""
          />

          <Box

            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-start",
              ml: "4em"
            }}
          >

            <Button startIcon={<ListIcon />} sx={{ fontSize: 10, color: activeButton === 'Tasks' ? 'black' : '#A8A8A8', display: "flex" }} onClick={() => handleButtonClick('Tasks')} >
              Tasks
            </Button>
            <Button startIcon={<FolderOpenIcon />} sx={{ fontSize: 10, display: "flex", color: activeButton === 'Projects' ? 'black' : '#A8A8A8' }} onClick={() => handleButtonClick('Projects')} >
              Projects
            </Button>
            <Button startIcon={<CelebrationIcon />} sx={{ fontSize: 10, color: activeButton === 'Activity' ? 'black' : '#A8A8A8', display: "flex" }} onClick={() => handleButtonClick('Activity')} >
              Activities
            </Button>
            <Button startIcon={<CalendarMonthIcon />} sx={{ fontSize: 10, color: activeButton === 'calender' ? 'black' : '#A8A8A8', display: "flex" }} onClick={() => handleButtonClick('calender')}>
              Calender
            </Button>

          </Box>


          <Box gap={3} sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
            alignItems: 'center'


          }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: 'grey' }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>


            <Badge badgeContent={4} color="primary">
              <NotificationsNoneIcon sx={{ color: 'grey' }} />
            </Badge>


            <Button size="small" sx={{ ml: '0em', height: '1.5em', width: '5.8.5em' }} id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleOpenNavMenu}>
              <AccountCircle sx={{ color: 'grey' }} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorElNav}
              open={open}
              onClose={handleCloseNavMenu}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>Profile</MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            <Dialog
              open={signoutAlert}
              maxWidth="xs"
              fullWidth
              onClose={handleSignoutClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogContent>
                <Container>

                  Are you sure you want to sign out
                </Container>

              </DialogContent>
              <DialogActions>
                <Button onClick={handleSignoutClose}>No, Cancel</Button>
                <Button
                  color='error'
                  variant='contained'
                  onClick={handleSignoutBtn}
                  autoFocus
                  disabled={loading} >{loading ? <CircularProgress size={22} /> : 'Yes'}

                </Button>

                {/* <Snackbar
                  open={taskDeleted}
                  autoHideDuration={1700}
                  onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '20em' }}>
                    Task deleted succesfully
                  </Alert>
                </Snackbar> */}
              </DialogActions>

            </Dialog>
          </Box>


          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              color: "black",
              justifyContent: "end",
            }}
          >
            <TextField label='search' />
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              //   onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* <Menu
              id="menu-appbar"
            //   anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            //   open={Boolean(anchorElNav)}
            //   onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            > */}
            {pages.map((page) => (
              <MenuItem key={page}
              //   onClick={handleCloseNavMenu}
              >
                {page.replace("-", " ")}
              </MenuItem>
            ))}
            {/* </Menu> */}
          </Box>
        </Toolbar>
      </Container>  
      {/* {trigger ? <Divider /> : null} */}
      <Divider />
    </AppBar>
  )
}

export { LoginHeader, DashboardHeader };
