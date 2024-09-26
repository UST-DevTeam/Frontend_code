import React from "react";
import ReactApexChart from "react-apexcharts";

const LineTripleGraph = ({ data, horizontal = false, seriesData = [], title="", XAxisTitle = "", YAxisTitle = "", dataLabelSuffix="", }) => {

    let category = data?.map(item => item.description) ||[];
    const defaultSeries = [
        {
            name: "Project Gross Margin (%)",
            data: data?.map(item => item.projectedGrossMargin) ||[],
        },
        {
            name: "Actual Gross Margin (%)",
            data: data?.map(item => item.actualGrossMargin) ||[],
        },
        {
            name: "Net Margin (%)",
            data: data?.map(item => item.netMargin) ||[],
        },
    ];

    const series = seriesData.length > 0 ? seriesData : defaultSeries;

    const colors = ["#b8ee30", "#f4d3a8", "#BDA9EB"];

    const options = {
        chart: {
            height: 400,
            type: 'line',
            background: '#3e454d',
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
            },
        },
        legend:{
            show: true, 
            labels: {
                colors: '#ffffff',
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val} ${dataLabelSuffix}`,
            style: {
                fontSize: '10px',
                fontWeight: 'bold',
                colors: ['transparent'],
            }, 
            offsetY: -7,
            dropShadow: {
                enabled: false,
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
                    colors: '#ffffff',
                    fontSize: '10px',
                }
            }
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
                    colors: '#ffffff',
                    fontSize: '9px',
                }
            }
        },
        stroke: {
            colors: ["#b8ee30", "#f4d3a8", "#BDA9EB"],
            curve: 'smooth',
            width: [2.5, 2.5, 2.5],
            // colors: BarBorderColors,
          },
        grid: {
            borderColor: 'transparent',
            strokeDashArray: 0,
        },
        markers: {
            size: 6, 
            colors: ['#b8ee30', '#f4d3a8', '#BDA9EB'],
            strokeColor: 'black', 
            strokeWidth:1, 
            hover: {
                size: 8, 
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
        tooltip: {
            theme: "dark",  
            marker: {
                fillColors: ['#b8ee30', '#f4d3a8', '#BDA9EB'],  
            },
            },  
        
    };

    return (
        <ReactApexChart options={options} series={series} type="line" height={400} />
    );
}

export default LineTripleGraph;


