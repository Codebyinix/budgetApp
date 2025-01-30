import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard({ transactions }) {
  const [stats, setStats] = useState({
    balance: 0,
    income: 0,
    expenses: 0
  });

  useEffect(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + Number(t.amount), 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + Number(t.amount), 0);
    
    setStats({
      balance: income - expenses,
      income,
      expenses
    });
  }, [transactions]);

  const chartData = {
    labels: ['Income', 'Expenses', 'Balance'],
    datasets: [
      {
        label: 'Amount',
        data: [stats.income, stats.expenses, stats.balance],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-blue-100 rounded-lg shadow p-6 dark:bg-blue-900">
        <h2 className="text-white text-xl font-semibold mb-4">Summary</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-white">Balance</p>
            <p className={`text-xl font-bold ${stats.balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ${stats.balance.toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-white">Income</p>
            <p className="text-xl font-bold text-green-500">
              ${stats.income.toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-white">Expenses</p>
            <p className="text-xl font-bold text-red-500">
              ${stats.expenses.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
        <Bar data={chartData} />
      </div>
    </div>
  );
}

export default Dashboard; 