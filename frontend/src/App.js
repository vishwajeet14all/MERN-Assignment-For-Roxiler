import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import Header from "./components/Header";
import "./App.css";

const App = () => {
  const [month, setMonth] = useState("March");
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchBarChartData();
  }, [month]);

  const fetchTransactions = async (search = "", page = 1, perPage = 10) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/transactions`,
        {
          params: { month, search, page, perPage },
        }
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/statistics/`,
        {
          params: { month },
        }
      );
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/barchart/`, {
        params: { month },
      });
      setBarChartData(response.data);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  return (
    <div className="container">
      <Header month={month} setMonth={setMonth} />
      <TransactionsTable
        transactions={transactions}
        onSearch={fetchTransactions}
      />
      <Statistics statistics={statistics} />
      <div className="charts">
        <BarChart data={barChartData} />
      </div>
    </div>
  );
};

export default App;
