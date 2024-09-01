import React from "react";
import ReactApexChart from "react-apexcharts";

const BarLineGraph = ({ data = [], seriesData = [], horizontal = false, title = "", XAxisTitle = "", YAxisTitle = "", YAxisSecondaryTitle = "Acheievement(%)",}) => {

    const category = data?.map(item => item.description);

    const percentageData = data?.map(item => {
        const plan = item.plan || 0;
        const achieved = item.achievement || 0; 
        const percentage = plan === 0 ? 0 : ((achieved / plan) * 100).toFixed(1);
        return `${percentage}%`; 
    });
        
    const defaultSeries = [
        {
            name: "Planned",
            type: "bar",
            data: data?.map(item => item.plan) || [],
          },
          {
            name: "Achieved",
            type: "bar",
            data: data?.map(item => item.achievement) || [],
          },
          {
            name: "Acheievement(%)",
            type: "line",
            data: percentageData,
        },
    ];

    const series = seriesData.length > 0 ? seriesData : defaultSeries;

    const colors = ["#5cccb7", "#ffab2d", "#b8ee30"];
    const BarBorderColors = ["#28a745", "#b8ee30","#b8ee30"];

    const options = {
        chart: {
            height: 440,
            type: 'line', 
            background: '#3e454d',
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
            align: 'center',
            style: {
                fontSize: '15px',
                fontWeight: 'bold',
                color: '#ffffff'
            }
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [0,1,2,3],
            formatter: (val, { seriesIndex }) => {
                if (seriesIndex === 2) {
                  return `${val}%`;
                }
                return val;
              },
            offsetY: -7,
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
          yaxis: [
            {
              title: {
                text: YAxisTitle,
                style: {
                  color: "#ffffff",
                  fontSize: "17px",
                  fontWeight: "bold",
                },
              },
              labels: {
                style: {
                  colors: "#ffffff",
                  fontSize: "9px",
                },
              },
            },
            {
              opposite: true,
              min: 0,
              max: 650,
              tickAmount: 7,
              title: {
                text: YAxisSecondaryTitle,
                style: {
                  color: "#ffffff",
                  fontSize: "17px",
                  fontWeight: "bold",
                },
              },
              labels: {
                style: {
                  colors: "#ffffff",
                  fontSize: "9px",
                },
                formatter: (value) => `${value}%`,
              },
            },
          ],
        plotOptions: {
            bar: {
                columnWidth: '60%',
                horizontal: horizontal,
                borderRadius: 2,
            },
        },
        stroke: {
            // colors: ["transparent", "transparent", "transparent", "#b8ee30"],
            curve: 'smooth',
            width: [0.8, 0.8, 2],
            colors: BarBorderColors,
          },
        grid: {
            borderColor: 'transparent',
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
            opacity: [1, 1, 1],
        },
        legend: {
            show: true,
            colors: colors,
            position: "bottom",
            labels: {
                colors: '#ffffff'
            },
            markers: {
                fillColors: colors,
            },
            fontSize: '10px',
            fontWeight: 'bold',
        },
        tooltip: {
            theme: "dark",  
            marker: {
              fillColors: colors,  
            },
          },
    };

    return <ReactApexChart options={options} series={series} type="line" height={440} />;
};

export default BarLineGraph;
