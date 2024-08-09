import React from "react";
import ReactApexChart from "react-apexcharts";

const DoubleBarGraph2 = ({ horizontal = false, title="" }) => {
    // Static data
    const SeriesData1 = [1803, 1889, 1424, 1201, 1114, 987, 650, 550, 1120, 1000, 200, 1500];  // Example data for "Joined"
    const SeriesData2 = [1608, 1500, 987, 1100, 1000, 1100, 980, 370, 455, 1500, 970, 2000];  // Example data for "Exit"
    const category = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];  // Example categories

    const series = [
        {
            name: "Planned",
            data: SeriesData1,
        },
        {
            name: "Achieved",
            data: SeriesData2,
        },
    ];

    const options = {
        chart: {
            height: 360,
            type: 'bar',
            background: '#3e454d',
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
            rotation: 270,
            enabledOnSeries: [0, 1],
            style: {
                colors: ["white"],
                fontSize: "7px",
                fontWeight: 'bold',
            },
        },
        xaxis: {
            categories: category,
            labels:{
                style:{
                    colors:'#ffffff',
                    fontSize: '10px',
                }
            }
        },
        yaxis:{
            labels:{
                style:{
                    colors:'#ffffff',
                    fontSize: '9px',
                }
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '70%',
                horizontal: horizontal,
                borderRadius: 2,
                dataLabels: {
                    style: {
                        colors: '#fff',
                        position: 'top',
                    },
                },
            },
            series: {
                dataLabels: {
                    enabled: true,
                    padding: 10,
                    rotation: 270
                }
            }
        },
        stroke: {
            colors: ["transparent"],
            width: 2
        },
        grid: {
            borderColor: 'transparent',
            strokeDashArray: 0,
        },
        fill: {
            colors: ["#FFA0A0", "#86af6b"]
        },
        legend: {
            show: false 
        }
    };

    return (
        <ReactApexChart options={options} series={series} type="bar" height={360} />
    );
}

export default DoubleBarGraph2;
