import { useState } from 'react';
import TransactionForm from './TransactionForm';

function TransactionList({ transactions, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDateRange = (!dateRange.start || transaction.date >= dateRange.start) &&
                           (!dateRange.end || transaction.date <= dateRange.end);
    
    return matchesSearch && matchesDateRange;
  });

  const handleEdit = (transaction) => {
    onEdit(transaction);
    setEditingId(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
      <h2 className="text-white text-xl font-semibold mb-4">Transactions</h2>
      
      <div className="space-y-4 mb-4">
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="input-field"
          />
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="input-field"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredTransactions.map(transaction => (
          <div key={transaction.id}>
            {editingId === transaction.id ? (
              <TransactionForm
                initialData={transaction}
                onSubmit={handleEdit}
              />
            ) : (
              <div className="border rounded-lg p-4 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{transaction.category}</p>
                    <p className="text-sm text-gray-500">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      ${Number(transaction.amount).toFixed(2)}
                    </p>
                    <div className="space-x-2 mt-2">
                      <button
                        onClick={() => setEditingId(transaction.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(transaction.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionList; 