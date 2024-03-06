import './App.css';
import { useState } from 'react';
import { Box, Button, Typography, IconButton } from './imports'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { Popover } from '@mui/material';

import Board from './components/Board';

function App() {
  const [start, setStart] = useState(0)
  // The light theme is used by default
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light' ? {
                // palette values for light mode
                correct: {main: '#6aaa64'},
                present: {main: '#c9b458'},
                absent: {main: '#787c7e'},
                keyboard: {main: '#d3d6da'},
                text: {
                    primary: '#212121', 
                    secondary: 'rgba(0,0,0,0.6)', 
                    disabled: 'rgba(0,0,0,0.12)'
                }
            } : {
                // palette values for dark mode
                correct: {main: '#538d4e'},
                present: {main: '#b59f3b'},
                absent: {main: '#3a3a3c'},
                keyboard: {main: '#8d8e8e'},
                text: {
                    primary: '#fff', 
                    secondary: 'rgba(255,255,255,0.6)', 
                    disabled: 'rgba(255,255,255,0.3)'
                }
            }),
        },
        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
                'Dosis',

            ].join(','),
        }
});
const [anchorEl, setAnchorEl] = useState(null);

const handlePopoverOpen = (event) => {
  setAnchorEl(event.currentTarget);
};

const handlePopoverClose = () => {
  setAnchorEl(null);
};

const open = Boolean(anchorEl);
// This function is triggered when the Switch component is toggled
const changeTheme = () => { setIsDarkTheme(!isDarkTheme); };
  return (
    <ThemeProvider 
    theme={isDarkTheme ? 
        createTheme(getDesignTokens('dark')) : 
        createTheme(getDesignTokens('light'))
    }>
    <CssBaseline />
    <Box className="App" height={'100vh'}
      display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Box display={'flex'} flexDirection={'row'} 
        justifyContent={'space-between'} alignItems={'center'}
        width={'100%'} height={'48px'} mb={3}
        boxShadow={'0 2px 4px 0 rgba(0,0,0,.2)'}>
        <Typography pl={2} fontWeight={'bold'} fontFamily={'Dosis'}>CS 470</Typography>
        <Typography pl={2} fontWeight={'bold'} fontFamily={'Dosis'}>PENTAGO</Typography>
        
        <Box pr={2} display={'flex'} flexDirection={'row'} alignItems={'center'}>
          <HelpOutlineIcon 
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}>
          </HelpOutlineIcon>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Box p={2}>
              <Typography fontFamily={'Dosis'} fontWeight={'bold'}>How to Play</Typography>
              <Typography fontFamily={'Dosis'} fontSize={'14px'}>Place a marble by clicking an empty space</Typography>
              <Typography fontFamily={'Dosis'} fontSize={'14px'}>Click the arrow buttons to rotate a quadrant 90 degrees</Typography>
              <Typography fontFamily={'Dosis'} fontSize={'14px'}>The first player to get 5 in a row wins!</Typography>
            </Box>
          </Popover>
          <IconButton size='small' sx={{ ml: 1 }} onClick={changeTheme} color="inherit">
            {isDarkTheme ? <Brightness7Icon sx={{width: '20px', height: '20px'}}/> : <Brightness4Icon sx={{width: '20px', height: '20px'}}/>}
          </IconButton>
        </Box>
        
      </Box>
      <Board />
    
    <Box>
    </Box>
    </Box>
    </ThemeProvider>
  );
}

export default App;
