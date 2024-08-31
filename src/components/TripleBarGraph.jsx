import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TripleBarGraph = ({
  data,
  seriesData = [],
  horizontal = false,
  title = "",
  columnWidth = "80%",
  month = [],
  enabledOnSeries = [false, false, false],
  dataLabelSuffix="",
  XAxisTitle = "",  
  YAxisTitle = "", 
  
}) => {
  const months = Array(12).fill(0);

  // const monthStr = `${month}`

  // const elevatevalues = (key) => {
  //   return months.map((_, index) => {
  //       const i = index + 1;
  //         const searchedData = data.find((item) => {
  //           return Object.keys(item)[1].split("-")[1] == i 
  //         }) 
  //         return searchedData ? searchedData[`${key}-${i}`] : 0
  //     })
  // }

  const category = data?.map((item) => item.description) || [];

  const defaultSeries = [
    {
      name: "AOP-Target",
      data: data?.map(item => item.aop) || [],
  },
  {
      name: "PV-Target",
      data: data?.map(item => item.pv) || [],
  },
  {
      name: "Actual Revenue",
      data: data?.map(item => item.amount) || [],
  },
  ];

  const series = seriesData.length > 0 ? seriesData : defaultSeries;

  // const colors = ["#FFA0A0", "#c4f4a0", "#B9D9EB"];
  const colors = ["#5cccb7", "#FF9999", "#f9a8d4"];

  const offsetY = horizontal ? 0 : -16;

  const options = {
    chart: {
      height: 440,
      type: "bar",
      background: "#3e454d",
      
    },
    title: {
      text: title,
      align: "center",
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        color: "#ffffff",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val} ${dataLabelSuffix}`,
      enabledOnSeries: enabledOnSeries
        ?.map((enabled, index) => (enabled ? index : -1))
        .filter((index) => index !== -1),
      offsetY: offsetY,
      style: {
        colors: ["transparent"],
        fontSize: "8px",
        fontWeight: 'bold',
    }, 
    background: {
        enabled: true, 
        borderRadius: 0,
        borderWidth: 0, 
        borderColor: "transparent", 
      },
    },
    xaxis: {
      categories: category,
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
          colors: "#ffffff",
          fontSize: "10px",
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
          },
      labels: {
        style: {
          colors: "#ffffff",
          fontSize: "9px",
        },
        formatter: (value) => {
          return Math.round(value);
      }
      },
    },
    plotOptions: {
      bar: {
        columnWidth: columnWidth,
        horizontal: horizontal,
        borderRadius: 2,
        dataLabels: {
          style: {
            colors: "#fff",
          },
          position: "top",
        },
      },
    },
    stroke: {
      colors: ["transparent"],
      width: 1,
    },
    grid: {
      borderColor: "transparent",
      strokeDashArray: 0,
    },
    fill: {
      colors: colors,
    },
    legend: {
      show: true,
      colors: colors,
      position: "bottom",
      labels: {
        colors: "#ffffff",
      },
      markers: {
        fillColors: colors,
      },
      fontSize: "10px",
      fontWeight: "bold",
    },
  };

  return (
    <ReactApexChart options={options} series={series} type="bar" height={440} />
  );
};

export default TripleBarGraph;
