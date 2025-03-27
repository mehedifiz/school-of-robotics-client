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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.8
  },
  section: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F9FAFB'
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
    borderTop: 1,
    borderColor: '#E5E7EB',
    marginVertical: 10
  }
});

export const TransactionPDF = ({ transaction }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment Receipt</Text>
        <Text style={styles.subtitle}>School of Robotics</Text>
      </View>

      <View style={styles.section}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Student Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{transaction.studentName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{transaction.studentPhone}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Plan Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Plan Name:</Text>
          <Text style={styles.value}>{transaction.plan.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Duration:</Text>
          <Text style={styles.value}>{transaction.plan.duration} months</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>{transaction.amount} BDT</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Payment Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Transaction ID:</Text>
          <Text style={styles.value}>{transaction.transactionId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Method:</Text>
          <Text style={styles.value}>{transaction.paymentMethod}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>
            {new Date(transaction.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);