import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FiEdit } from 'react-icons/fi';
import {
  AiFillMinusSquare,
  AiOutlineImport,
  AiOutlineExport,
} from 'react-icons/ai';
import { BiTransfer ,BiPlusMedical} from 'react-icons/bi';
import { BsPlusSquareFill } from 'react-icons/bs';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import Box from '@mui/material/Box';

const mainButtonStyles = { background: '#14B8A6', color : '#14B8A6'};
const styled = { };

interface IProps {
  event: 'hover' | 'click';
  handleOnClick: any;
}

export const FloatingMenuButton = ({ event, handleOnClick }: IProps) => (
  <Box sx={{ position: 'fixed', right: '15vw', bottom: '15vh' }}>
    <Fab
      mainButtonStyles={mainButtonStyles}
      style={styled}
      icon={<BiPlusMedical style={{color:'white',width:'2rem', height:'2rem'}} />}
      event={event}
      alwaysShowTitle={true}
      onClick={() => handleOnClick('main')}
    >
      <Action

        text="Draw"
        style={{ background: '#14B8A6' }}
        onClick={() => handleOnClick('draw')}
      >
        <AiFillMinusSquare color="" />
      </Action >
      <Action style={{ background: '#14B8A6' }} text="Edit" onClick={() => handleOnClick('edit')}>
        <FiEdit color="white" />
      </Action>
      <Action style={{ background: '#14B8A6' }} text="Export" onClick={() => handleOnClick('export')}>
        <AiOutlineExport color="white" />
      </Action>
      <Action style={{ background: '#14B8A6' }} text="Import" onClick={() => handleOnClick('import')}>
        <AiOutlineImport color="white" />
      </Action>
      <Action style={{ background: '#14B8A6' }} text="Transfer" onClick={() => handleOnClick('transfer')}>
        <BiTransfer color="white" />
      </Action>
      <Action style={{ background: '#14B8A6' }} text="Buy" onClick={() => handleOnClick('buy')}>
        <BsPlusSquareFill color="white" />
      </Action>
    </Fab>
  </Box>
);
