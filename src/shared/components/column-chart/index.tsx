import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import React from 'react';
import { getCurrencyByCode } from 'shared/helpers';
import { ProfitLossItem } from 'shared/models';
import { roundAndAddDotAndCommaSeparator } from 'utils';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface IProps {
  data: Array<ProfitLossItem>;
  yAxisLabel: string;
  xAxisLabel: string;
  currencyCode: string;
  title?: string;
}

const ColumnChart = ({
  data,
  xAxisLabel,
  yAxisLabel,
  currencyCode,
  title,
}: IProps) => {
  const xDatas = data.map((item: ProfitLossItem) => Date.parse(item.endTime));
  const yDatas = data.map((item: ProfitLossItem) => item.amount);
  console.log(xDatas);
  const max = yDatas.reduce((prev, cur, idx) => Math.max(prev, cur), 0);
  const min = yDatas.reduce((prev, cur, idx) => Math.min(prev, cur), 0);
  const areaSeries = [{ name: xAxisLabel, data: yDatas }];
  const areaOptions: any = {
    series: [
      {
        name: title,
        data: yDatas,
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: min,
              to: 0,
              color: '#F15B46',
            },
            {
              from: 0,
              to: max,
              color: '#FEB019',
            },
          ],
        },
        columnWidth: '80%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      title: {
        text: yAxisLabel,
      },
      labels: {
        formatter: function (y: number) {
          return `${roundAndAddDotAndCommaSeparator(y, 2)} ${
            getCurrencyByCode(currencyCode || 'USD')?.symbol || ''
          } `;
        },
      },
    },
    xaxis: {
      title: {
        text: xAxisLabel,
      },
      type: 'datetime',
      categories: xDatas,
      labels: {
        rotate: -90,
        formatter: function (val: any) {
          return dayjs(new Date(val)).format('MMM DD');
        },
      },
    },
  };

  const AnyComponent = ReactApexChart as any;
  return (
    <React.Fragment>
      <AnyComponent
        options={areaOptions}
        series={areaSeries}
        type={'bar'}
        height="350"
        width={'100%'}
      />
    </React.Fragment>
  );
};

export default ColumnChart;
