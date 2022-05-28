import { CircularProgress, Stack } from '@mui/material';
import { HypnosisLoading } from 'shared/components';
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
          <HypnosisLoading />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
