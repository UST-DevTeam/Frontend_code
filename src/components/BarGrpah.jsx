import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarGraph = () => {

    const series = [
        {
            name: "series-1",
            data: [55,45]
        }
    ];

    const options = {
        chart: {
            height: 400,
            type: 'bar',

        },
        stroke: {
            width: [0, 1],
        },
        title: {
            text: "Project Status",
            style: {
                fontSize: '14px',
                fontWeight: 'normal',
                fontFamily: 'poppins, sans-serif',
                color: '#fff'
            },
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1],
        },

        xaxis: {
            categories: ["Active","Archive"],
        },
        yaxis: [
            {
                title: {
                    text: 'Sales of all Category',
                    style: {
                        fontSize: '14px',
                        fontWeight: 'normal',
                        fontFamily: 'poppins, sans-serif',
                        color: '#fff',
                    },
                },
                dataLabels: {
                    style: {
                        colors: ['#fff'], // Set the color of the numbers to your desired color code
                    },
                },
            },
            {
                opposite: true,
                title: {
                    text: '',
                },
            },
        ],


        plotOptions: {
            bar: {
                columnWidth: '35%',
                dataLabels: {
                    style: {
                        colors: '#fff', // Set the color of the numbers to your desired color code
                    },
                },
                colors: {
                    ranges: [{ from: 0, to: 200000, color: '#154E67' }],
                },
            },
        },

    };



    return (<ReactApexChart options={options} series={series} type="bar" height={400} />)
}
export default BarGraph;