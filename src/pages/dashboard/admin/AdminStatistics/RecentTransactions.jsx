import { motion } from "framer-motion";
import { CreditCard, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "@/Hooks/useAxios";

const RecentTransactions = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/user/transactions");
        if (response.data.success) {
          setTransactions(response.data.data.transactions.slice(0, 5)); // Get only first 4 transactions
        } else {
          setError("Failed to fetch transactions");
        }
      } catch (err) {
        setError("Error fetching transactions: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Recent Transactions</h2>
          <p className="text-sm text-gray-500">Last subscriptions purchased</p>
        </div>

        <button onClick={() => navigate("/dashboard/all-transactions")} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading transactions...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">Student</th>
                <th className="px-6 py-3">Plan</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((transaction, index) => (
                <motion.tr
                  key={transaction._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="text-sm"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-50 rounded-full">
                        <CreditCard className="h-4 w-4 text-indigo-600" />
                      </div>
                      <span className="font-medium text-gray-700">{transaction.studentName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {transaction.plan?.name ? transaction.plan.name.charAt(0).toUpperCase() + transaction.plan.name.slice(1) + " Plan" : "N/A"}
                  </td>
                  <td className="px-6 py-4 font-medium">৳{transaction.amount}</td>
                  <td className="px-6 py-4 text-gray-600">{formatDate(transaction.createdAt)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 text-center">
        <button onClick={() => navigate("/dashboard/all-transactions")} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
          Load more transactions
        </button>
      </div>
    </motion.div>
  );
};

export default RecentTransactions;
