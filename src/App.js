import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import { getLocalStorage, setLocalStorage } from './utils/localStorage';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTransactions = getLocalStorage('transactions') || [];
    setTransactions(savedTransactions);
  }, []);

  const addTransaction = (transaction) => {
    const newTransactions = [...transactions, { ...transaction, id: Date.now() }];
    setTransactions(newTransactions);
    setLocalStorage('transactions', newTransactions);
  };

  const deleteTransaction = (id) => {
    const newTransactions = transactions.filter(t => t.id !== id);
    setTransactions(newTransactions);
    setLocalStorage('transactions', newTransactions);
  };

  const editTransaction = (updatedTransaction) => {
    const newTransactions = transactions.map(t => 
      t.id === updatedTransaction.id ? updatedTransaction : t
    );
    setTransactions(newTransactions);
    setLocalStorage('transactions', newTransactions);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Budget Tracker</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="btn btn-primary"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </header>
        
        <Dashboard transactions={transactions} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <TransactionForm onSubmit={addTransaction} />
          <TransactionList 
            transactions={transactions}
            onDelete={deleteTransaction}
            onEdit={editTransaction}
          />
        </div>
      </div>
    </div>
  );
}

export default App; 