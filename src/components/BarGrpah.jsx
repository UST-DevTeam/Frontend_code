import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarGraph = (data) => {

    let SeriesData = data['data'].map(item => item.count);
    let category = data['data'].map(item => item.description);




    const series = [
        {
            name: "Active Employee",
            data: SeriesData
        }
    ];

    const options = {
        chart: {
            height: 350,
            type: 'bar',

        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1],
        },
        xaxis: {
            // categories: ["AIRTEL MACRO KTK","AIRTEL MACRO UP WEST","AIRTEL SMALL CELL BIHAR & JHARKHAND","AIRTEL SMALL CELL DELHI & NCR","AIRTEL SMALL CELL ORISSA","AIRTEL SMALL CELL RAJASTHAN","AIRTEL SURVEY KOLKATA","AIRTEL TI SERVICE J&K","AIRTEL TI SERVICES AP & TELANGANA","AIRTEL TI SERVICES MPCG","AIRTEL TI SERVICES MUMBAI","AIRTEL TI SERVICES PUNJAB","AIRTEL TI SERVICES TNCH","AIRTEL TI SERVICES UP EAST"],
            categories: category,
            labels:{
                style:{
                    colors:'#ffffff'
                }
            }
        },
        yaxis:{
            labels:{
                style:{
                    colors:'#ffffff'
                }
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '100%',
                horizontal: true,
                dataLabels: {
                    style: {
                        colors: '#fff', // Set the color of the numbers to your desired color code
                    },
                },
                colors: {
                    ranges: [{ from: 0, to: 200000, color: '#008FFB' }],
                },
            },
        },

    };
    return (<ReactApexChart options={options} series={series} type="bar" height={350} />)
}
export default BarGraph;