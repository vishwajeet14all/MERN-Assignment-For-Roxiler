const axios = require('axios');
const Transaction = require('../models/Transaction');

const initializeDatabase = async () => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Transaction.deleteMany({});
        await Transaction.insertMany(response.data);
        console.log('Database initialized with seed data');
    } catch (error) {
        console.error('Error initializing database:', error.message);
    }
};

module.exports = initializeDatabase;

