import React from "react";
import ReactApexChart from "react-apexcharts";

const BarLineGraph = ({ data = [], seriesData = [], horizontal = false, title = "", month = 8, enabledOnSeries = [false, false, false] }) => {

    const monthStr = `${month}`;

    // const staticData = [
    //     { description: "Category 1", [`aop_target-${monthStr}`]: 50, [`M-${monthStr}_y`]: 70, [`totalInvoice-${monthStr}`]: 60 },
    //     { description: "Category 2", [`aop_target-${monthStr}`]: 40, [`M-${monthStr}_y`]: 65, [`totalInvoice-${monthStr}`]: 55 },
    //     { description: "Category 3", [`aop_target-${monthStr}`]: 80, [`M-${monthStr}_y`]: 90, [`totalInvoice-${monthStr}`]: 85 },
    // ];

    // // Fallback to static data if no dynamic data is provided
    // const finalData = data.length > 0 ? data : staticData;

    const category = finalData.map(item => item.description);

    const defaultSeries = [
        {
            name: "AOP-Target",
            data: finalData.map(item => item[`aop_target-${monthStr}`]),
            type: "bar",
        },
        {
            name: "PV-Target",
            data: finalData.map(item => item[`M-${monthStr}_y`]),
            type: "bar",
        },
        {
            name: "Actual Revenue",
            data: finalData.map(item => item[`totalInvoice-${monthStr}`]),
            type: "line",
        },
    ];

    const series = seriesData.length > 0 ? seriesData : defaultSeries;

    const colors = ["#5cccb7", "#FF9999", "#f9a8d4"];

    const options = {
        chart: {
            height: 440,
            type: 'line', 
            background: '#3e454d',
            stacked: false,
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
                colors: ["transparent"],
                fontSize: "10px",
                fontWeight: 'bold',
            },
            background: {
                enabled: true,
                borderRadius: 0,
            }
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
        plotOptions: {
            bar: {
                columnWidth: '40%',
                horizontal: horizontal,
                borderRadius: 2,
            },
        },
        stroke: {
            width: [0, 0, 2], // Define widths: 0 for bars and 2 for the line
            curve: 'smooth' // Make the line smooth
        },
        grid: {
            borderColor: 'transparent',
            strokeDashArray: 0,
        },
        fill: {
            colors: colors,
            opacity: [1, 1, 0.5], // Different opacity for bars and line
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

    return <ReactApexChart options={options} series={series} type="line" height={440} />;
};

export default BarLineGraph;
