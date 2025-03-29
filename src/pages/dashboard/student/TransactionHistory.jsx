import TransactionList from '@/components/shared/TransactionList';

const TransactionHistory = () => {
  return <TransactionList title="Transaction History" endpoint="/user/transactions" />;
};

export default TransactionHistory;