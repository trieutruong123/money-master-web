import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface IProps {
  data: Array<any>;
  timeInterval: any;
}

export const CandleStickChart = ({ timeInterval, data }: IProps) => {
  const candleStickData = Object.values(data).slice(0,timeInterval.barAmount).map((item: any) => {
    return {
      x: new Date(item.t*1000),
      y: [item.o, item.h,item.l,item.c],
    };
  });
  const candleStickSeries = [{ name: 'candestick', data: candleStickData }];
  const candleStickOptions: any = {
    chart: {
      height: 350,
      type: 'candlestick',
      zoom: {
        autoScaleYaxis: true,
      },
    },
    title: {
      text: '',

      align: 'left',
      margin: 10,
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 6,
      labels: {
        formatter: function (val: any) {
          if (timeInterval.dayAmount <= 1) return dayjs(val).format('MMM DD HH:mm');
          else if (timeInterval.dayAmount <= 30) return dayjs(val).format('MMM DD HH:00');
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
  const AnyComponent = ReactApexChart as any;
  return (
    <AnyComponent
      options={candleStickOptions}
      series={candleStickSeries}
      type={'candlestick'}
      height="350"
      width={'100%'}
    />
  );
};