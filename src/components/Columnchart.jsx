import React from "react";
import ReactApexChart from "react-apexcharts";

const ColumnChart = ({data,colors}) => {
  const chartData = {
    series: [{
      name:"Count",
      data: data
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        background:''
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
          dataLabels: {
            position: 'top',
          }
        }
      },
      xaxis: {
        categories: [
          ['Open Qunatity'],
          ['Workdone Quantity'],
          ['Invoiced Quantity'],     
        ],
        labels: {
          style: {
            colors: 'White',
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: 'White',
          }
        }
      },
      grid: {
        show: false,
        borderColor: '#1c1c1c'
      },
      // tooltip: {
      //   x: {
      //     show: false,
      //   }
      // },
      legend: {
        show: true,
        labels: {
          colors: '#ffffff',
        },
      },
    }
  };

  return (
  
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
  );
};
export default ColumnChart;
