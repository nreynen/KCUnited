import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import {Main} from './pages/Main';
// import {Loader} from './components/Loader';

const { Settings } = require("luxon");

const queryClient = new QueryClient();
Settings.defaultLocale = "en-UK";

declare module '@mui/material/styles' {
  interface Palette {
    opacitated?: {main_005?: string, sec005?: string};
    danger?: {main?: string};
  }
  interface PaletteOptions {
    opacitated?: {main_005?: string, sec005?: string};
    danger: {main: string};
  }
};

const theme = createTheme({
  typography: {
    fontFamily: ['Golos Text', 'sans-serif'].join(','),
    fontSize: 14,
    fontWeightLight: 100,
    fontWeightRegular: 400,
    fontWeightMedium: 700,

    h1: {
      fontSize: "2rem",
      fontFamily: 'Golos Text',
      color: '#2b3e5b'
    },
    h2: {
      fontSize: "1.5rem",
      fontFamily: 'Golos Text',
      color: '#2b3e5b'
    },
    h3: {
      fontSize: "1.25rem",
      fontFamily: 'Golos Text',
      color: '#2b3e5b'
    },
    h4: {
      fontSize: "1rem",
      fontFamily: 'Golos Text',
      color: '#2b3e5b'
    },
    h5: {
      fontSize: "0.8rem"
    },
    h6: {
      color: '#2b3e5b'
    },
    body1: {
      color: '#2b3e5b'
    },
    body2: {
      color: '#2b3e5b'
    }
  },
  palette: {
    primary: {
      light: '#7a8baa',
      main: '#2b3e5b',
      dark: '#091a2f'
    },
    secondary: {
      main: '#fbec83',
      light: '#fbec83',
      dark: '#e58134'
    },
    warning: {
      main: '#ff9800' // orange
    },
    danger: {
      main: '#b80018' // red
    },
    opacitated: {
      main_005: 'rgba(122, 139, 170, 0.5)',
      sec005: 'rgba(251, 236, 131, 0.4)'
    },
    mode: 'light',
    background: {
      default: '#ffffff'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ownerState, theme}) => ({
          textTransform: 'none',
          ...(!ownerState.no_lowercase && {
            // textTransform: 'lowercase'
            textTransform: 'none'
          }), ...(!!ownerState.capitalise && {
            // textTransform: 'capitalize'
            textTransform: 'none'
          }), ...(!!ownerState.transform_none && {
            textTransform: 'none'
          })
        })
      }
    }
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <React.Suspense fallback={(<span>Please wait...</span>)}>
      {/* <Loader /> */}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Main />
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
