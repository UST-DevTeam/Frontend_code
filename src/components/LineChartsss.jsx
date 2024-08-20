import React from "react";
import ReactApexChart from "react-apexcharts";

const LineChartsss = ({ data, horizontal = false, title="" }) => {
    let SeriesData = data?.map(item => item.count) ||[];  
    let category = data?.map(item => item.description) ||[];
    const series = [
        {
            name: "Active Employee",
            data: SeriesData
        },
    ];

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
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '13px',
                fontWeight: 'bold',
                colors: ['transparent'],
            }, 
            offsetY: -7,
            dropShadow: {
                enabled: false,
            }, 
            background: {
                enabled: true,
                borderColor: 'transparent',
              },          
        },
        xaxis: {
            categories: category,
            labels: {
                style: {
                    colors: '#ffffff',
                    fontSize: '10px',
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#ffffff',
                    fontSize: '9px',
                }
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3,
            // colors: '#f9a3a4'
            colors: '#5cccb7'
        },
        grid: {
            borderColor: 'transparent',
            strokeDashArray: 0,
        },
        
    };

    return (
        <ReactApexChart options={options} series={series} type="line" height={400} />
    );
}

export default LineChartsss;


