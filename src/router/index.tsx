import { createBrowserRouter } from 'react-router-dom';
import Layouts from '@/components/layouts';
import ExplorerAll from '@/pages/explorerAll';
import Transactions from '@/pages/transactions';
import RuneDetail from '@/pages/runeDetail';
import AddressDetail from '@/pages/addressDetail';
import Etch from '@/pages/etch';
import FairMint from '@/pages/fairMint';
import Market from '@/pages/market';
import MarketDetail from '@/pages/marketDetail';
import RunesPump from '@/pages/runesPump';
import ErrorBoundary from '@/components/errorBoundary';
import MyAssets from '@/pages/profile/myAssets';
import Staking from '@/pages/staking';
import Freemint from '@/pages/freeMint';
import Home from '@/pages/home';
import Viking from '@/pages/viking';
import NftDetail from '@/pages/nft';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/',
    element: <Layouts />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: '/viking', element: <Viking />, errorElement: <ErrorBoundary /> },
      { path: '/explorer', element: <ExplorerAll />, errorElement: <ErrorBoundary /> },
      { path: '/tx/:id', element: <Transactions />, errorElement: <ErrorBoundary /> },
      { path: '/rune/:id', element: <RuneDetail />, errorElement: <ErrorBoundary /> },
      { path: '/address/:id', element: <AddressDetail />, errorElement: <ErrorBoundary /> },
      { path: '/profile', children: [{ path: '/profile/MyAssets', element: <MyAssets />, errorElement: <ErrorBoundary /> }] },
      { path: '/fairMint', element: <FairMint />, errorElement: <ErrorBoundary /> },
      {
        path: '/market',
        children: [
          { path: '/market', element: <Market />, errorElement: <ErrorBoundary /> },
          { path: '/market/detail', element: <MarketDetail />, errorElement: <ErrorBoundary /> },
        ],
      },
      { path: '/etch', element: <Etch />, errorElement: <ErrorBoundary /> },
      { path: '/runesPump', element: <RunesPump />, errorElement: <ErrorBoundary /> },
      { path: '/staking', element: <Staking />, errorElement: <ErrorBoundary /> },
      { path: '/freemint', element: <Freemint />, errorElement: <ErrorBoundary /> },
      { path: '/vikingwarriors', element: <NftDetail />, errorElement: <ErrorBoundary /> },
    ],
  },
]);
export default router;
