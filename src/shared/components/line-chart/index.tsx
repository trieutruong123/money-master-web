import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import React from 'react';
import { getCurrencyByCode } from 'shared/helpers';
import { ProfitLossItem } from 'shared/models';
import { colorScheme, roundAndAddDotAndCommaSeparator } from 'utils';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface IProps {
  xAxisLabel: string;
  yAxisLabel: string;
  currencyCode: string;
  data: Array<ProfitLossItem>;
  title: string;
}

const LineChart = ({
  data,
  xAxisLabel,
  yAxisLabel,
  currencyCode,
  title,
}: IProps) => {
  const yDatas = data.map((item: ProfitLossItem) => item.amount);
  const xDatas = data.map((item: ProfitLossItem) => Date.parse(item.endTime));
  console.log(xDatas);
  console.log(yDatas);
  const lineSeries = [{ name: title, data: yDatas }];
  const median =
    yDatas.reduce((prev, cur, idx) => cur + prev, 0) / xDatas.length;
  const lineOptions: any = {
    series: [
      {
        data: yDatas,
      },
    ],
    chart: {
      height: 350,
      type: 'line',
      id: 'areachart-2',
    },
    annotations: {
      yaxis: [
        {
          y: median,
          borderColor: colorScheme.red500,
          label: {
            borderColor: colorScheme.red500,
            style: {
              color: '#fff',
              background: colorScheme.red500,
            },
            text: 'Median',
          },
        },
      ],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: title,
      align: 'left',
    },
    labels: xDatas,
    yaxis: {
      title: {
        text: yAxisLabel,
      },
      labels: {
        formatter: function (y: number) {
          return `${roundAndAddDotAndCommaSeparator(y, 2)} ${
            getCurrencyByCode(currencyCode || 'USD')?.symbol || ''
          }`;
        },
      },
    },
    xaxis: {
      title: {
        text: xAxisLabel,
      },
      type: 'datetime',
      formatter: function (val: any) {
        return dayjs.unix(val).format('MMM DD');
      },
    },
  };
  const AnyComponent = ReactApexChart as any;
  return (
    <React.Fragment>
      <AnyComponent
        options={lineOptions}
        series={lineSeries}
        type={'line'}
        height="350"
        width={'100%'}
      />
    </React.Fragment>
  );
};

export default LineChart;
