import { useState } from "react";
import { Edit, Search, Plus, Filter } from "lucide-react";
import useAxios from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManagePlans = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const axiosPublic = useAxios();

  const { data: plans = [], refetch, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const res = await axiosPublic.get("/plan/all");
      return res.data.data;
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const filteredPlans = plans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 rounded-xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Subscription Plans
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and monitor all subscription plans
          </p>
        </div>
        
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex gap-2">
            <button
              onClick={refetch}
              className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(3).fill(0).map((_, idx) => (
            <div key={idx} className="animate-pulse bg-white rounded-xl p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))
        ) : (
          filteredPlans.map((plan) => (
            <div key={plan._id} className="bg-white rounded-xl shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 capitalize">
                    {plan.name}
                  </h3>
                  <p className="text-2xl font-bold text-indigo-600 mt-1">
                    ${plan.price.toFixed(2)}
                  </p>
                </div>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full">
                  {plan.duration} Month
                </span>
              </div>
              
              <div className="text-sm text-gray-500">
                Last updated: {formatDate(plan.updatedAt)}
              </div>

              <div className="pt-4 border-t">
                <Link
                  to={`/dashboard/updatePlan/${plan._id}`}
                  className="w-full inline-flex justify-center items-center px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Plan
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Empty State */}
      {!isLoading && filteredPlans.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <div className="flex justify-center">
            <div className="bg-indigo-100 rounded-full p-3">
              <Search className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No plans found</h3>
          <p className="mt-2 text-sm text-gray-500">
            We couldn't find any plans matching your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManagePlans;