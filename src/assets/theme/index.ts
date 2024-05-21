import { createTheme } from '@mui/material';
import outlinedInputTheme from '@/assets/theme/input';
import tabsTheme from '@/assets/theme/tabs';
import tableTheme from '@/assets/theme/table';
import progressTheme from '@/assets/theme/progress';
import paginationTheme from '@/assets/theme/pagination';
import radioTheme from '@/assets/theme/radio';

export const theme = createTheme({
  typography: {
    fontFamily: 'PT Mono',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#EBB94C',
      contrastText: '#fff',
      light: '#eddbb1',
      dark: 'red',
    },
  },
  components: {
    ...outlinedInputTheme,
    ...tabsTheme,
    ...tableTheme,
    ...progressTheme,
    ...paginationTheme,
    ...radioTheme,
  },
});
