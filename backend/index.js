const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
const PORT = 8000;

app.use(cors());


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Database Connection
connectDB();

// Routes
app.use('/api', transactionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
