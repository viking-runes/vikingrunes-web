import { FC, useCallback, useRef, useState } from 'react';
import { ControlForm, PrimaryButton } from '@/components';
import { capProfileInfo, etchFormItems, totalSupplyFormItems } from './columns.ts';
import styles from './index.module.less';
import InsertTabs from '@/components/insertTabs';
import { ProfileBTCInfo } from '@/components';
import { etchMockData } from '@/pages/etch/components/etchTab/mockdata.ts';
import { mintColumns } from '@/pages/etch/components/etchTab/mintColumns.ts';
import { TControlFormHandler } from '@/components/form/types.ts';
import { isEmpty } from 'lodash';

const EtchTab: FC = () => {
  const formInstance = useRef<TControlFormHandler>(null);
  const capInstance = useRef<TControlFormHandler>(null);
  const mintInstance = useRef<TControlFormHandler>(null);
  const [activeTab, setActiveTab] = useState('cap');
  const [disable, setDisable] = useState(false);
  const onLabelExtraClick = () => {};
  const onSubmit = useCallback(async () => {
    const res = await formInstance.current.validate?.();
    const capRes = activeTab === 'cap' ? await capInstance?.current?.validate() : await mintInstance.current?.validate();
    setDisable(!isEmpty(res) || !isEmpty(capRes));
  }, [activeTab]);
  return (
    <div className={styles.form}>
      <ControlForm ref={formInstance} size={'lg'} formItems={etchFormItems} row={{ span: 2, gap: '6.75rem' }} />
      <div className={styles.tab}>
        <InsertTabs
          gap={'4.5rem'}
          width={'6.25rem'}
          value={activeTab}
          onTabChange={(value) => {
            setActiveTab(value);
          }}
          items={[
            { label: 'Fixed Cap', value: 'cap' },
            { label: 'Fair Mint', value: 'mint' },
          ]}
        />
      </div>
      <div style={{ display: activeTab === 'cap' ? 'block' : 'none' }}>
        <ControlForm ref={capInstance} size={'lg'} onLabelExtraClick={onLabelExtraClick} formItems={totalSupplyFormItems} />
        <div className={styles['profile-info']}>
          <ProfileBTCInfo size={'lg'} columns={capProfileInfo} dataSource={etchMockData} />
        </div>
      </div>
      <div style={{ display: activeTab === 'mint' ? 'block' : 'none' }}>
        <ControlForm ref={mintInstance} row={{ gap: '6.25rem' }} size={'lg'} formItems={mintColumns} />
        <div className={styles['profile-info']}>
          <ProfileBTCInfo size={'lg'} columns={capProfileInfo} dataSource={etchMockData} />
        </div>
      </div>
      <PrimaryButton disabled={disable} onClick={onSubmit} width={'100%'} size={'lg'} text={'Process'} type={'primary'} />
    </div>
  );
};
export default EtchTab;
