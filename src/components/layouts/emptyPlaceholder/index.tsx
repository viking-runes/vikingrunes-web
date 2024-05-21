import { FC, Fragment, PropsWithChildren, ReactNode } from 'react';
import { Container, Typography } from '@mui/material';

const EmptyPlaceholder: FC<PropsWithChildren<{ text: string; subText?: string | ReactNode; isEmpty: boolean }>> = ({ text, isEmpty, children, subText }) => {
  return (
    <Fragment>
      {isEmpty ? (
        <Container sx={{ marginTop: '3rem', marginBottom: '3rem' }}>
          <Typography variant="h4" component="h2">
            {text} is not available yet !
          </Typography>
          {subText && (
            <Typography marginTop={'3rem'} variant="h6" component="h2">
              {subText}
            </Typography>
          )}
        </Container>
      ) : (
        children
      )}
    </Fragment>
  );
};
export default EmptyPlaceholder;
