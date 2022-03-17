import { useRef } from 'react';
import classes from './modify-portfolio.module.css';
import { currencyList } from '../../../helpers/enum';
import React from 'react';

const ModifyPortfolio = (
  props: any,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const pageContent = props.content;

  const nameRef: any = useRef();
  const currencyRef: any = useRef();
  function submitHandler(event: any) {
    event.preventDefault();

    const portfolioName = nameRef.current.value;
    const currency = currencyRef.current.value;

    props.onModifyPortfolio({
      portfolioName,
      currency,
    });
  }

  return (
    <div ref={ref} className={classes.body}>
      <h1 className={classes.title}>{pageContent.title}</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">{pageContent.name}</label>
          <input id="name" required ref={nameRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="currency">{pageContent.currency}</label>
          <select id="currency" required ref={currencyRef}>
            {Object.keys(currencyList).map((currency, index) => (
              <option
                key={index}
                value={currency}
              >{`${currencyList[currency]} (${currency})`}</option>
            ))}
          </select>
        </div>
        <button className={classes.btn}>{pageContent.submit}</button>
      </form>
    </div>
  );
};

export default React.forwardRef(ModifyPortfolio);
