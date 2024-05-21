import { RouterProvider } from 'react-router-dom';
import router from '@/router';
import '@/assets/css/global.less';
import '@/assets/css/comon.less';
import '@/assets/icofont/css/icofont.css';
function App() {
  return <RouterProvider router={router} />;
}

export default App;
