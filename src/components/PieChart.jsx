import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ data,colors }) => {

  let name = data?.map(item => item.status) || []
  let dataSeries = data?.map(item => item.count) || []

  let colorSeries = ["#5cccb7", "#ffab2d"]

  const options = {
    chart: {
      type: 'pie',
      background: 'transparent',
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
        },
        export: {
          csv: {
            filename: "",
            columnDelimiter: '',
            headerCategory: '',
            headerValue: '',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            }
          },
          svg: {
            filename: '',
          },
          png: {
            filename: '',
          }
        },
      }
    },
    dataLabels: {
      enabled: true
    },
    series: dataSeries,
    labels: name,
    // colors: ['#2B98D6','#2bc155', '#D07407',"#DCB12D","#3F9F9F"],
    colors:colorSeries,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    legend:{
      position:"bottom",
      labels:{
        colors:'#ffffff'
      },
    },
  }


  return (
    
      <ReactApexChart
        options={options}
        type="pie"
        series={options.series}
        height="450"
      />
  );
};

export default PieChart;