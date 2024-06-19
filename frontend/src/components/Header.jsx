import React from "react";

const Header = ({ month, setMonth }) => {
  return (
    <div className="header">
      <h1>Transactions Dashboard</h1>
      <label>
        Select Month:
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Header;
