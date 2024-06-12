const express = require("express");
const router = express.Router();
const {
  initializeDatabase,
  getTransactions,
  getPieChart,
  getStatistics,
  getBarChart,
  getCombinedData,
} = require("../controllers/transactionController");

router.get("/initialize", initializeDatabase);
router.get("/transactions", getTransactions);
router.get("/statistics/:month", getStatistics);
router.get("/barchart/:month", getBarChart);
router.get('/piechart/:month', getPieChart);
router.get("/combined/:month", getCombinedData);

module.exports = router;
