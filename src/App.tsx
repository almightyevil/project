import React, { useState } from 'react';
import { LineChart, CandlestickChart as Candlestick } from 'lucide-react';
import TradingChart from './components/TradingChart';
import StockList, { stockList } from './components/StockList';

const generateSampleData = (baseValue: number) => {
  const data = [];
  let basePrice = baseValue;
  const startDate = new Date('2024-01-01');

  for (let i = 0; i < 100; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    const open = basePrice + (Math.random() - 0.5) * (basePrice * 0.02);
    const close = open + (Math.random() - 0.5) * (basePrice * 0.015);
    const high = Math.max(open, close) + Math.random() * (basePrice * 0.01);
    const low = Math.min(open, close) - Math.random() * (basePrice * 0.01);
    
    data.push({
      time: date.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
    });
    
    basePrice = close;
  }
  
  return data;
};

function App() {
  const [selectedStock, setSelectedStock] = useState(stockList[0]?.symbol || '');
  const [searchTerm, setSearchTerm] = useState('');

  const getBasePrice = (symbol: string) => {
    const stock = stockList.find(s => s.symbol === symbol);
    return stock?.basePrice || 100;
  };

  const data = React.useMemo(() => 
    generateSampleData(getBasePrice(selectedStock)), 
    [selectedStock]
  );

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="border-b border-gray-700 bg-[#1E1E1E] p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LineChart className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold">TradingView Clone</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 rounded bg-blue-600 px-4 py-2 hover:bg-blue-700">
              <Candlestick className="h-4 w-4" />
              <span>Change Chart Type</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex gap-4 p-4">
        <StockList
          selectedStock={selectedStock}
          onSelectStock={setSelectedStock}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="flex-1 rounded-lg border border-gray-700 bg-[#1E1E1E] p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{selectedStock}</h2>
            <div className="flex space-x-2">
              <button className="rounded bg-gray-700 px-3 py-1 text-sm hover:bg-gray-600">1H</button>
              <button className="rounded bg-gray-700 px-3 py-1 text-sm hover:bg-gray-600">4H</button>
              <button className="rounded bg-blue-600 px-3 py-1 text-sm hover:bg-blue-700">1D</button>
              <button className="rounded bg-gray-700 px-3 py-1 text-sm hover:bg-gray-600">1W</button>
            </div>
          </div>
          <div className="w-full overflow-hidden rounded-lg">
            <TradingChart data={data} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;