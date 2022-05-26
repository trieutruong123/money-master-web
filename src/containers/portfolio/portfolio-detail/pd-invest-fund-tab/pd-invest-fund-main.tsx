import { observer } from 'mobx-react-lite';
import PDInvestFundOverview from './pd-invest-fund-overview';
import PDTransactionHistory from './pd-transaction-history';

const PDInvestFundTab = observer(() => {
  return <>
    <PDInvestFundOverview />
    <PDTransactionHistory />
  </>;
});

export default PDInvestFundTab;
