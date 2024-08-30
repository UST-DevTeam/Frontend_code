import { offset } from "highcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

const AreaChart = ({data, dataLabelSuffix="", XAxisTitle = "", YAxisTitle = "", }) => {
  let graphData = data;

  let Graph = {
    series: [
      {
        name: "Acc.Revenue",
        data: graphData,
      },
    ],
    options: {
      chart: {
        height: 350,
        width: 600,
        type: "line",
      },
      plotOptions: {
        line: {
          isSlopeChart: true,
        },
      },
      grid: {
        borderColor: "#1c1c1c",
      },
      xaxis: {
        title: {
          text: XAxisTitle,
          style: {
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: 'bold',
          },
        },
        labels: {
          style: {
            colors: "White",
            fontSize: "13px",
            fontWeight: "14px"

          },
        },
      },
      yaxis: {
        title: {
          text: YAxisTitle,
          style: {
            color: '#ffffff',
            fontSize: '17px',
            fontWeight: 'bold',
          },
        },        labels: {
          style: {
            colors: "White",
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.7,
          opacityFrom: 0.6,
          opacityTo: 0.8,
          stops: [0, 90, 100],
        },
        colors: ["#FF9999"], 
      },
      colors: ["#FF9999"],
      dataLabels: {
        enabled: true,
        formatter: (val) => {
          // Ensure 'val' is a number and format with 'L' suffix
          if (typeof val === 'number') {
            return `${val} ${dataLabelSuffix}`; // E.g., "500 Lacs"
          }
          return val;
        },
        offsetY:  -4,
        offsetX: 23,
        style: {
          colors: ["white"],  
          fontSize: '10px',    
        },
      },
    },
  };

  return (
    <ReactApexChart
      options={Graph.options}
      series={Graph.series}
      type="area"
      height={350}
    />
  );
};

export default AreaChart;
