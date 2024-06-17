import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const DountChart = ({ data }) => {

  let name = data?.map(item => item.status) || []
  let dataSeries = data?.map(item => item.count) || []

  const options = {
    chart: {
      type: 'donut',
      background: '#1c1c1c',
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
        },
        export: {
          csv: {
            filename: "Project_Status_Dount_Chart",
            columnDelimiter: ',',
            headerCategory: 'Project Status',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            }
          },
          svg: {
            filename: 'Project_Status_Dount_Chart',
          },
          png: {
            filename: 'Project_Status_Dount_Chart',
          }
        },
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size:'65%',
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "Total Projects",
              fontSize: '18px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: '#ffffff',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b
                }, 0)
              },
              className: 'apexcharts-donut-total-custom' 
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
      colors: ['#2B98D6','#2bc155', '#D07407']
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
    },
  }


  return (
    
      <ReactApexChart
        options={options}
        type="donut"
        series={options.series}
        height="350"
      />
  );
};

export default DountChart;