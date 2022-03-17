import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface IProps {
  data: Array<any>;
  timeInterval: number;
}

export const CandleStickChart = ({ timeInterval, data }: IProps) => {
  const candleStickData = data.map((item: Array<number>) => {
    return {
      x: new Date(item[0]),
      y: [item[1], item[2], item[3], item[4]],
    };
  });
  const candleStickSeries = [{ name: 'candestick', data: candleStickData }];
  const candleStickOptions: any = {
    chart: {
      height: 350,
      type: 'candlestick',
    },
    title: {
      text: `Bitcoin - Updated at ${dayjs(data[data.length - 1]?.x).format(
        'MMM DD HH:mm',
      )}`,
      align: 'left',
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 6,
      labels: {
        formatter: function (val: any) {
          if (timeInterval <= 1) return dayjs(val).format('MMM DD HH:mm');
          else if (timeInterval <= 30) return dayjs(val).format('MMM DD HH:00');
          else return dayjs(val).format('MMM DD YYYY');
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
    },
  };
  return (
      <ReactApexChart
        options={candleStickOptions}
        series={candleStickSeries}
        type={'candlestick'}
        height={350}
        width={'800'}
      />
  );
};
