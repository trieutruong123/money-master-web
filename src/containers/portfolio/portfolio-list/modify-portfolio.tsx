import { useRef, useState } from 'react';
import classes from './modify-portfolio.module.css';
import { getCurrencyByCode, getSupportedCurrencyList } from 'shared/helpers/currency-info';
import React from 'react';

const ModifyPortfolio = (
  props: any,
) => {
  const pageContent = props.content;
  const [portfolioName, setPortfolioName] = useState<string>("");
  const [initialCurrency, setCurrency] = useState<string>("");
  const [currencyList, setCurrencyList] = React.useState<any>({});
  React.useEffect(() => {
    
    getSupportedCurrencyList().forEach(currency => {
      setCurrencyList((prevState: any) => ({ ...prevState, [currency.code]: currency.name })
      )
    })
  }, [])

  function submitHandler(event: any) {
    event.preventDefault();

    props.onModifyPortfolio({
      name: portfolioName,
      initialCurrency: initialCurrency.toUpperCase()||'USD',
      initialCash: 0,
      initalCashName: getCurrencyByCode(initialCurrency.toUpperCase()||'USD')?.name,
      initialCashDescription: getCurrencyByCode(initialCurrency.toUpperCase()||'USD')?.name,
    });
  }

  const handlePortfolioNameChanged = (event: any) => {
    setPortfolioName(event.target.value);
  }

  const handleCurrencySelectionChanged = (event: any) => {
    setCurrency(event.target.value);
  }

  return (
    <div className={classes.body}>
      <h1 className={classes.title}>{pageContent.title}</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">{pageContent.name}</label>
          <input id="name" onChange={handlePortfolioNameChanged} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="currency">{pageContent.currency}</label>
          <select id="currency" onChange={handleCurrencySelectionChanged} required >
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

export default ModifyPortfolio
