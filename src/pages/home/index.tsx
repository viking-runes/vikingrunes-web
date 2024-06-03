import { FC } from 'react';
import Banner from './components/banner';
import Footer from '@/components/layouts/footer';
import Advisors from './components/advisors';
import LinkCom from '@/pages/home/components/link';

const Home: FC = () => {
  return (
    <div>
      <Banner />
      <Advisors />
      <LinkCom />
      <Footer />
    </div>
  );
};
export default Home;
