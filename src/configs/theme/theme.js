import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#EA580C',
      dark: '#AC3A00',
      light: '#FFEBE8',
    },
    secondary: {
      main: '#4CAF50',
    },
    error: {
      main: '#DC2626',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
        containedPrimary: {
          backgroundColor: '#EA580C',
          '&:hover': {
            backgroundColor: '#AC3A00',
          },
        },
        outlinedPrimary: {
          borderColor: '#EA580C',
          color: '#EA580C',
          '&:hover': {
            borderColor: '#AC3A00',
            backgroundColor: '#FFEBE8',
          },
        },
        textPrimary: {
          color: '#EA580C',
          backgroundColor: '#E2E8F0',
          '&:hover': {
            color: '#FFFFFF',
            backgroundColor: '#EA580C',
          },
        },
      },
    },
  },
});

export default theme;
