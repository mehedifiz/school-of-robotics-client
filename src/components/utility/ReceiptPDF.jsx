import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image, Font } from "@react-pdf/renderer";
import logo from "@/assets/logo.png";
import useFormatDate from "@/hooks/useFormatDate";

// Register Montserrat font
Font.register({
  family: "Montserrat",
  fonts: [
    { src: "https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459Wlhzg.ttf", fontWeight: "normal" },
    { src: "https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_bZF3gnD-w.ttf", fontWeight: "bold" },
    { src: "https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_ZpC3gnD-w.ttf", fontWeight: 500 },
    { src: "https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_cJD3gnD-w.ttf", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_dJE3gnD-w.ttf", fontWeight: "normal", fontStyle: "italic" },
  ],
});

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#FFFFFF",
    fontFamily: "Montserrat",
  },
  section: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottom: "1 solid #E5E7EB",
    alignItems: "center",
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitleContainer: {
    flexDirection: "column",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#4b5563",
    marginTop: 2,
  },
  receiptInfo: {
    fontSize: 12,
    color: "#4b5563",
    textAlign: "right",
    marginBottom: 4,
  },
  successBox: {
    padding: 16,
    backgroundColor: "#f0fdf4",
    borderRadius: 8,
    marginBottom: 24,
    border: "1 solid #dcfce7",
    flexDirection: "row",
    alignItems: "center",
  },
  checkText: {
    color: "#16a34a",
    fontSize: 16,
    fontWeight: "bold",
  },
  successTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
  },
  successText: {
    fontSize: 12,
    color: "#4b5563",
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  infoBox: {
    padding: 16,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    border: "1 solid #f3f4f6",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridItem: {
    width: "50%",
    paddingRight: 8,
  },
  label: {
    fontSize: 12,
    color: "#4b5563",
    marginBottom: 6,
  },
  value: {
    fontSize: 12,
    color: "#1f2937",
    fontWeight: "medium",
  },
  highlightedValue: {
    fontSize: 14,
    color: "#00776d",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 32,
    paddingTop: 16,
    borderTop: "1 solid #E5E7EB",
    textAlign: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#4b5563",
    marginBottom: 4,
    textAlign: "center",
  },
  reminder: {
    textAlign: "center",
  },
  reminderText: {
    fontSize: 10,
    color: "#4b5563",
    marginBottom: 4,
    textAlign: "center",
    fontStyle: "italic",
  },
});

// PDF Document component
const ReceiptPDF = ({ transaction }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image src={logo} style={styles.logo} />
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>School of Robotics</Text>
            <Text style={styles.headerSubtitle}>Payment Receipt</Text>
          </View>
        </View>
        <View>
          <Text style={styles.receiptInfo}>Receipt #: {transaction.transactionId.slice(-8)}</Text>
          <Text style={styles.receiptInfo}>Date: {new Date().toLocaleDateString()}</Text>
        </View>
      </View>

      {/* Success Box */}
      <View style={styles.successBox}>
        <View>
          <Text style={styles.successTitle}>Subscription Activated</Text>
          <Text style={styles.successText}>
            Your {transaction.planName} plan is active from {useFormatDate(transaction.startDate)} to {useFormatDate(transaction.expiryDate)}
          </Text>
        </View>
      </View>

      {/* Customer Information */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{transaction.userId?.name || "N/A"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{transaction.userId?.phone || "N/A"}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Transaction Details */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transaction Details</Text>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.grid}>
            <View style={{ ...styles.gridItem, marginBottom: 12 }}>
              <Text style={styles.label}>Transaction ID</Text>
              <Text style={styles.value}>{transaction.transactionId}</Text>
            </View>
            <View style={{ ...styles.gridItem, marginBottom: 12 }}>
              <Text style={styles.label}>Date & Time</Text>
              <Text style={styles.value}>{new Date(transaction.createdAt).toLocaleString()}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Validation ID</Text>
              <Text style={styles.value}>{transaction.validationId}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Bank Transaction ID</Text>
              <Text style={styles.value}>{transaction.paymentDetails?.bankTransId || "N/A"}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Payment Information */}
      <View
        style={{
          marginBottom: 116,
        }}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.grid}>
            <View style={{ ...styles.gridItem, marginBottom: 12 }}>
              <Text style={styles.label}>Payment Method</Text>
              <Text style={styles.value}>{transaction.paymentMethod}</Text>
            </View>
            <View style={{ ...styles.gridItem, marginBottom: 12 }}>
              <Text style={styles.label}>Issuer</Text>
              <Text style={styles.value}>{transaction.paymentDetails?.cardIssuer || "N/A"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Card Type</Text>
              <Text style={styles.value}>{transaction.paymentDetails?.cardBrand || "N/A"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Amount Paid</Text>
              <Text style={styles.highlightedValue}>BDT {transaction.amount}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.reminder}>
        <Text style={styles.reminderText}>Please continue to the next page for more information</Text>
      </View>

      {/* Subscription Details */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Subscription Details</Text>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.grid}>
            <View style={{ ...styles.gridItem, marginBottom: 12 }}>
              <Text style={styles.label}>Plan</Text>
              <Text style={styles.value}>{transaction.planName} Plan</Text>
            </View>
            <View style={{ ...styles.gridItem, marginBottom: 12 }}>
              <Text style={styles.label}>Duration</Text>
              <Text style={styles.value}>{transaction.planId?.duration || "N/A"} Months</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Start Date</Text>
              <Text style={styles.value}>{useFormatDate(transaction.startDate)}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Expiry Date</Text>
              <Text style={styles.value}>{useFormatDate(transaction.expiryDate)}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Thank you for subscribing to School of Robotics.</Text>
        <Text style={styles.footerText}>For support: support@schoolofrobotics.com | +880 1711-111111</Text>
      </View>
    </Page>
  </Document>
);

export default ReceiptPDF;
