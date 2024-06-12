const Transaction = require("../models/Transaction");
const axios = require("axios");

const initializeDatabase = require("../utils/initializeDatabase");

const getTransactions = async (req, res) => {
  const { search, page = 1, perPage = 10 } = req.query;
  const query = search
    ? {
        $or: [
          { title: new RegExp(search, "i") },
          { description: new RegExp(search, "i") },
          { price: parseInt(search) },
        ],
      }
    : {};

  try {
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));
    res.json(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getStatistics = async (req, res) => {
  const month = parseInt(req.params.month);
  try {
    const totalSaleAmount = await Transaction.aggregate([
      { $match: { $expr: { $eq: [{ $month: "$dateOfSale" }, month] } } },
      { $group: { _id: null, totalAmount: { $sum: "$price" } } },
    ]);

    const totalSoldItems = await Transaction.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, month] },
      sold: true,
    });
    const totalNotSoldItems = await Transaction.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, month] },
      sold: false,
    });

    res.json({
      totalSaleAmount: totalSaleAmount[0]?.totalAmount || 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
const getPieChart = async (req, res) => {
    const month = parseInt(req.params.month);

    try {
        const categories = await Transaction.aggregate([
            { $match: { $expr: { $eq: [{ $month: "$dateOfSale" }, month] } } },
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);
        res.json(categories);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getBarChart = async (req, res) => {
  console.log("Hello");
  const month = parseInt(req.params.month);
  const ranges = [
    { range: "0-100", min: 0, max: 100 },
    { range: "101-200", min: 101, max: 200 },
    { range: "201-300", min: 201, max: 300 },
    { range: "301-400", min: 301, max: 400 },
    { range: "401-500", min: 401, max: 500 },
    { range: "501-600", min: 501, max: 600 },
    { range: "601-700", min: 601, max: 700 },
    { range: "701-800", min: 701, max: 800 },
    { range: "801-900", min: 801, max: 900 },
    { range: "901-above", min: 901, max: Number.MAX_VALUE },
  ];

  try {
    const result = await Promise.all(
      ranges.map(async (range) => {
        const count = await Transaction.countDocuments({
          $expr: {
            $and: [
              { $eq: [{ $month: "$dateOfSale" }, month] },
              { $gte: ["$price", range.min] },
              { $lte: ["$price", range.max] },
            ],
          },
        });
        return { range: range.range, count };
      })
    );
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getCombinedData = async (req, res) => {
  const month = parseInt(req.params.month);
  try {
    const statistics = await axios.get(
      `http://localhost:8000/api/statistics/${month}`
    );
    const barChart = await axios.get(
      `http://localhost:8000/api/barchart/${month}`
    );
    const pieChart = await axios.get(
      `http://localhost:8000/api/piechart/${month}`
    );

    res.json({
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  initializeDatabase,
  getTransactions,
  getStatistics,
  getPieChart,
  getBarChart,
  getCombinedData,
};
