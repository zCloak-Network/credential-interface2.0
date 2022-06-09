import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';

import { CTypeProvider, NotificationProvider, ThemeProvider } from '@credential/react-components';
import { KeystoreProvider } from '@credential/react-keystore';

import App from './App';

const Root: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <NotificationProvider>
            <KeystoreProvider>
              <CTypeProvider>
                <CssBaseline />
                <App />
              </CTypeProvider>
            </KeystoreProvider>
          </NotificationProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Root;
