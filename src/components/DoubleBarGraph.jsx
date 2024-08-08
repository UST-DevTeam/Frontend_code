import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const DoubleBarGraph = ({ data, horizontal = false, title="" }) => {
    // const horizontal = data?.horizontal || false;
    let SeriesData1 = data?.map(item => item.joined) ||[];  
    let SeriesData2 = data?.map(item => item.exit) ||[];  
    let category = data?.map(item => item.description) ||[];
    // let SeriesDataMonth = data?.map(item => item.month_year) ||[];
    // let category = data?.map(item => item.description) ||[];

    const series = [
        {
            name: "Joined",
            data: SeriesData1,
        },
        {
            name: "exit",
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
            enabledOnSeries: [0,1],
            style: {
                colors: ["white"],
                fontSize: "10px",
                fontWeight: 'bold',
              },
        },
        xaxis: {
            // categories: ["AIRTEL MACRO KTK","AIRTEL MACRO UP WEST","AIRTEL SMALL CELL BIHAR & JHARKHAND","AIRTEL SMALL CELL DELHI & NCR","AIRTEL SMALL CELL ORISSA","AIRTEL SMALL CELL RAJASTHAN","AIRTEL SURVEY KOLKATA","AIRTEL TI SERVICE J&K","AIRTEL TI SERVICES AP & TELANGANA","AIRTEL TI SERVICES MPCG","AIRTEL TI SERVICES MUMBAI","AIRTEL TI SERVICES PUNJAB","AIRTEL TI SERVICES TNCH","AIRTEL TI SERVICES UP EAST"],
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
                columnWidth: '90%',
                horizontal: horizontal,
                dataLabels: {
                    style: {
                        colors: '#fff',
                        position: 'top',
                    },
                },
                // colors: {
                //     ranges: [{ from: 0, to: 200000, color: '#199afb'}],
                // },
            },
        },
        stroke: {
            colors: ["transparent"],
            width: 1
          },
        grid: {
            borderColor: 'transparent',
            strokeDashArray: 0,
        },
        fill: {
            colors: ["#B2B0EA", "#7CC674"]
        },
        legend: {
            show: false 
        }

    };
    return (<ReactApexChart options={options} series={series} type="bar" height={360} />)
}
export default DoubleBarGraph;