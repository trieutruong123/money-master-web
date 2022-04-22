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
            <CircularProgress color="secondary" />
            <CircularProgress color="error" />
          </Stack>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
