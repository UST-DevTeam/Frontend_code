import autoprefixer from "autoprefixer";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TripleLineBarGraph = ({
  data,
  seriesData = [],
  horizontal = false,
  title = "",
  columnWidth = "80%",
  dataLabelSuffix="", 
  XAxisTitle = "",  
  YAxisTitle = "", 
  lineDataKey = "",
}) => {

  const category = data?.map((item) => item.description) || [];

//   const lineDataKey = data?.map(item => {
//     const aop = item.aop || 0;
//     const pv = item.pv || 0; 
//     const percentage = aop === 0 ? 0 : ((pv / aop) * 100).toFixed(1);
//     return `${percentage}%`; 
// });
const computeLineData = (key) => {
    switch (key) {
      case "Acheivement":
        return data?.map((item) => {
          const pv = item.pv || 0;
          const amount = item.amount || 0;
          const percentage = pv === 0 ? 0 : ((amount / pv) * 100).toFixed(1);
          return `${percentage}%`;
        }) || [];
      default:
        return [];
    }
  };

  const lineData = computeLineData(lineDataKey);

  const defaultSeries = [
    {
        name: "AOP -Target",
        data: data?.map(item => item.aop) || [],
        type: "bar",
      },
    {
        name: "PV - Target",
        data: data?.map(item => item.pv) || [],
        type: "bar",
      },
      {
        name: "Achievement",
        data: data?.map(item => item.amount) || [],
        type: "bar",
      },
      {
        name: "Achievement Line",
        type: "line",
        data: lineData,
      },
  ];

//   if (lineDataKey) {
//     const lineSeriesData = data?.map(item => item[lineDataKey]) || []; 
//     defaultSeries.push({
//       name: lineSeriesName,
//       data: lineSeriesData,
//       type: "line",
//     });
//   }

  const series = seriesData.length > 0 ? seriesData : defaultSeries;

  // const colors = ["#FFA0A0", "#c4f4a0", "#B9D9EB"];
  const colors = ["#5cccb7", "#FF9999", "#f9a8d4", "#b8ee30"];

  const offsetY = horizontal ? 0 : -7;

  const options = {
    chart: {
      height: 440,
      type: "line",
      background: "#3e454d",
      toolbar: {
        show: true,
        tools: {
            download: true, 
            zoomin: false, 
            zoomout: false, 
            reset: false,
            pan: false,
            zoom: false,                
        },
    }
      
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
      formatter: (val, { seriesIndex }) => {
        if (seriesIndex === 3) {
          return `${val}%`; 
        }
        return `${val} ${dataLabelSuffix}`.trim();
      },     
      enabledOnSeries: [0,1,2,3],
      offsetY: offsetY,
      style: {
        colors: ["transparent"],
        fontSize: "9px",
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
    //     formatter: (value) => {
    //       return Math.round(value);
    //   },
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
      colors: ["transparent", "transparent", "transparent", "#b8ee30"],
      curve: 'smooth',
      width: [1, 1, 1, 2],
    },
    grid: {
      borderColor: "transparent",
      strokeDashArray: 0,
    },
    markers: {
      size: 6, 
      colors: ['#b8ee30'], 
      strokeColor: 'black', 
      strokeWidth: 0.5, 
      hover: {
          size: 6, 
      }
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
    <ReactApexChart options={options} series={series} type="line" height={440} />
  );
};

export default TripleLineBarGraph;
