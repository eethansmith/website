import React, { useState, useEffect } from 'react';
// Import images - adjust the path as needed
import VAUG from './resources/VAUG.png';
import AAPL from './resources/AAPL.png';
import PLTR from './resources/PLTR.png';
import MSFT from './resources/MSFT.png';
import AMZN from './resources/AMZN.png';
import META from './resources/META.png';
import BLK from './resources/BLK.png';
import GOOG from './resources/GOOG.png';
import CRWD from './resources/CRWD.png';
import INTC from './resources/INTC.png';
import DELL from './resources/DELL.png';
import NVDA from './resources/NVDA.png';
import ORCL from './resources/ORCL.png';
import ZS from './resources/ZS.png';
import IBM from './resources/IBM.png';

function StockHoldings() {
  const [holdings, setHoldings] = useState([]);

  // Function to fetch data from your API
  const fetchStockHoldings = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/stock_holdings/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data); // Check the structure of the fetched data
      setHoldings(Object.values(data)); // Convert the object to an array and update state
    } catch (error) {
      console.error('Fetching data failed:', error);
    }
  };

  // useEffect to call the fetch function when the component mounts
  useEffect(() => {
    fetchStockHoldings();

    // Set up an interval to fetch data every few seconds
    const interval = setInterval(fetchStockHoldings, 2000);

    return () => clearInterval(interval);
  }, []);

  // Function to get the corresponding image based on the stock name
  const getImageUrl = (ticker) => {
    switch (ticker) {
      case 'VUAG.L':
        return VAUG;
      case 'AAPL':
        return AAPL;
      case 'PLTR':
        return PLTR;
      case 'MSFT':
        return MSFT;
      case 'AMZN':
        return AMZN;
      case 'META':
        return META;
      case 'BLK':
        return BLK;
      case 'GOOG':
        return GOOG;
      case 'CRWD':
        return CRWD;
      case 'INTC':
        return INTC;
      case 'DELL':
        return DELL;
      case 'NVDA':
        return NVDA;
      case 'ORCL':
        return ORCL;
      case 'ZS':
        return ZS;
      case 'IBM':
        return IBM;
      // Add cases for other tickers and their corresponding images
      default:
        return ''; // Default image or a placeholder
    }
  };

  return (
    <div className="stock-holdings">
      <h2>Current Stock Holdings</h2>
      {holdings.map((stock, index) => (
        <button key={index} className="stock-button">
          <img src={getImageUrl(stock.ticker)} alt={stock.name} className="stock-image" />
          <div className="stock-details">
            <div className="stock-name">{stock.name}</div>
            <div>{`${stock.shares_held} shares`}</div>
          </div>
          <div className="stock-value-gain">
            <div>{`$${stock.value_held.toFixed(2)}`}</div>
            <div className="gain-loss" style={{ color: stock.profit_loss_percentage < 0 ? 'red' : 'green' }}>
              {`${stock.profit_loss_percentage.toFixed(2)}%`}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default StockHoldings;
