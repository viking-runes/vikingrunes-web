// import styles from './index.module.less';
// import cn from 'classnames';
// import commonStyles from '../../index.module.less';
import { Box, Button, Container, Stack, Typography } from '@mui/material';

const VikingWarrior = () => {
  // const advisors = [
  //   {
  //     advisor: 'Casey (Inviting)',
  //     introduction: 'Creator, Ordinals & Runes',
  //     link: 'https://x.com/rodarmor',
  //     avatar: 'https://cdn.vikingrunes.io/advisor/Casey.jpeg',
  //     isDisabled: false,
  //   },
  //   {
  //     advisor: 'Leonidas (Inviting)',
  //     introduction: 'Top influencer in the RUNES Community, Runestone Initiator',
  //     link: 'https://x.com/LeonidasNFT',
  //     avatar: 'https://cdn.vikingrunes.io/advisor/Leonidas.jpeg',
  //     isDisabled: false,
  //   },
  //   {
  //     advisor: '0xWizard (Inviting)',
  //     introduction: 'Top influencer in the Chinese Community',
  //     link: 'https://x.com/0xcryptowizard',
  //     avatar: 'https://cdn.vikingrunes.io/advisor/0xWizard.jpeg',
  //     isDisabled: false,
  //   },
  //   {
  //     advisor: 'Mike In Space (Inviting)',
  //     introduction: 'Author, Stamps/Src20',
  //     link: 'https://x.com/mikeinspace',
  //     avatar: 'https://cdn.vikingrunes.io/advisor/MikeInSpace.jpeg',
  //     isDisabled: false,
  //   },
  //   {
  //     advisor: 'domo (Inviting)',
  //     introduction: 'Creator of BRC-20 & Co-Founder, Layer 1 Foundation',
  //     link: 'https://x.com/domodata',
  //     avatar: 'https://cdn.vikingrunes.io/advisor/domo.jpeg',
  //     isDisabled: false,
  //   },
  //   {
  //     advisor: 'cipher (Inviting)',
  //     introduction: 'CELL Studio co-Founder, RGB++ Protocol author',
  //     link: 'https://x.com/crypcipher',
  //     avatar: 'https://cdn.vikingrunes.io/advisor/cipher.png',
  //     isDisabled: false,
  //   },
  //   {
  //     advisor: 'raph (Inviting)',
  //     introduction: 'Code Contributor Of Ordinals & Runes',
  //     link: 'https://x.com/raphjaph',
  //     avatar: 'https://cdn.vikingrunes.io/advisor/raph.png',
  //     isDisabled: false,
  //   },
  //   {
  //     advisor: '0xSea.eth (Inviting)',
  //     introduction: 'Researcher & Top influencer',
  //     link: 'https://x.com/_0xSea_',
  //     avatar: 'https://cdn.vikingrunes.io/advisor/0xsea.jpg',
  //     isDisabled: false,
  //   },
  // ];

  return (
    // <div className={styles.bg}>
    //   <div className={styles.content}>
    //     <h2 className={commonStyles.title}>Viking Warrior</h2>

    //     <ul className={styles.advisors}>
    //       {advisors.map((item) => (
    //         <li
    //           onClick={() => {
    //             window.open(item.link);
    //           }}
    //           key={item.advisor}
    //           className={cn({ [styles.filter]: !item.isDisabled })}
    //         >
    //           <i>
    //             <img src={item.avatar} alt={item.introduction} />
    //           </i>
    //           <p>{item.advisor}</p>
    //           <span>{item.introduction}</span>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
    <Box sx={{ background: 'url("/assets/advisors.png") no-repeat center', backgroundSize: 'cover' }}>
      <Container>
        <Box pt={7} pb={18.875}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack spacing={4} maxWidth={549}>
              <Typography fontSize={40} fontWeight={400} color={'#EBB94C'}>
                <span style={{ color: '#fff' }}>#</span> Viking Warrior
              </Typography>
              <Typography fontSize={20} fontWeight={400}>
                Vikings consisted of explorers, berserkers, merchants, sailors, pirates, wizards and craftsmen, and were good at sailing.
              </Typography>
              <Typography fontSize={20} fontWeight={400}>
                Legend has it that Vikings wore horned helmets to fight and were extremely brave. From the 8th to the 11th century AD, they conquered most of the European coast.
              </Typography>
              <Typography fontSize={20} fontWeight={400}>
                {`We have specially created the Ordinals collection "Viking Warrior" to pay tribute to the warriors who sailed on bitcoin.`}
              </Typography>
              <Typography fontSize={24} fontWeight={400} color={'#EBB94C'}>
                Quantity: 40,000 &nbsp; Price: Freemint
              </Typography>
            </Stack>
            <Stack spacing={2.5} alignItems={'center'} justifyContent={'flex-end'}>
              <Box width={330} height={330} bgcolor={'rgba(151, 151, 151, .5)'} borderRadius={1}>
                <video controls={false} width="100%" height="auto" autoPlay={true} muted>
                  <source src="/assets/video-60k.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
              <Button
                variant="contained"
                color="primary"
                disabled
                sx={{
                  width: 140,
                  height: 50,
                  borderRadius: '10px',
                }}
              >
                Mint
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default VikingWarrior;
