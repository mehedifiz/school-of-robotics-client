import { Pencil } from "lucide-react";
import photo from "./../../../../assets/images/photo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxios from "@/Hooks/useAxios";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";

const EditProfile = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const axios = useAxios();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user/get-user/${userId}`);
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data');
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId, axios]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const updateData = {
      name: form.name.value,
      gender: form.gender.value,
      className: form.className.value,
      institute: form.institute.value,
      address: form.address.value,
    };

    try {
      const response = await axios.patch(`/user/update-profile`, updateData);
      
      if (response.data.success) {
        toast.success('Profile updated successfully');
        navigate('/dashboard/profile');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-2xl p-8">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-5">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-x-5 gap-y-2">
          <div className="relative inline-block">
            <img
              className="rounded-md max-w-36 max-h-36 object-cover"
              src={photo}
              alt="Profile"
            />
            <div className="absolute bottom-1 right-1">
              <label
                htmlFor="imageUpload"
                className="absolute bottom-1 right-1 bg-teal-600 p-1 rounded-full cursor-pointer hover:bg-teal-700 transition-colors"
              >
                <Pencil size={15} className="text-white" />
              </label>
              <input
                type="file"
                name="image"
                id="imageUpload"
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl text-center md:text-start font-semibold text-gray-900">
              {userData.name}
            </h2>
            <p className="text-base text-center md:text-start text-gray-500">
              {userData.phone}
            </p>
          </div>
        </div>
        <div className="w-full md:w-auto">
          <div className="flex justify-end">
            <Link to="/dashboard/profile">
              <button className="bg-teal-600 px-7 py-2 hover:bg-teal-700 text-white duration-300 rounded-md">
                Back to Profile
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 md:mt-12 pb-8">
        <form onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={userData.name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                defaultValue={userData.phone}
                disabled
                className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                defaultValue={userData.gender || ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Class */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">Class</label>
              <select
                name="className"
                defaultValue={userData.className || ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
              >
                <option value="">Select Class</option>
                <option value="Six">Six</option>
                <option value="Seven">Seven</option>
                <option value="Eight">Eight</option>
                <option value="Nine">Nine</option>
                <option value="Ten">Ten</option>
                <option value="SSC Examiner">SSC Examiner</option>
                <option value="HSC 1st year">HSC 1st year</option>
                <option value="HSC 2nd year">HSC 2nd year</option>
                <option value="HSC Examiner">HSC Examiner</option>
              </select>
            </div>

            {/* Institute Name - Changed to text input */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Institute Name
              </label>
              <input
                type="text"
                name="institute"
                defaultValue={userData.institute || ""}
                placeholder="Enter your institute name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <input
                name="address"
                type="text"
                defaultValue={userData.address || ""}
                placeholder="Enter your address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center px-6 py-2.5 bg-teal-600 text-white font-medium text-sm rounded-lg hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;