import { FC } from 'react';
import Banner from './components/banner';
import Footer from '@/components/layouts/footer';
import Advisors from './components/advisors';
import LinkCom from '@/pages/home/components/link';
import VikingWarrior from './components/viking-warrior';

const Home: FC = () => {
  return (
    <div>
      <Banner />
      {false && <Advisors />}
      <VikingWarrior />
      <LinkCom />
      <Footer />
    </div>
  );
};
export default Home;
