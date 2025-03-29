import { useState, useEffect } from "react";
import useAxios from "@/Hooks/useAxios";
import { Receipt, Search } from "lucide-react";
import toast from "react-hot-toast";
import TransactionItem from "./TransactionItem";

const TransactionList = ({ title, endpoint, customFilter = null }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState(null);
  const axios = useAxios();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(endpoint || "/user/transactions");
        setTransactions(response.data.data.transactions);
        setPagination(response.data.data.pagination);
      } catch (error) {
        toast.error("Failed to load transaction history");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [axios, endpoint]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Default filter if no custom filter is provided
  const defaultFilter = (transaction) =>
    transaction.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.studentPhone?.toString().includes(searchTerm) ||
    transaction.plan?.name.toLowerCase().includes(searchTerm.toLowerCase());

  const filteredTransactions = transactions.filter(customFilter || defaultFilter);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header with Search */}
        <div className="p-6 bg-gradient-to-r from-primary to-primary/80">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">{title || "Transaction History"}</h1>
              <p className="text-blue-50 mt-1">Total Transactions: {pagination?.totalTransactions || 0}</p>
            </div>
            <div className="w-full md:w-96">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, phone, or plan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border-1 focus:ring-2 text-white focus:ring-primary"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-50" />
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
                <TransactionItem key={transaction._id} transaction={transaction} formatDate={formatDate} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
