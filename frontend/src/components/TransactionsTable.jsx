import React, { useState } from "react";

const TransactionsTable = ({ transactions, onSearch }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = () => {
    onSearch(search, page);
  };

  const handleNext = () => {
    setPage(page + 1);
    onSearch(search, page + 1);
  };

  const handlePrevious = () => {
    setPage(page - 1);
    onSearch(search, page - 1);
  };

  return (
    <div className="transactions-table">
      <input
        type="text"
        placeholder="Search transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>
                {transaction.dateOfSale
                  ? new Date(transaction.dateOfSale).toLocaleDateString()
                  : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePrevious} disabled={page === 1}>
        Previous
      </button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default TransactionsTable;
