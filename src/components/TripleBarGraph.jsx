import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TripleBarGraph = ({ data,  seriesData = [], horizontal = false, title="", month=8, enabledOnSeries = [false, false, false] }) => {
    const monthStr = `${month}`;
    // const SeriesData1 = data?.map(item => item[`aop_target-${monthStr}`]) || [];  
    // const SeriesData2 = data?.map(item => item[`M-${monthStr}_y`]) || [];  
    // const SeriesData3 = data?.map(item => item[`totalInvoice-${monthStr}`]) || [];  
    const category = data?.map(item => item.description) || [];

    // const series = [
    //     {
    //         name: "AOP-Target",
    //         data: SeriesData1,
    //     },
    //     {
    //         name: "PV-Target",
    //         data: SeriesData2,
    //     },
    //     {
    //         name: "Invoice",
    //         data: SeriesData3,
    //     },
    // ];
    const defaultSeries = [
        {
            name: "AOP-Target",
            data: data?.map(item => item[`aop_target-${monthStr}`]) || [],
        },
        {
            name: "PV-Target",
            data: data?.map(item => item[`M-${monthStr}_y`]) || [],
        },
        {
            name: "Actual Revenue",
            data: data?.map(item => item[`totalInvoice-${monthStr}`]) || [],
        },
    ];

    const series = seriesData.length > 0 ? seriesData : defaultSeries;

    // const colors = ["#FFA0A0", "#c4f4a0", "#B9D9EB"];
    const colors = ["#5cccb7", "#FF9999", "#f9a8d4"];

    const options = {
        chart: {
            height: 440,
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
            enabledOnSeries: enabledOnSeries?.map((enabled, index) => enabled ? index : -1).filter(index => index !== -1),
            style: {
                colors: ["white"],
                fontSize: "10px",
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
                columnWidth: '40%',
                horizontal: horizontal,
                borderRadius: 2,
                dataLabels: { 
                    style: {
                        colors: '#fff',
                        position: 'top',
                    },
                },
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
            colors: colors,
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
    };

    return (<ReactApexChart options={options} series={series} type="bar" height={440} />)
}

export default TripleBarGraph;
