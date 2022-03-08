import { useRef } from "react";
import classes from "./new-portfolio.module.css";
import { currencyList } from "../../../helpers/enum";

function NewPortfolio(props) {
  const nameRef = useRef();
  const currencyRef = useRef();
  function submitHandler(event) {
    event.preventDefault();

    const portfolioName = nameRef.current.value;
    const currency = currencyRef.current.value;

    props.onCreatePortfolio({
      portfolioName,
      currency,
    });
  }

  return (
    <div className={classes.body}>
      <h1 className={classes.title}>NEW PORTFOLIO</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Portfolio Name (*)</label>
          <input id="name" required ref={nameRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="currency">Currency (*)</label>
          <select id="currency" required ref={currencyRef}>
            {Object.keys(currencyList).map((currency) => (
              <option value={currency}>{`${currencyList[currency]} (${currency})`}</option>
            ))}
          </select>
        </div>
        <button className={classes.btn}>Submit</button>
      </form>
    </div>
  );
}

export default NewPortfolio;
