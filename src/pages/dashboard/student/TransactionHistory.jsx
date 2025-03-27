import { useState, useEffect } from 'react';
import useAxios from '@/Hooks/useAxios';
import { Download, Receipt } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { TransactionPDF } from './TransactionPDF';
import toast from 'react-hot-toast';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/user/transactions');
        setTransactions(response.data.data);
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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from- bg-primary to-blue-400">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Transaction History</h1>
              <p className="text-indigo-100 mt-1">View and download your payment records</p>
            </div>
            {transactions.length > 0 && (
              <PDFDownloadLink
                document={<TransactionPDF transactions={transactions} />}
                fileName="transaction-history.pdf"
              >
                {({ loading }) => (
                  <button
                    disabled={loading}
                    className="flex items-center space-x-2 px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
                  >
                    <Download size={20} />
                    <span>{loading ? "Preparing..." : "Download PDF"}</span>
                  </button>
                )}
              </PDFDownloadLink>
            )}
          </div>
        </div>

        {/* Transactions List */}
        <div className="p-6">
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <Receipt className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No transactions yet</h3>
              <p className="mt-1 text-sm text-gray-500">Your payment history will appear here</p>
            </div>
          ) : (
            <div className="space-y-6">
              {transactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Plan</p>
                      <p className="font-medium text-gray-900 capitalize">{transaction.planName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium text-gray-900">{transaction.amount} BDT</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="font-medium text-gray-900">{transaction.paymentDetails.cardType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium text-gray-900">{formatDate(transaction.createdAt)}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Transaction ID</p>
                        <p className="font-medium text-gray-900">{transaction.transactionId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Validity</p>
                        <p className="font-medium text-gray-900">
                          {formatDate(transaction.startDate)} - {formatDate(transaction.expiryDate)}
                        </p>
                      </div>
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

export default TransactionHistory;