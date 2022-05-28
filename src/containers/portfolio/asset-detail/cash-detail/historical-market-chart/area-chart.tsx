import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface IProps {
  data: Array<any>;
  timeInterval: number;
}

export const AreaChart = ({ timeInterval, data }: IProps) => {
  const areaData = Object.values(data).map((item: any) => {
    return [item.t * 1000, item.c];
  });
  const areaSeries = [{ name: 'Price', data: areaData }];
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
      text: '',
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
        labels: {
          formatter: function (val: any) {
            if (timeInterval <= 1) return dayjs(val).format('MMM DD HH:mm');
            else if (timeInterval <= 30)
              return dayjs(val).format('MMM DD HH:00');
            else return dayjs(val).format('MMM DD YYYY');
          },
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
    <AnyComponent
      options={areaOptions}
      series={areaSeries}
      type={'area'}
      height="350"
      width={'100%'}
    />
  );
};
