import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarGraph = ({ data, horizontal = false, title="" }) => {
    // const horizontal = data?.horizontal || false;
    let SeriesData = data?.map(item => item.count) ||[];  
    let category = data?.map(item => item.description) ||[];
    // let SeriesDataMonth = data?.map(item => item.month_year) ||[];
    // let category = data?.map(item => item.description) ||[];

    const series = [
        {
            name: "Active Employee",
            data: SeriesData,
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
                    fontSize: '8px',
                }
            }
        },
        yaxis:{
            labels:{
                style:{
                    colors:'#ffffff',
                    fontSize: '6.45px',
                }
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '60%',
                horizontal: horizontal,
                borderRadius: 2,
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
        grid: {
            borderColor: 'transparent',
            strokeDashArray: 0,
        },
        // colors: ["#33b2df","#546E7A","#d4526e","#13d8aa","#A5978B","#2b908f","#f9a3a4","#90ee7e","#f48024","#69d2e7"],
        colors: ["#66c8e2","#7f8c8d","#f77a82","#2ee1c0","#c0b7a5","#5db7a3","#fbd0d0","#c4f4a0","#f6a04c","#9ee6f1"],
        legend: {
            show: false 
        },

    };
    return (<ReactApexChart options={options} series={series} type="bar" height={360} />)
}
export default BarGraph;