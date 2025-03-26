import { useSearchParams, Link } from 'react-router-dom';

const PaymentFailed = () => {
    const [searchParams] = useSearchParams();
    const reason = searchParams.get('reason');

    const getErrorMessage = () => {
        switch (reason) {
            case 'validation_failed':
                return 'Payment validation failed. Please check your payment details.';
            case 'insufficient_funds':
                return 'Insufficient funds in your account.';
            case 'payment_declined':
                return 'Your payment was declined by the payment provider.';
            default:
                return 'Payment failed. Please try again.';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    {/* Error Icon */}
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                        <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>

                    {/* Title */}
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Payment Failed
                    </h2>

                    {/* Error Message */}
                    <p className="mt-2 text-sm text-gray-600">
                        {getErrorMessage()}
                    </p>

                    {/* Additional Details */}
                    <div className="mt-4 p-4 bg-red-50 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">
                                    Transaction Details
                                </h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p>
                                        • Error Code: {reason || 'unknown'}
                                    </p>
                                    <p>
                                        • Time: {new Date().toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-4">
                    <Link
                        to="/payment"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Try Again
                    </Link>
                    <Link
                        to="/dashboard"
                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Return to Dashboard
                    </Link>
                    <button
                        onClick={() => window.location.href = 'mailto:support@example.com'}
                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;