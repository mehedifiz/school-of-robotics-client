import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxios from '@/Hooks/useAxios';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const axios = useAxios();
    const [loading, setLoading] = useState(true);
    const [paymentData, setPaymentData] = useState(null);
    const transactionId = searchParams.get('transactionId');

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const response = await axios.get(`/plan/transaction/${transactionId}`);
                setPaymentData(response.data.data);
            } catch (error) {
                console.error('Error fetching payment details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (transactionId) {
            fetchPaymentDetails();
        }
    }, [transactionId, axios]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    {/* Success Icon */}
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                        <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>

                    {/* Title */}
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Payment Successful!
                    </h2>

                    {/* Success Message */}
                    <p className="mt-2 text-sm text-gray-600">
                        Thank you for purchasing the {paymentData?.planName} plan. Your transaction has been completed successfully.
                    </p>

                    {/* Transaction Details */}
                    <div className="mt-4 p-4 bg-green-50 rounded-md text-left">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3 space-y-2">
                                <h3 className="text-sm font-medium text-green-800">
                                    Transaction Details
                                </h3>
                                <div className="mt-2 text-sm text-green-700 space-y-1">
                                    <p>• Transaction ID: {paymentData?.transactionId}</p>
                                    <p>• Validation ID: {paymentData?.validationId}</p>
                                    <p>• Amount: {paymentData?.amount} BDT</p>
                                    <p>• Plan: {paymentData?.planName} ({paymentData?.planId?.duration} months)</p>
                                    <p>• Payment Method: {paymentData?.paymentMethod}</p>
                                    <p>• Card Type: {paymentData?.paymentDetails?.cardType}</p>
                                    <p>• Bank Transaction ID: {paymentData?.paymentDetails?.bankTransId}</p>
                                    <p>• Valid From: {formatDate(paymentData?.startDate)}</p>
                                    <p>• Valid Until: {formatDate(paymentData?.expiryDate)}</p>
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-green-200">
                                    <h4 className="text-sm font-medium text-green-800 mb-2">
                                        Customer Details
                                    </h4>
                                    <p>• Name: {paymentData?.userId?.name}</p>
                                    <p>• Phone: {paymentData?.userId?.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-4">
                    <Link
                        to="/dashboard/my-courses"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Start Learning
                    </Link>
                    <Link
                        to="/dashboard"
                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Return to Dashboard
                    </Link>
                    <button
                        onClick={() => window.print()}
                        className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Receipt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;