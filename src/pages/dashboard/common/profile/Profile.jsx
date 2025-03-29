import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "@/Hooks/useAuth";
import useAxios from "@/Hooks/useAxios";
import Settings from "./Settings";

const Profile = () => {
  const UserAxios = useAxios();
  const { userId } = useAuth();
  const [user, setUser] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await UserAxios.get(`/user/get-user/${userId}`);
        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId, UserAxios]);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {showPasswordModal && (
        <Settings onClose={() => setShowPasswordModal(false)} />
      )}
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative h-48 bg-gradient-to-r from-teal-500 to-teal-600">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Change Password
            </button>
          </div>
          <div className="absolute -bottom-12 left-8">
            <div className="bg-white p-2 rounded-full ring-4 ring-white">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 flex items-center justify-center text-3xl text-white font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 px-8 pb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            </div>
            <Link to="/dashboard/editProfile">
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </button>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone</span>
                  <span className="text-gray-900">{user.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gender</span>
                  <span className="text-gray-900">{user.gender || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Address</span>
                  <span className="text-gray-900">{user.address || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Joined</span>
                  <span className="text-gray-900">{formatDate(user.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Class</span>
                  <span className="text-gray-900">{user.className || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Institute</span>
                  <span className="text-gray-900">{user.institute || 'Not specified'}</span>
                </div>
              </div>
            </div>

            {/* Subscription Information */}
            {user.subscription && (
              <div className="md:col-span-2 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Subscription Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan</span>
                      <span className="text-gray-900 capitalize">{user.subscription.plan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className="px-3 py-1 rounded-full text-sm capitalize
                        ${user.subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                        {user.subscription.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount</span>
                      <span className="text-gray-900">{user.subscription.amount} BDT</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Date</span>
                      <span className="text-gray-900">{formatDate(user.subscription.startDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">End Date</span>
                      <span className="text-gray-900">{formatDate(user.subscription.endDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID</span>
                      <span className="text-gray-900">{user.subscription.transactionId}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;