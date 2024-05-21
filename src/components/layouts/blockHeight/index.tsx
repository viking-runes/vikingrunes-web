import { FC, useEffect, useState } from 'react';
import BlockIcon from '@/assets/images/icon/etch/block.svg?react';
import { fetchBlockHeight } from '@/service/user/blockHeight.ts';
const BlockHeight: FC = () => {
  const [height, setHeight] = useState<string>();
  useEffect(() => {
    fetchBlockHeight<{ cache: { current_block_height: string } }>().then((res) => {
      setHeight(res?.cache?.current_block_height);
    });
  }, []);
  return (
    <span className={'d-flex align-items-center gap-3 d-media-none'}>
      <BlockIcon style={{ width: '1.5625rem' }} />
      <span className={'d-flex fontSize-12 flex-column'}>
        <span>{height}</span>
        <span>Block height</span>
      </span>
    </span>
  );
};
export default BlockHeight;
