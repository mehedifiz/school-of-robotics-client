import { useState, useEffect } from 'react';
import useAxios from '@/Hooks/useAxios';
import { Download, Receipt, Search } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import toast from 'react-hot-toast';
import { TransactionPDF } from '../../student/TransactionPDF';

const Alltransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState(null);
  const axios = useAxios();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/user/transactions');
        setTransactions(response.data.data.transactions);
        setPagination(response.data.data.pagination);
      } catch (error) {
        toast.error('Failed to load transaction history');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [axios]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredTransactions = transactions.filter(transaction => 
    transaction.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.studentPhone.toString().includes(searchTerm) ||
    transaction.plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header with Search */}
        <div className="p-6 bg-gradient-to-r from-indigo-500 to-indigo-600">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">All Transactions</h1>
              <p className="text-indigo-100 mt-1">
                Total Transactions: {pagination?.totalTransactions || 0}
              </p>
            </div>
            <div className="w-full md:w-96">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, phone, or plan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="p-6">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <Receipt className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No transactions found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200"
                >
                  {/* Student Info */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">{transaction.studentName}</h3>
                      <p className="text-sm text-gray-500">{transaction.studentPhone}</p>
                    </div>
                    <PDFDownloadLink
                      document={<TransactionPDF transaction={transaction} />}
                      fileName={`transaction-${transaction.transactionId}.pdf`}
                    >
                      {({ loading }) => (
                        <button
                          disabled={loading}
                          className="flex items-center space-x-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
                        >
                          <Download size={16} />
                          <span className="text-sm">{loading ? "..." : "Receipt"}</span>
                        </button>
                      )}
                    </PDFDownloadLink>
                  </div>

                  {/* Transaction Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Plan</p>
                      <p className="font-medium text-gray-900 capitalize">
                        {transaction.plan.name} ({transaction.plan.duration} months)
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium text-gray-900">{transaction.amount} BDT</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="font-medium text-gray-900">{transaction.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium text-gray-900">{formatDate(transaction.createdAt)}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500">Transaction ID</p>
                      <p className="font-medium text-gray-900">{transaction.transactionId}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alltransactions;