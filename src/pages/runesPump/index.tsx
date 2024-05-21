import { FC, Fragment, useEffect, useState } from 'react';
import VikingBox from '@/pages/runesPump/components/vikingBox';
import styles from './index.module.less';
import VikingCard from '@/pages/runesPump/components/vikingCard';
import cn from 'classnames';
import { fetchBoard } from '@/service/runePump';
import { useCountdown } from 'react-countdown-circle-timer';
import dayjs from 'dayjs';
import { Tab, Tabs } from '@mui/material';
const RunesPump: FC = () => {
  const [board, setBoard] = useState<IBoard>();
  const [updateTime, setUpdateTime] = useState<string>();
  const row: { title: string; columns: Array<TBoardItem>; type: 'Mint' | 'Trade' }[] = [
    { title: 'Mint Before Disappeared', columns: board?.mints, type: 'Mint' },
    { title: 'Sailing In Transactions', columns: board?.transactions, type: 'Trade' },
  ];
  const [activeTab, setActiveTab] = useState('Mint');
  useCountdown({
    isPlaying: true,
    duration: 30,
    colors: [`#000000`],
    onUpdate: (remainingTime) => {
      if (remainingTime === 0) {
        void requestBoard();
      }
    },
    onComplete: () => ({ shouldRepeat: true, delay: 0 }),
  });
  const requestBoard = async () => {
    const res = await fetchBoard<{ board: IBoard }>();
    setUpdateTime(dayjs().format('HH:mm'));
    setBoard(res?.board);
  };
  useEffect(() => {
    void requestBoard();
  }, []);
  const currentCol = row?.findIndex((r) => r.type === activeTab);
  return (
    <div style={{ paddingBottom: '2rem' }}>
      <VikingBox />
      {board && (
        <div className={cn(styles.wrapper, 'w-100 d-flex justify-content-center')}>
          {row?.map((item) => {
            return (
              <div className={cn(styles.card, 'd-media-none')} key={item.title}>
                <h3 className={cn(styles.title, 'd-flex justify-content-center primary-color fontSize-16')}>{item.title}</h3>
                <div className={'d-flex flex-column justify-content-center align-items-center margin-bottom-20'}>
                  {item.columns.map((col, index) => {
                    return <VikingCard type={item.type} key={index + index} item={col} />;
                  })}
                </div>
              </div>
            );
          })}
          <div className={'d-media-mobile'}>
            <Tabs className={cn('d-media-mobile', styles.tabs)} value={activeTab} onChange={(_, value) => setActiveTab(value)} variant="fullWidth">
              {row.map((tab) => (
                <Tab label={tab.title} key={tab.type} value={tab.type} />
              ))}
            </Tabs>
            <div className={cn('d-media-mobile', styles['tab-panel'])}>
              {row[currentCol].columns.map((col, index) => {
                return <VikingCard type={row[currentCol].type} key={index + index} item={col} />;
              })}
            </div>
          </div>
          <div className={styles['count-down']}>
            <p className={'d-flex flex-column gap-16 align-items-center'}>
              <span className={cn(styles['count-down-text'], 'primary-color')}>{updateTime}</span>
              <span>Last updated</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default RunesPump;
