import { FC } from 'react';
import styles from './index.module.less';
import { ControlForm, PrimaryButton, ProfileBTCInfo } from '@/components';
import { capProfileInfo } from '@/pages/etch/components/etchTab/columns.ts';
import { etchMockData } from '@/pages/etch/components/etchTab/mockdata.ts';
import { burnColumns } from '@/pages/etch/components/burnTab/columns.ts';
const BurnTab: FC = () => {
  return (
    <div className={styles.burn}>
      <ControlForm size={'lg'} formItems={burnColumns} />
      <div className={styles['profile-info']}>
        <ProfileBTCInfo size={'lg'} columns={capProfileInfo} dataSource={etchMockData} />
      </div>
      <PrimaryButton width={'100%'} size={'lg'} text={'Process'} type={'primary'} />
    </div>
  );
};
export default BurnTab;
