import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxios from "@/Hooks/useAxios";
import useAuth from "@/Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaArrowLeft, FaCheckCircle, FaSpinner, FaLock, FaExchangeAlt, FaCreditCard, FaMobileAlt, FaUniversity, FaWallet } from "react-icons/fa";
import { TbCreditCardPay } from "react-icons/tb";
import Loader from "@/components/shared/Loader";
import SSLCommerzLogo from "@/assets/utility/sslcommerz.png";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axios = useAxios();
  const [isProcessing, setIsProcessing] = useState(false);

  // Extract planId from URL query params or from navigation state
  const queryParams = new URLSearchParams(location.search);
  const planId = queryParams.get("planId") || location.state?.planId;

  // Fetch plan details
  const { data: planData, isLoading: planLoading } = useQuery({
    queryKey: ["checkout-plan", planId],
    queryFn: async () => {
      if (!planId) return null;
      const res = await axios.get(`/plan/${planId}`);
      return res.data;
    },
    enabled: !!planId,
  });

  const plan = planData?.data;
  const currentPlan = user?.subscription?.plan || "free";
  const isUpgrade = currentPlan !== "premium";

  // Calculate the effective end date
  const calculateEndDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + (plan?.duration || 0));
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // If no plan is selected, redirect to plans page
  useEffect(() => {
    if (!planId && !planLoading) {
      toast.error("Please select a plan first");
      navigate("/dashboard/plan");
    }
  }, [planId, planLoading, navigate]);

  // Handle payment initiation
  const handleProceedToPayment = async () => {
    if (!user || !planId) return;

    try {
      setIsProcessing(true);
      const response = await axios.post("/plan/create-ssl-payment", {
        planId: planId,
      });

      if (response.data.success) {
        // Store transaction ID in localStorage for later reference
        localStorage.setItem("pending_transaction", response.data.data.tranId);

        // Redirect to payment gateway
        window.location.href = response.data.data.paymentUrl;
      } else {
        toast.error("Payment initiation failed");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.response?.data?.message || "Failed to process payment");
      setIsProcessing(false);
    }
  };

  if (planLoading) {
    return <Loader />;
  }

  if (!plan) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Plan Not Found</h2>
          <p className="text-gray-600 mb-6">The requested subscription plan could not be found.</p>
          <button onClick={() => navigate("/dashboard/plan")} className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg">
            <FaArrowLeft className="mr-2" /> Go to Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button onClick={() => navigate("/dashboard/plan")} className="inline-flex items-center text-primary hover:underline">
            <FaArrowLeft className="mr-2" /> Back to Plans
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white p-6">
            <h1 className="text-2xl font-bold">Complete Your Subscription</h1>
            <p className="text-white/80 mt-1">Review your plan details and proceed to payment</p>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Plan Comparison Section */}
            {isUpgrade && (
              <div className="mb-8 bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <div className="text-center mb-2">
                      <span className="text-sm font-medium text-gray-500">Current Plan</span>
                      <h4 className="text-xl font-bold text-gray-700 capitalize">{currentPlan}</h4>
                    </div>
                    {currentPlan !== "free" && user?.subscription?.endDate && (
                      <p className="text-xs text-center text-gray-500">Expires: {new Date(user.subscription.endDate).toLocaleDateString()}</p>
                    )}
                  </div>

                  <div className="bg-primary/10 p-4 rounded border border-primary/30">
                    <div className="text-center mb-2">
                      <span className="text-sm font-medium text-gray-500">New Plan</span>
                      <h4 className="text-xl font-bold text-primary capitalize">{plan.name}</h4>
                    </div>
                    <p className="text-xs text-center text-gray-500">Valid until: {calculateEndDate()}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-8">
              {/* Plan details section */}
              <div className="md:w-1/2">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Plan Details</h2>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <FaCheckCircle className="text-primary text-lg" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 capitalize">{plan.name} Plan</h3>
                        <p className="text-gray-600 text-sm">
                          {plan.duration} {plan.duration > 1 ? "Months" : "Month"} Subscription
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">Plan Features:</h4>
                      <ul className="space-y-2">
                        {plan.features &&
                          plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">Full access to Premium books</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">Priority customer support</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {plan.description && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">Description:</h4>
                      <p className="text-gray-600 text-sm">{plan.description}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment summary section */}
              <div className="md:w-1/2">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Summary</h2>

                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600">Subscription Price</span>
                      <span className="font-medium">BDT {plan.price}</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-t border-gray-200">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">
                        {plan.duration} {plan.duration > 1 ? "Months" : "Month"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-t border-gray-200">
                      <span className="text-gray-600">VAT & Taxes</span>
                      <span className="font-medium">Included</span>
                    </div>

                    <div className="flex justify-between items-center py-4 border-t border-gray-200 mt-2">
                      <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                      <span className="text-lg font-bold text-primary">BDT {plan.price}</span>
                    </div>
                  </div>

                  <div>
                    {/* User Info Summary */}
                    <div className="mt-2 mb-4 p-3 bg-gray-100 rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Account:</span> {user.name}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span> {user.phone}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleProceedToPayment}
                      disabled={isProcessing}
                      className="w-full mt-2 py-3 px-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium flex items-center justify-center"
                    >
                      {isProcessing ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" /> Processing...
                        </>
                      ) : (
                        <>
                          <TbCreditCardPay className="text-xl mr-2" /> Proceed to Secure Payment
                        </>
                      )}
                    </button>

                    <div className="mt-4 text-center text-sm text-gray-500">
                      <p>You will be redirected to a secure payment gateway to complete your payment.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SSL Commerz Information */}
        <div className="mt-8 bg-white rounded-xl shadow-md border p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Secure Payment Powered by</h2>
              <p className="text-sm text-gray-600">Experience a seamless checkout with 33+ payment options</p>
            </div>
            <img
              src={SSLCommerzLogo || "https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-01.png"}
              alt="SSL Commerz"
              className="h-10 object-contain"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col items-center">
              <FaCreditCard className="text-primary text-xl mb-2" />
              <h3 className="text-sm font-medium text-gray-800">Cards</h3>
              <p className="text-xs text-gray-500 text-center mt-1">All Debit, Credit & Prepaid Cards</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col items-center">
              <FaMobileAlt className="text-primary text-xl mb-2" />
              <h3 className="text-sm font-medium text-gray-800">Mobile Banking</h3>
              <p className="text-xs text-gray-500 text-center mt-1">10 Mobile Banking Brands</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col items-center">
              <FaUniversity className="text-primary text-xl mb-2" />
              <h3 className="text-sm font-medium text-gray-800">Internet Banking</h3>
              <p className="text-xs text-gray-500 text-center mt-1">10 Internet Banking Brands</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col items-center">
              <FaWallet className="text-primary text-xl mb-2" />
              <h3 className="text-sm font-medium text-gray-800">E-Wallets & EMI</h3>
              <p className="text-xs text-gray-500 text-center mt-1">4 E-Wallets & 30+ EMI Options</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
