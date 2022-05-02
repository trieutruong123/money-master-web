import { CircularProgress, Stack } from '@mui/material';
import style from './style/loading.module.css';

interface IProps {
  isLoading: boolean;
}

const animation = 'grow';
const size = 'sm';

export const CircularLoading = ({ isLoading }: IProps) => {
  return (
    <>
      {isLoading ? (
        <div className={style.loading}>
          <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
            <CircularProgress color="primary" />
          </Stack>
          <h3 style={{ paddingLeft: '1rem', display: 'block' }}>Loading...</h3>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
