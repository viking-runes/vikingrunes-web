import { FC } from 'react';
import styles from './index.module.less';
import commonStyles from '../../index.module.less';
import cn from 'classnames';
const Advisors: FC = () => {
  const advisors = [
    {
      advisor: 'Casey',
      introduction: 'Creator, Ordinals & Runes',
      link: 'https://x.com/rodarmor',
      avatar: 'https://cdn.vikingrunes.io/advisor/Casey.jpeg',
      isDisabled: true,
    },
    {
      advisor: 'Leonidas',
      introduction: 'Top influencer in the RUNES Community, Runestone Initiator',
      link: 'https://x.com/LeonidasNFT',
      avatar: 'https://cdn.vikingrunes.io/advisor/Leonidas.jpeg',
      isDisabled: true,
    },
    {
      advisor: '0xWizard',
      introduction: 'Top influencer in the Chinese Community',
      link: 'https://x.com/0xcryptowizard',
      avatar: 'https://cdn.vikingrunes.io/advisor/0xWizard.jpeg',
      isDisabled: true,
    },
    {
      advisor: 'Mike In Space',
      introduction: 'Author, Stamps/Src20',
      link: 'https://x.com/mikeinspace',
      avatar: 'https://cdn.vikingrunes.io/advisor/MikeInSpace.jpeg',
      isDisabled: true,
    },
    {
      advisor: 'domo',
      introduction: 'Creator of BRC-20 & Co-Founder, Layer 1 Foundation',
      link: 'https://x.com/domodata',
      avatar: 'https://cdn.vikingrunes.io/advisor/domo.jpeg',
      isDisabled: true,
    },
    {
      advisor: 'cipher',
      introduction: 'CELL Studio co-Founder, RGB++ Protocol author',
      link: 'https://x.com/crypcipher',
      avatar: 'https://cdn.vikingrunes.io/advisor/cipher.png',
      isDisabled: true,
    },
    {
      advisor: 'Michael',
      introduction: 'CBO of @TokenPocket_TP, Strategic Advisor of Vikingrunes',
      link: 'https://x.com/michaelwong123',
      avatar: 'https://cdn.vikingrunes.io/advisor/Michael.jpeg',
      isDisabled: false,
    },
    {
      advisor: 'raph',
      introduction: 'Code Contributor Of Ordinals & Runes',
      link: 'https://x.com/raphjaph',
      avatar: 'https://cdn.vikingrunes.io/advisor/raph.png',
      isDisabled: true,
    },
  ];

  return (
    <div className={styles.bg}>
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
    </div>
  );
};
export default Advisors;
