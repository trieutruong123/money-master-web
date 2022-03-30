import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { precisionRound } from 'utils/number';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface IProps {
  data: Array<any>;
  timeInterval: string;
}

export const AreaChart = ({ timeInterval, data }: IProps) => {
  const areaData = data.map((item: Array<number>) => {
    return [item[0], item[1]];
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
      text: 'Bitcoin',
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
          if (timeInterval === '15' || timeInterval === '30')
            return dayjs.unix(val).format('MMM DD HH:mm');
          else if (timeInterval === '60')
            return dayjs.unix(val).format('MMM DD HH:00');
          else if (timeInterval === 'D') return dayjs.unix(val).format('MMM DD YY');
          else return dayjs.unix(val).format('MMM DD YYYY');
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
  return (
    <ReactApexChart
      options={areaOptions}
      series={areaSeries}
      type={'area'}
      height="350"
      width={'100%'}
    />
  );
};
