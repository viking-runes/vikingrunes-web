import { FC, Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import './index.less';

const Layouts: FC = () => {
  return (
    <Fragment>
      <Header />
      <div className={'page-content'}>
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  );
};
export default Layouts;
