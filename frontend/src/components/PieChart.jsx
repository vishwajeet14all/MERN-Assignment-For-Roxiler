import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js'; // import Chart and registerables

ChartJS.register(...registerables); // register the controllers

const PieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const chartData = {
      labels: data.map(item => item.category),
      datasets: [
        {
          data: data.map(item => item.count),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
          ],
        },
      ],
    };

    chartRef.current = new ChartJS(document.getElementById('pieChart'), {
      type: 'pie',
      data: chartData,
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="pie-chart">
      <h2>Category Distribution</h2>
      <canvas id="pieChart"></canvas>
    </div>
  );
};

export default PieChart;