import React from 'react';
import { Search } from 'lucide-react';

export interface Stock {
  symbol: string;
  name: string;
  series: string;
  isin: string;
  price?: string;
  change?: string;
  color?: string;
  basePrice?: number;
}

interface StockListProps {
  selectedStock: string;
  onSelectStock: (symbol: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

// Parse the CSV data into a structured format
const parseCSVData = (csvData: string): Stock[] => {
  return csvData.split('\n')
    .slice(1) // Skip header row
    .filter(line => line.trim()) // Remove empty lines
    .map(line => {
      const [symbol, name, series, , , , isin] = line.split(',');
      // Generate random price and change for demo purposes
      const basePrice = Math.random() * 3000 + 100;
      const change = (Math.random() * 4 - 2).toFixed(2);
      return {
        symbol,
        name,
        series,
        isin,
        price: basePrice.toFixed(2),
        change: `${change}%`,
        color: parseFloat(change) >= 0 ? 'text-green-500' : 'text-red-500',
        basePrice: parseFloat(basePrice.toFixed(2))
      };
    });
};

// Get the CSV data and parse it
const csvData = `SYMBOL,NAME OF COMPANY, SERIES, DATE OF LISTING, PAID UP VALUE, MARKET LOT, ISIN NUMBER, FACE VALUE
20MICRONS,20 Microns Limited,EQ,06-OCT-2008,5,1,INE144J01027,5
...`; // Your CSV data here

export const stockList: Stock[] = parseCSVData(csvData);

const StockList: React.FC<StockListProps> = ({
  selectedStock,
  onSelectStock,
  searchTerm,
  onSearchChange
}) => {
  const filteredStocks = stockList.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-80 rounded-lg border border-gray-700 bg-[#1E1E1E] p-4">
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search stocks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg bg-gray-800 px-4 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto space-y-2">
        {filteredStocks.map((stock) => (
          <button
            key={stock.symbol}
            onClick={() => onSelectStock(stock.symbol)}
            className={`w-full rounded-lg p-3 text-left transition-colors ${
              selectedStock === stock.symbol
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{stock.symbol}</div>
                <div className="text-sm text-gray-400">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">₹{stock.price}</div>
                <div className={`text-sm ${stock.color}`}>{stock.change}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StockList;