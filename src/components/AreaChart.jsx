import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";


const AreaChart = (data) => {

    let graphData = data?.data

    let Graph = {
        series: [{
            name: 'Acc.Revenue',
            data: graphData
        }],
        options: {
            chart: {
                height: 350,
                width: 400,
                type: 'line'
            },
            plotOptions: {
                line: {
                    isSlopeChart: true,
                }
            },
            grid: {
                borderColor: '#1c1c1c'
            },
            xaxis:{
                labels: {
                    style: {
                        colors: 'White',
                    }
                }  
            },
            yaxis:{
                labels: {
                    style: {
                        colors: 'White',
                    }
                }  
            },
        },
          
          
          };
    return (
    
        <ReactApexChart options={Graph.options} series={Graph.series} type="area" height={350} />
    );

}
export default AreaChart;