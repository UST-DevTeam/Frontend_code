import React from "react";
import ReactApexChart from "react-apexcharts";

const AreaChart = (data) => {
  let graphData = data?.data;

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
        labels: {
          style: {
            colors: "White",
            fontSize: "13px",
            fontWeight: "14px"

          },
        },
      },
      yaxis: {
        labels: {
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
