import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import React from 'react';
import { ProfitLossItem } from 'shared/models';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface IProps {
  data: Array<ProfitLossItem>;
}

 const SDLineChart = observer(({ data }: IProps) => {
  const areaData = data.map((item: ProfitLossItem) => {
    return [Date.parse(item.endTime), item.amount];
  });

  const areaSeries = [{ name: 'Price', data: data }];
  const areaOptions: any = {
    chart: {
      id: 'area-datetime',
      type: 'area',
      height: 350,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    title: {
      align: 'left',
    },
    annotations: {
      yaxis: [
        {
          y: 30,
          borderColor: '#999',
          label: {
            show: true,
            text: 'Support',
            style: {
              color: '#fff',
              background: '#00E396',
            },
          },
        },
      ],
      xaxis: [
        {
          x: new Date('14 Nov 2012').getTime(),
          borderColor: '#999',
          yAxisIndex: 0,
          label: {
            show: true,
            text: 'Rally',
            style: {
              color: '#fff',
              background: '#775DD0',
            },
          },
        },
      ],
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 6,
      labels: {
        formatter: function (val: any) {
            return dayjs.unix(val).format('MMM DD YY');
        },
      },
    },
    yaxis: {
      title: {
        text: 'Price',
      },
      tooltip: {
        enabled: true,
      },
      decimalsInFloat: 4,
    },
    tooltip: {
      x: {
        format: 'MMM DD HH:mm',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };
  const AnyComponent = ReactApexChart as any;
  return (
    <React.Fragment>
      <AnyComponent
        options={areaOptions}
        series={areaSeries}
        type={'area'}
        height="350"
        width={'100%'}
      />
    </React.Fragment>
  );
});

export default SDLineChart;