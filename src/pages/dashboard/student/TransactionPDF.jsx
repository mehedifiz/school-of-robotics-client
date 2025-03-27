import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF'
  },
  header: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#4F46E5',
    color: '#FFFFFF'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.8
  },
  transaction: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 5
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5
  },
  label: {
    width: 120,
    fontSize: 10,
    color: '#6B7280'
  },
  value: {
    flex: 1,
    fontSize: 10,
    color: '#111827'
  },
  divider: {
    borderBottom: 1,
    borderColor: '#E5E7EB',
    marginVertical: 10
  }
});

export const TransactionPDF = ({ transactions }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
        <Text style={styles.subtitle}>School of Robotics</Text>
      </View>

      {transactions.map((transaction) => (
        <View key={transaction._id} style={styles.transaction}>
          <View style={styles.row}>
            <Text style={styles.label}>Plan:</Text>
            <Text style={styles.value}>{transaction.planName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Amount:</Text>
            <Text style={styles.value}>{transaction.amount} BDT</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Method:</Text>
            <Text style={styles.value}>{transaction.paymentDetails.cardType}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Transaction ID:</Text>
            <Text style={styles.value}>{transaction.transactionId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>
              {new Date(transaction.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Validity:</Text>
            <Text style={styles.value}>
              {new Date(transaction.startDate).toLocaleDateString()} - 
              {new Date(transaction.expiryDate).toLocaleDateString()}
            </Text>
          </View>
        </View>
      ))}
    </Page>
  </Document>
);