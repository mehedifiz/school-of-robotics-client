import TransactionList from '@/components/shared/TransactionList';

const Alltransactions = () => {
  return <TransactionList title="All Transactions" endpoint="/user/transactions" />;
};

export default Alltransactions;