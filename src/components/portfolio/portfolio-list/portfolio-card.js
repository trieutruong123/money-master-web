import classes from "./portfolio-card.module.css";
import Button from "@mui/material/Button";
import { Link } from "components";

function PortfolioCard(props) {
  const { portfolio } = props;
  return (
    <div className={classes.content}>
      <div className={classes.infoPannel}>
        <h2 className={classes.name}>{portfolio.name}</h2>
        <div className={classes.balance}>
          <h3>{`${portfolio.balance} ${portfolio.currency}`}</h3>
        </div>
      </div>
      <div className={classes.buttonPanel}>
        <Link href={"/portfolio/" + portfolio.id}>
          <Button variant="contained" color="info">
            Detail
          </Button>
        </Link>

        <Link href="#">
          <Button variant="contained" color="warning">
            Update
          </Button>
        </Link>
        <Link href="#">
          <Button variant="contained" color="error">
            Delete
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default PortfolioCard;
