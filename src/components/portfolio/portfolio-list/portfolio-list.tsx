import {
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Typography,
  Button,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { styled } from '@mui/material/styles';

import * as React from 'react';
import { content } from 'i18n';
import { observer } from 'mobx-react-lite';
import PortfolioCard from 'components/portfolio/portfolio-list/portfolio-card';
import Modal from '@mui/material/Modal';
import NewPortfolio from 'components/portfolio/portfolio-list/modify-portfolio';
import { portfolioStore } from '../../../shared/store';

interface IProps {
  context:any
}

const StyledModal = styled(Box)(({ theme }: any) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  minWidth: '520px',
  height: '650px',
  maxHeight: '100vh',
 
  borderRadius: '12px',
  overflow: 'hidden',
}));

const PortfolioList = observer(({ context }: IProps) => {
  const { locale } = context;
  const detail = locale === 'vi' ? content['vi'] : content['en'];
  const pageContent = detail.portfolioListPage;

  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);
  const createHandler = (data: any) => {
    // call create API
    portfolioStore.addNewPortfolio(data);
    setOpenCreateModal(false);
  };

  const updateHandler = (data: any) => {
    // call update API
    console.log('UPDATED: ', data);
  };

  const deleteHandler = (portfolioId: string) => {
    // call delete APi
    console.log('DELETED ID: ', portfolioId);
  };

  return(
    <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
    <Container
          maxWidth="lg"
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <Typography sx={{ mb: 3 }} variant="h4">
            {pageContent.title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <Button variant="contained" onClick={handleOpenCreateModal}>
            {pageContent.add}
          </Button>
        </Container>
        <Container maxWidth={false}>
          <Box>
            <Modal
              open={openCreateModal}
              onClose={handleCloseCreateModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{ mt: 10 }}
            >
              <StyledModal>
                <NewPortfolio
                  content={pageContent.newPortfolioModal}
                  onModifyPortfolio={createHandler}
                />
              </StyledModal>
            </Modal>
          </Box>
          {portfolioStore.portfolio.map((portfolio) => (
            <PortfolioCard
              content={pageContent}
              portfolio={portfolio}
              key={portfolio.id}
              onUpdate={updateHandler}
              onDelete={deleteHandler}
            />
          ))}
        </Container>
        </Box>
  )
})

export default PortfolioList;
  
