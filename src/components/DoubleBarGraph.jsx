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
            colors: "#f9a3a4",
        },
        {
            name: "exit",
            data: SeriesData2,
            colors: "#90ee7e",
        },
    ];

    const options = {
        chart: {
            height: 360,
            type: 'bar',

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
                    },
                },
                // colors: {
                //     ranges: [{ from: 0, to: 200000, color: '#199afb'}],
                // },
                distributed: true,
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
        colors: ["#B7A0E0", "#EC99C2", "#FEBF89", "#FFE083","#C4F9CA", "#A3C4F3", "#98F5E1", "#FDE4CF", "#f9a3a4","#d4526e", "#69d2e7"],
        legend: {
            show: false 
        }

    };
    return (<ReactApexChart options={options} series={series} type="bar" height={360} />)
}
export default DoubleBarGraph;