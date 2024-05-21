import { FC, Fragment } from 'react';
import styles from './index.module.less';
import cn from 'classnames';
import { Skeleton } from '@mui/material';
import { AvatarContent, MintRuneInfo } from '@/components';
import { useNavigate } from 'react-router-dom';
const RuneItemInfo: FC<{ dataSource: IRuneDetailItem; fee_rate?: string }> = ({ dataSource }) => {
  const navigate = useNavigate();
  // const { wallet, signTx } = useWallet();

  // const mint = async () => {
  //   const data = await runeMint({
  //     // replace with correct rune id
  //     rune: dataSource?.rune_id,
  //     pubkey: wallet.publicKey,
  //     address: wallet.address,
  //     // testnet https://mempool.space/testnet/api/v1/fees/recommended
  //     // mainnet https://mempool.space/api/v1/fees/recommended
  //     fee_rate,
  //     to_address: wallet.address,
  //   });

  //   signTx(data.psbt);
  // };

  return (
    <div className={cn('d-flex flex-column', styles['rune-info'])}>
      {!dataSource ? (
        <Fragment>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton />
        </Fragment>
      ) : (
        <div className={styles['info-wrapper']}>
          <div className={cn(styles['info-content'], 'd-media-none')}>
            <MintRuneInfo style={{ paddingTop: 0 }} dataSource={dataSource} />
          </div>
          <div className={cn('d-media-mobile d-flex')}>
            <AvatarContent text={dataSource?.rune} avatar={dataSource?.rune_logo} />
          </div>
          <dd
            className={styles['btn-wrapper']}
            onClick={() => {
              navigate(`/fairMint?id=${dataSource.rune_id}`);
            }}
          >
            <a className={styles['btn']}>Mint</a>
          </dd>
        </div>
      )}
    </div>
  );
};
export default RuneItemInfo;
