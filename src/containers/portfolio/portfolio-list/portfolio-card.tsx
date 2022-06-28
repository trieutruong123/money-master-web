import classes from "./style/portfolio-card.module.css";
import Button from "@mui/material/Button";
import { Link } from "shared/components";
import * as React from "react";
import Modal from "@mui/material/Modal";
import UpdatePortfolio from "./modify-portfolio";
import DeletePortfolio from "./delete-portfolio";

function PortfolioCard(props: any) {
  const pageContent = props.content;

  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const updateHandler = (data: any) => {
    props.onUpdate({newName:data.name,newCurrency:data.initialCurrency,portfolioId:props.portfolioId});
    setOpenUpdateModal(false);
  };
  const deleteHandler = () => {
    props.onDelete(props.portfolioId);
    setOpenDeleteModal(false);
  };

  const { portfolio } = props;
  return (
    <div className={classes.content}>
      <div className={classes.infoPannel}>
        <h2 className={classes.name}>{portfolio.name}</h2>
        <div className={classes.balance}>
          <h3>{`${portfolio.initialCurrency}`}</h3>
        </div>
      </div>
      <div className={classes.buttonPanel}>
        <Link href={"/portfolio/" + portfolio.id}>
          <Button variant="contained" color="info">
            {pageContent.portfolioCard.detail}
          </Button>
        </Link>

        <Button
          variant="contained"
          color="warning"
          onClick={handleOpenUpdateModal}
        >
          {pageContent.portfolioCard.update}
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleOpenDeleteModal}
        >
          {pageContent.portfolioCard.delete}
        </Button>
      </div>

      {/* update modal */}
      <Modal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ mt: 10 }}
      >
        <UpdatePortfolio
          content={pageContent.updatePortfolioModal}
          onModifyPortfolio={updateHandler}
        />
      </Modal>

      {/* delete modal */}
      <DeletePortfolio
        content={pageContent.deletePortfolioModal}
        openDeleteModal={openDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        deleteHandler={deleteHandler}
      />
    </div>
  );
}

export default PortfolioCard;
