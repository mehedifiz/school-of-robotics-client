import { useState } from "react";
import { Trash2, Edit, Search, RefreshCw } from "lucide-react";
import useAxios from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManagePlans = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const axiosPublic = useAxios();

  const { data: plans = [], refetch } = useQuery({
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

  const handleDeletePlan = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => { 
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/plan/delete/${id}`); 
          console.log(res.data);
  
          if (res.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Plan has been deleted.",
              icon: "success"
            });

            refetch()
          } else {
            Swal.fire({
              title: "Error!",
              text: res.data.message || "Failed to delete the plan.",
              icon: "error"
            });
          }
        } catch (error) {
          console.error("Error deleting plan:", error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong while deleting the plan.",
            icon: "error"
          });
        }
      }
    });
  };
  

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header Section */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-indigo-700">
          Manage Subscription Plans
        </h1>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
          {/* Search Bar */}
          <div className="relative flex-grow sm:flex-grow-0 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Table Container with Scroll */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {plans?.map((plan) => (
              <tr key={plan._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {plan.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${plan.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {plan.duration} days
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(plan.updatedAt)}
                </td>
                <td className="px-6 py-4 flex gap-2 justify-end whitespace-nowrap">
                  <Link to={`/dashboard/updatePlan/${plan._id}`} className="bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-700 transition">
                    Update Plan
                  </Link>
                  <button onClick={() => handleDeletePlan(plan._id)} className="bg-red-600 text-white py-1 px-4 rounded-md hover:bg-red-700 transition">
                    Delete Plan
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePlans;
