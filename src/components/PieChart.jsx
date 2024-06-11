import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ data }) => {
  let name = data?.map(item => item.status) || []
  let dataSeries = data?.map(item => item.count) || []


  const options = {

    chart: {
      type: 'pie',
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
        },
        export: {
          csv: {
            filename: "Project_Status_Pie_Chart",
            columnDelimiter: ',',
            headerCategory: 'Project Status',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            }
          },
          svg: {
            filename: 'Project_Status_Pie_Chart',
          },
          png: {
            filename: 'Project_Status_Pie_Chart',
          }
        },
      }
    },

    title: {
      text: 'Project Status',
      align: 'left',
      style: {
        fontSize: '14px',
        fontWeight: 'normal',
        fontFamily: 'poppins, sans-serif',
        color: '#fff',
      },
    },

    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      labels: {
        colors: '#ffffff'
      }
    },
    labels: name,
    series: dataSeries,

  }

  console.log("options___",options)

  return (
    <div className="bg-[#3e454d] rounded-lg">
      <ReactApexChart
        options={options}
        type="pie"
        series={options.series}
        height="400"
      />
    // </div>  
  );
};

export default PieChart;