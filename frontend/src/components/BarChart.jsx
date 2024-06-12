import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const BarChart = ({ data }) => {
  const chartRef = useRef();

  // Prepare data for Chart.js
  const chartData = {
    labels: data.map((item) => item.range),
    datasets: [
      {
        label: "Number of Items",
        data: data.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Options for better styling (add more as needed)
  const options = {
    maintainAspectRatio: false, // Allow responsive resizing
    scales: {
      y: {
        beginAtZero: true, // Start y-axis from zero
      },
    },
  };

  return (
    <div className="bar-chart">
      <h2>Price Range Distribution</h2>
      <div className="chart-container">
        {" "}
        {/* Container for better styling */}
        <Bar ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
