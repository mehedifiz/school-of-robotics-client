import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxios from "@/Hooks/useAxios";
import { FaCheckCircle, FaHome, FaBookOpen, FaDownload, FaRegCalendarCheck, FaCreditCard, FaUser, FaReceipt, FaShieldAlt } from "react-icons/fa";
import Loader from "@/components/shared/Loader";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image, Font } from "@react-pdf/renderer";
import logo from "@/assets/logo.png";

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
const ReceiptPDF = ({ transaction, formatDate }) => (
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
            Your {transaction.planName} plan is active from {formatDate(transaction.startDate)} to {formatDate(transaction.expiryDate)}
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
              <Text style={styles.value}>{formatDate(transaction.startDate)}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Expiry Date</Text>
              <Text style={styles.value}>{formatDate(transaction.expiryDate)}</Text>
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

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axios = useAxios();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const receiptRef = useRef(null);

  // Get transaction ID from URL parameters
  const queryParams = new URLSearchParams(location.search);
  const transactionId = queryParams.get("transactionId") || localStorage.getItem("pending_transaction");

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Fetch transaction details
  useEffect(() => {
    const fetchTransaction = async () => {
      if (!transactionId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/plan/transaction/${transactionId}`);
        if (response.data.success) {
          setTransaction(response.data.data);
          // Clear the pending transaction from localStorage
          localStorage.removeItem("pending_transaction");
        }
      } catch (error) {
        console.error("Error fetching transaction:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId, axios]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-primary/90 to-primary p-6 text-white text-center">
          <div className="inline-flex items-center justify-center bg-white rounded-full p-3 mb-4">
            <FaCheckCircle className="text-primary text-3xl" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Payment Successfully Completed!</h1>
          <p className="text-white/80">Your subscription has been activated and you now have access to our premium content.</p>
        </div>

        {/* Regular display content */}
        {transaction && (
          <div className="p-6" ref={receiptRef}>
            {/* Transaction Success */}
            <div className="mb-6 flex items-center bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaRegCalendarCheck className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Subscription Activated</h3>
                <p className="text-sm text-gray-600">
                  Your {transaction.planName} plan is active from {formatDate(transaction.startDate)} to {formatDate(transaction.expiryDate)}
                </p>
              </div>
            </div>

            {/* Customer Information */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FaUser className="text-primary mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Customer Information</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Name</p>
                    <p className="font-medium text-gray-800">{transaction.userId?.name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <p className="font-medium text-gray-800">{transaction.userId?.phone || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Information */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FaReceipt className="text-primary mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Transaction Details</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
                    <p className="font-medium text-gray-800 break-all">{transaction.transactionId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date & Time</p>
                    <p className="font-medium text-gray-800 break-all">{new Date(transaction.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Validation ID</p>
                    <p className="font-medium text-gray-800 text-sm break-all">{transaction.validationId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Bank Transaction ID</p>
                    <p className="font-medium text-gray-800 text-sm break-all">{transaction.paymentDetails?.bankTransId || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FaCreditCard className="text-primary mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Payment Information</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                    <p className="font-medium text-gray-800">{transaction.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Issuer</p>
                    <p className="font-medium text-gray-800">{transaction.paymentDetails?.cardIssuer || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Card Type</p>
                    <p className="font-medium text-gray-800">{transaction.paymentDetails?.cardBrand || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
                    <p className="font-medium text-lg text-primary">BDT {transaction.amount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Details */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FaShieldAlt className="text-primary mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Subscription Details</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Plan</p>
                    <p className="font-medium text-gray-800 capitalize">{transaction.planName} Plan</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Duration</p>
                    <p className="font-medium text-gray-800">{transaction.planId?.duration || "N/A"} Months</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Start Date</p>
                    <p className="font-medium text-gray-800">{formatDate(transaction.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Expiry Date</p>
                    <p className="font-medium text-gray-800">{formatDate(transaction.expiryDate)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {transaction && (
              <PDFDownloadLink
                document={<ReceiptPDF transaction={transaction} formatDate={formatDate} />}
                fileName={`SOR_Receipt_${transaction.transactionId}.pdf`}
                className="px-6 py-3 bg-primary/90 hover:bg-primary text-white rounded-lg flex items-center justify-center transition"
                style={{ textDecoration: "none" }}
              >
                {({ loading }) =>
                  loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating PDF...
                    </span>
                  ) : (
                    <>
                      <FaDownload className="mr-2" /> Download Receipt
                    </>
                  )
                }
              </PDFDownloadLink>
            )}

            <button
              onClick={() => navigate("/dashboard/student-dashboard")}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg flex items-center justify-center transition"
            >
              <FaHome className="mr-2" /> Go to Dashboard
            </button>

            <button
              onClick={() => navigate("/dashboard/student-book")}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center justify-center transition"
            >
              <FaBookOpen className="mr-2" /> Explore Books
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
