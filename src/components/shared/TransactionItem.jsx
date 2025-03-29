import { Download } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReceiptPDF from "@/components/utility/ReceiptPDF";
import useAxios from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/shared/Loader";
import { FaSpinner } from "react-icons/fa";

const TransactionItem = ({ transaction, formatDate }) => {
  const axios = useAxios();

  const { data: transactionData = [], isLoading } = useQuery({
    queryKey: ["transactionData"],
    queryFn: async () => {
      const res = await axios.get(`/plan/transaction/${transaction?.transactionId}`);
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[10vh]">
        <Loader />
      </div>
    );
  }
  return (
    <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
      {/* Student Info */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-500">Student</p>
          <h3 className="font-medium text-gray-900">{transaction.studentName}</h3>
          <p className="text-sm text-gray-500">{transaction.studentPhone}</p>
        </div>
        {transactionData?.transactionId && (
          <PDFDownloadLink document={<ReceiptPDF transaction={transactionData} />} fileName={`SOR_Receipt_${transaction.transactionId}.pdf`}>
            {({ loading }) => (
              <button disabled={loading} className="px-3 py-1.5 bg-primary-100/50 text-primary rounded-lg hover:bg-primary-100 transition-colors duration-200">
                {loading ? (
                  <FaSpinner className="animate-spin text-sm" />
                ) : (
                  <span className="text-sm flex items-center space-x-2">
                    <Download size={16} />
                    Receipt
                  </span>
                )}
              </button>
            )}
          </PDFDownloadLink>
        )}
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
  );
};

export default TransactionItem;
