import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/assets/theme';
import { Provider } from 'jotai';
import WalletAuth from '@/components/wallets/wallets-auth.tsx';
import SnackbarProvider from '@/components/snackbar/snackbar-provider.tsx';
import { ProfileProvider } from '@/context';
import { CoinPricePolling } from '@/components/coin-price';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider>
    <ProfileProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <App />
          <WalletAuth />
          <CoinPricePolling />
        </SnackbarProvider>
      </ThemeProvider>
    </ProfileProvider>
  </Provider>
);
