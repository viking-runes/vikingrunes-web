import { FC } from 'react';
import { FormControlLabel, Radio, RadioGroup, ThemeProvider, Tooltip } from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import styles from './index.module.less';
import cn from 'classnames';
import { tooltipStyles } from '@/assets/styles/tooltip';
interface IProps {
  onChange?: (T: string) => void;
  value?: string;
}
const radioItems = [
  {
    label: 'Absolute',
    value: 'absolute',
    tooltip: (
      <p className={'d-flex flex-column'}>
        <span>Start and end at the block</span>
        <span> you set.</span>
      </p>
    ),
  },
  {
    label: 'Offset',
    value: 'offset',
    tooltip: (
      <p className={'d-flex flex-column'}>
        <span>Startblock = OffsetStart + ETCHING_HEIGHT.</span>
        <span>Endblock = OffsetEnd + ETCHING_HEIGHT.</span>
      </p>
    ),
  },
];
const EtchRadio: FC<IProps> = () => {
  return (
    <RadioGroup row className={styles.group}>
      {radioItems.map((item) => {
        return (
          <FormControlLabel
            key={item.value}
            value={item.value}
            control={<Radio />}
            label={
              <p className={cn(styles.label, 'd-flex align-items-center')}>
                <span className={cn(styles.text, 'fontSize-14')}>{item.label}</span>
                <ThemeProvider theme={tooltipStyles({ padding: '0.25rem' })}>
                  <Tooltip
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: 'offset',
                            options: {
                              offset: [0, -14],
                            },
                          },
                        ],
                      },
                    }}
                    arrow={true}
                    placement={'top-start'}
                    title={item.tooltip}
                    className={styles.tooltip}
                  >
                    <i className={cn(styles.icon, 'd-flex align-items-center')}>
                      <HelpOutlineOutlinedIcon />
                    </i>
                  </Tooltip>
                </ThemeProvider>
              </p>
            }
          />
        );
      })}
    </RadioGroup>
  );
};
export default EtchRadio;
