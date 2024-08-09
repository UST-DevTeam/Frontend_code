import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const DountChart = ({ data , label=""}) => {

  let name = data?.map(item => item.status) || []
  let dataSeries = data?.map(item => item.count) || []

  const fillColors = ['#7eb0d5', '#4421af', '#7eb0d5', '#7eb0d5'];

  const options = {
    chart: {
      type: 'donut',
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
            filename: "Partner_Status_Dount_Chart",
            columnDelimiter: ',',
            headerCategory: 'Project Status',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            }
          },
          svg: {
            filename: 'Partner_Status_Dount_Chart',
          },
          png: {
            filename: 'Partner_Status_Dount_Chart',
          }
        },
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size:'75%',
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: label,
              fontSize: '18px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: '#ffffff',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b
                }, 0)
              },
            }
          },
        }
      }
    },
    dataLabels: {
      enabled: true,
        style: {
        fontSize: '16px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['#fff']
      },
    },
    fill:{
      colors: ['#7eb0d5','#4421af', "#7eb0d5", "#7eb0d5"]
    },
    series: dataSeries,
    labels: name,
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom'
        }
      }
    }],
    legend:{
      position:"right",
      // horizontalAlign: 'bottom',
      fontSize: '18px',
      offsetY: 100,
      offsetX: -10,
      labels:{
        colors:'#ffffff'
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        fillColors: fillColors,
        radius: 12,
      },
    },
  }


  return (
    
      <ReactApexChart
        options={options}
        type="donut"
        series={options.series}
        height="300"
      />
  );
};

export default DountChart;