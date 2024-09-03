import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TripleBarGraph = ({
  data,
  seriesData = [],
  horizontal = false,
  title = "",
  columnWidth = "90%",
  month = [],
  enabledOnSeries = [false, false, false],
  dataLabelSuffix="",
  XAxisTitle = "",  
  YAxisTitle = "", 
  YAxisSecondaryTitle = "Acheievement(%)",
  data1,
  data2,
  data3,
  data4,
  
}) => {

  let max1 = Math.max(
    ...(data1 || []),
    ...(data2 || []),
    ...(data3 || []),
  )

  max1 = Math.round(max1)

  let max2 = Math.max(
    ...(data4 || [])
  )

  max2 = Math.round(max2)
  const months = Array(12).fill(0);

  const category = data?.map((item) => item.description) || [];

  const defaultSeries = [];

  const series = seriesData.length > 0 ? seriesData : defaultSeries;

  const colors = ["#5cccb7", "#ffab2d", "#f9a8d4", "#b8ee30"];
  // const BarBorderColors = ["#28a745", "#b8ee30", "#e83e8c","#b8ee30"];

  const offsetX = horizontal ? 0 : -1;
  const offsetY = horizontal ? 0 : -7;

  const options = {
    chart: {
      height: 440,
      type: "line",
      background: "#3e454d",
      stacked: false,
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
      formatter: (val, { seriesIndex }) => (seriesIndex === 3 ? `${val}%` : `${val} ${dataLabelSuffix}`),
      enabledOnSeries: [0,1,2,3],
      offsetX: offsetX,
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
    // yaxis: [
    //   {
    //     title: {
    //       text: YAxisTitle,
    //       style: {
    //         color: "#ffffff",
    //         fontSize: "17px",
    //         fontWeight: "bold",
    //       },
    //     },
    //     labels: {
    //       style: {
    //         colors: "#ffffff",
    //         fontSize: "9px",
    //       },
    //     },
    //   },
    //   {
    //     opposite: true,
    //     min:0,
    //     // max:150,
    //     title: {
    //       text: YAxisSecondaryTitle,
    //       style: {
    //         color: "#ffffff",
    //         fontSize: "17px",
    //         fontWeight: "bold",
    //       },
    //     },
    //     labels: {
    //       style: {
    //         colors: "#ffffff",
    //         fontSize: "9px",
    //       },
    //       // formatter: (value) => `${value}%`,
    //       formatter: (value) => `${value}`,
    //     },
    //   },
    // ],
    yaxis: [
      {
        title: {
          text: 'Revenue (₹) Lac', 
          style:{
            color: "#ffffff",
            fontSize: '18px'
          } 
        },
        labels: {
          formatter: function (val) {
            return val.toFixed(0);
          },
          
          style: {
            colors: "#ffffff",
            fontSize: "9px",
          },
        },
        min:0,
        max:max1
      }, 
      {
        labels: {
          show:false,
          formatter: function (val) {
            return val.toFixed(0);
          },
          
          style: {
            colors: "#ffffff",
            fontSize: "9px",
          },
        },
        min:0,
        max:max1
      }, 
      {
        labels: {
          show:false,
          formatter: function (val) {
            return val.toFixed(0);
          },
          
          style: {
            colors: "#ffffff",
            fontSize: "9px",
          },
        },
        min:0,
        max:max1
      }, 
      {
        opposite: true,
        title: {
          text: 'Achievement(%)',
          style:{
            color: "#ffffff",
            fontSize: '18px',
          }  
        },
        labels: {
          style: {
            colors: "#ffffff",
            fontSize: "9px",
          },
          formatter: function (val) {return `${val.toFixed(0)}%`;},
        },
        min:0,
        max:max2
      }
    ],

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
      width: [0.8, 0.8, 0.8, 2],
      // colors: BarBorderColors,
    },
    grid: {
      borderColor: "transparent",
      strokeDashArray: 0,
    },
    fill: {
      colors: colors,
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
    tooltip: {
      theme: "dark",  
      marker: {
        fillColors: colors,  
      },
      y: {
        formatter: function(value, { seriesIndex }) {
          if (seriesIndex === 3) { 
            return `${value}%`;  
          }
          return value;
        },
      },
    },
  };

  return (
    <ReactApexChart options={options} series={series} type="line" height={440} />
  );
};

export default TripleBarGraph;


//================================================================================================================


// import React, { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const TripleBarGraph = ({
//   data,
//   seriesData = [],
//   horizontal = false,
//   title = "",
//   columnWidth = "90%",
//   month = [],
//   enabledOnSeries = [false, false, false],
//   dataLabelSuffix="",
//   XAxisTitle = "",  
//   YAxisTitle = "", 
//   YAxisSecondaryTitle = "Acheievement(%)",
  
// }) => {
//   const months = Array(12).fill(0);

//   // const monthStr = `${month}`

//   // const elevatevalues = (key) => {
//   //   return months.map((_, index) => {
//   //       const i = index + 1;
//   //         const searchedData = data.find((item) => {
//   //           return Object.keys(item)[1].split("-")[1] == i 
//   //         }) 
//   //         return searchedData ? searchedData[`${key}-${i}`] : 0
//   //     })
//   // }

//   const category = data?.map((item) => item.description) || [];

//   // const SecondaryAxis = data?.map(item => {
//   //   const pv = item.pv || 0;
//   //   const amount = item.amount || 0;
//   //   const percentage = pv === 0 ? 0 : ((amount / pv) * 100).toFixed(2);
//   //   return `${percentage}%`;
//   //   }) || [];

//   const SecondaryAxis = data?.map(item => item.ach);

//   const defaultSeries = [
   
//   ];

//   const series = seriesData.length > 0 ? seriesData : defaultSeries;

//   // const colors = ["#FFA0A0", "#c4f4a0", "#B9D9EB"];
//   const colors = ["#5cccb7", "#ffab2d", "#f9a8d4", "#b8ee30"];
//   const BarBorderColors = ["#28a745", "#b8ee30", "#e83e8c","#b8ee30"];

//   const offsetX = horizontal ? 0 : -5;
//   const offsetY = horizontal ? 0 : -8;

//   const options = {
//     chart: {
//       height: 440,
//       type: "line",
//       background: "#3e454d",
//       stacked: false,
//       toolbar: {
//           show: true,
//           tools: {
//               download: true, 
//               zoomin: false, 
//               zoomout: false, 
//               reset: false,
//               pan: false,
//               zoom: false,                
//           },
//       }
      
//     },
//     title: {
//       text: title,
//       align: "center",
//       style: {
//         fontSize: "15px",
//         fontWeight: "bold",
//         color: "#ffffff",
//       },
//     },
//     dataLabels: {
//       enabled: true,
//       formatter: (val, { seriesIndex }) => (seriesIndex === 3 ? `${val}%` : `${val} ${dataLabelSuffix}`),
//       enabledOnSeries: [0,1,2,3],
//       offsetX: offsetX,
//       offsetY: offsetY,
//       style: {
//         colors: ["transparent"],
//         fontSize: "8px",
//         fontWeight: 'bold',
//     }, 
//     background: {
//         enabled: true, 
//         borderRadius: 0,
//         borderWidth: 0, 
//         borderColor: "transparent", 
//       },
//     },
//     xaxis: {
//       categories: category,
//       title: {
//         text: XAxisTitle,
//         style: {
//           color: '#ffffff',
//           fontSize: '16px',
//           fontWeight: 'bold',
//         },
//       },
//       labels: {
//         style: {
//           colors: "#ffffff",
//           fontSize: "10px",
//         },
//       },
//     },
//     yaxis: [
//       {
//         title: {
//           text: YAxisTitle,
//           style: {
//             color: "#ffffff",
//             fontSize: "17px",
//             fontWeight: "bold",
//           },
//         },
//         labels: {
//           style: {
//             colors: "#ffffff",
//             fontSize: "9px",
//           },
//         },
//       },
//       {
//         opposite: true,
//         min:0,
//         // max:150,
//         title: {
//           text: YAxisSecondaryTitle,
//           style: {
//             color: "#ffffff",
//             fontSize: "17px",
//             fontWeight: "bold",
//           },
//         },
//         labels: {
//           style: {
//             colors: "#ffffff",
//             fontSize: "9px",
//           },
//           formatter: (value) => `${value}%`,
//         },
//       },
//     ],
//     // yaxis: {
//     //   title: {
//     //         text: YAxisTitle,
//     //         style: {
//     //           color: '#ffffff',
//     //           fontSize: '17px',
//     //           fontWeight: 'bold',
//     //         },
//     //       },
//     //   labels: {
//     //     style: {
//     //       colors: "#ffffff",
//     //       fontSize: "9px",
//     //     },
//     //     formatter: (value) => {
//     //       return Math.round(value);
//     //   }
//     //   },
//     // },

//     plotOptions: {
//       bar: {
//         columnWidth: columnWidth,
//         horizontal: horizontal,
//         borderRadius: 2,
//         dataLabels: {
//           style: {
//             colors: "#fff",
//           },
//           position: "top",
//         },
//       },
//     },
//     stroke: {
//       // colors: ["transparent", "transparent", "transparent", "#b8ee30"],
//       curve: 'smooth',
//       width: [0.8, 0.8, 0.8, 2],
//       colors: BarBorderColors,
//     },
//     grid: {
//       borderColor: "transparent",
//       strokeDashArray: 0,
//     },
//     fill: {
//       colors: colors,
//     },
//     markers: {
//       size: 6, 
//       colors: ['#b8ee30'], 
//       strokeColor: 'black', 
//       strokeWidth: 0.5, 
//       hover: {
//           size: 6, 
//       }
//   },
//     legend: {
//       show: true,
//       colors: colors,
//       position: "bottom",
//       labels: {
//         colors: "#ffffff",
//       },
//       markers: {
//         fillColors: colors,
//       },
//       fontSize: "10px",
//       fontWeight: "bold",
//     },
//     tooltip: {
//       theme: "dark",  
//       marker: {
//         fillColors: colors,  
//       },
//       y: {
//         formatter: function(value, { seriesIndex }) {
//           if (seriesIndex === 3) { 
//             return `${value}%`;  
//           }
//           return value;
//         },
//       },
//     },
//   };

//   return (
//     <ReactApexChart options={options} series={series} type="line" height={440} />
//   );
// };

// export default TripleBarGraph;
