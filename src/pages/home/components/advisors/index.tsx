import { FC } from 'react';
import styles from './index.module.less';
import commonStyles from '../../index.module.less';
import cn from 'classnames';
import { Box } from '@mui/material';
const Advisors: FC = () => {
  const advisors = [
    {
      advisor: 'Casey (Inviting)',
      introduction: 'Creator, Ordinals & Runes',
      link: 'https://x.com/rodarmor',
      avatar: 'https://cdn.vikingrunes.io/advisor/Casey.jpeg',
      isDisabled: false,
    },
    {
      advisor: 'Leonidas (Inviting)',
      introduction: 'Top influencer in the RUNES Community, Runestone Initiator',
      link: 'https://x.com/LeonidasNFT',
      avatar: 'https://cdn.vikingrunes.io/advisor/Leonidas.jpeg',
      isDisabled: false,
    },
    {
      advisor: '0xWizard (Inviting)',
      introduction: 'Top influencer in the Chinese Community',
      link: 'https://x.com/0xcryptowizard',
      avatar: 'https://cdn.vikingrunes.io/advisor/0xWizard.jpeg',
      isDisabled: false,
    },
    {
      advisor: 'Mike In Space (Inviting)',
      introduction: 'Author, Stamps/Src20',
      link: 'https://x.com/mikeinspace',
      avatar: 'https://cdn.vikingrunes.io/advisor/MikeInSpace.jpeg',
      isDisabled: false,
    },
    {
      advisor: 'domo (Inviting)',
      introduction: 'Creator of BRC-20 & Co-Founder, Layer 1 Foundation',
      link: 'https://x.com/domodata',
      avatar: 'https://cdn.vikingrunes.io/advisor/domo.jpeg',
      isDisabled: false,
    },
    {
      advisor: 'cipher (Inviting)',
      introduction: 'CELL Studio co-Founder, RGB++ Protocol author',
      link: 'https://x.com/crypcipher',
      avatar: 'https://cdn.vikingrunes.io/advisor/cipher.png',
      isDisabled: false,
    },
    {
      advisor: 'raph (Inviting)',
      introduction: 'Code Contributor Of Ordinals & Runes',
      link: 'https://x.com/raphjaph',
      avatar: 'https://cdn.vikingrunes.io/advisor/raph.png',
      isDisabled: false,
    },
    {
      advisor: '0xSea.eth (Inviting)',
      introduction: 'Researcher & Top influencer',
      link: 'https://x.com/_0xSea_',
      avatar: 'https://cdn.vikingrunes.io/advisor/0xsea.jpg',
      isDisabled: false,
    },
  ];

  return (
    <Box className={styles.bg}>
      <div className={styles.content}>
        <h1 className={commonStyles.hello}>Welcome</h1>
        <h2 className={commonStyles.title}>Influencers & Advisors</h2>
        <ul className={styles.advisors}>
          {advisors.map((item) => (
            <li
              onClick={() => {
                window.open(item.link);
              }}
              key={item.advisor}
              className={cn({ [styles.filter]: !item.isDisabled })}
            >
              <i>
                <img src={item.avatar} alt={item.introduction} />
              </i>
              <p>{item.advisor}</p>
              <span>{item.introduction}</span>
            </li>
          ))}
        </ul>
      </div>
    </Box>
  );
};
export default Advisors;
