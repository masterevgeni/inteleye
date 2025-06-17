
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196F3', 
      light: '#6EC6FF', 
      dark: '#0069C0', 
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff4081',
      light: '#ff79a1',
      dark: '#b70057',
      contrastText: '#fff',
    },
    background: {
      default: '#121212',
      paper: 'rgba(30,30,30,0.75)', 
    },
    text: {
      primary: '#e0e0e0',
      secondary: 'rgba(224,224,224,0.7)',
      disabled: 'rgba(224,224,224,0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    action: {
      hover: 'rgba(33,150,243, 0.15)', 
      selected: 'rgba(33,150,243, 0.25)', 
      disabledBackground: 'rgba(255,255,255,0.05)',
      disabled: 'rgba(255,255,255,0.3)',
    },
  },

  typography: {
    fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
      letterSpacing: '0.02em',
      color: '#ffffff',
      background: 'linear-gradient(135deg, #2196F3 0%, #6EC6FF 100%)', // Changed gradient to blue
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h6: {
      fontWeight: 600,
      color: 'rgba(255,255,255,0.85)',
    },
    subtitle1: {
      color: 'rgba(255,255,255,0.75)',
    },
    body1: {
      color: '#e0e0e0',
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    }
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'radial-gradient(circle at 20% 20%, #121212, #000000 80%)',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          transition: 'background 0.3s ease',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(30,30,30,0.6)',
          backgroundImage: 'linear-gradient(145deg, rgba(33, 150, 243, 0.15), rgba(0,0,0,0))',  
          borderRadius: 16,
          border: '1px solid rgba(33, 150, 243, 0.4)',  
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 20px rgba(33, 150, 243, 0.25)',  
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 8px 30px rgba(33, 150, 243, 0.5)',  
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(30, 30, 30, 0.7)',
          borderRadius: 16,
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(33, 150, 243, 0.25)',  
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          textTransform: 'none',
          fontWeight: 700,
          transition: 'all 0.3s ease',
          boxShadow: '0 0 10px rgba(33,150,243,0.35)',  
          '&:hover': {
            backgroundImage: 'linear-gradient(45deg, #2196F3, #6EC6FF)',  
            boxShadow: '0 0 18px rgba(33,150,243,0.9)',  
            transform: 'scale(1.05)',
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
          '&.Mui-disabled': {
            boxShadow: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
        containedPrimary: {
          backgroundImage: 'linear-gradient(135deg, #2196F3 0%, #6EC6FF 100%)',  
          color: '#fff',
          '&:hover': {
            backgroundImage: 'linear-gradient(135deg, #33B5E5 0%, #4FC3F7 100%)',   
          },
        },
        containedSecondary: {
          backgroundImage: 'linear-gradient(135deg, #ff4081 0%, #ff79a1 100%)',
          color: '#fff',
          '&:hover': {
            backgroundImage: 'linear-gradient(135deg, #ff5c9e 0%, #ff8bb1 100%)',
          },
        },
        outlinedPrimary: {
          borderColor: 'rgba(33,150,243,0.6)',  
          color: '#2196F3',  
          '&:hover': {
            borderColor: '#2196F3',  
            backgroundColor: 'rgba(33,150,243,0.1)',  
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(30,30,30,0.5)',
          borderRadius: 16,
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(33,150,243,0.3)',  
          color: '#e0e0e0',
          transition: 'border-color 0.3s ease, background-color 0.3s ease',
          '&:hover': {
            borderColor: '#2196F3',  
            backgroundColor: 'rgba(33,150,243,0.1)',  
          },
          '&.Mui-focused': {
            borderColor: '#6EC6FF',   
            backgroundColor: 'rgba(33,150,243,0.15)',  
            boxShadow: '0 0 12px rgba(33,150,243,0.4)',  
          },
          '& input': {
            color: '#e0e0e0',
            fontWeight: 500,
          },
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          '&.Mui-selected': {
            backgroundColor: 'rgba(33,150,243,0.3)',  
            boxShadow: '0 0 10px rgba(33,150,243,0.4)',  
            '&:hover': {
              backgroundColor: 'rgba(33,150,243,0.4)',  
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(33,150,243,0.15)',  
          },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '2px solid #2196F3',  
          boxShadow: '0 0 8px rgba(33,150,243,0.5)',  
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 0 12px rgba(33,150,243,0.9)',  
          },
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: 'rgba(30,30,30,0.9)',
          backdropFilter: 'blur(8px)',
          borderRadius: 12,
          fontSize: '0.875rem',
          color: '#2196F3',  
          boxShadow: '0 0 10px rgba(33,150,243,0.6)',  
        },
        arrow: {
          color: 'rgba(30,30,30,0.9)',
        },
      },
    },

    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(18,18,18,0.75)',
          backdropFilter: 'blur(12px)',
        },
      },
    },
  },
});

export default theme;