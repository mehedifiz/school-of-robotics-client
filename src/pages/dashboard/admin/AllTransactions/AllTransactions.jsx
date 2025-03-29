import TransactionList from "@/components/shared/TransactionList";

const AllTransactions = () => {
  return <TransactionList title="All Transactions" endpoint="/user/transactions" />;
};

export default AllTransactions;
