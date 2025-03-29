import useAxios from '@/Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlineDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const AllAdmin = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const axiosPublic = useAxios();

   const { data: admins = [], refetch } = useQuery({
      queryKey: ['admin'],
      queryFn: async () => {
         const res = await axiosPublic.get('/auth/admins')
         console.log(res.data.data.admins)
         return res.data.data.admins;
      }
   });

   const handleDeleteAdmin = (id) => {
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
                       const res = await axiosPublic.delete(`/auth/remove-admin/${id}`);
                       console.log(res.data);
   
                       if (res.data.success) {
                           Swal.fire({
                               title: "Deleted!",
                               text: "Admin has been deleted.",
                               icon: "success"
                           });
   
                           refetch()
                       } else {
                           Swal.fire({
                               title: "Error!",
                               text: res.data.message || "Failed to delete the admin.",
                               icon: "error"
                           });
                       }
                   } catch (error) {
                       console.error("Error deleting admin:", error);
                       Swal.fire({
                           title: "Error!",
                           text: "Something went wrong while deleting the admin.",
                           icon: "error"
                       });
                   }
               }
           });
       };

   return (
      <div>
         <div className="flex items-center justify-between">
            <h2 className="font-semibold text-2xl">Add Admins</h2>
            <button
               onClick={() => setIsModalOpen(true)}
               className="flex items-center space-x-1.5 py-2 px-6 rounded-sm bg-blue-600 text-white font-medium cursor-pointer"
            >
               <IoPersonAddOutline className="text-xl" />
               <span>Create Admin</span>
            </button>
         </div>

         <div className="pt-10">
            <div className="bg-white rounded-lg shadow overflow-hidden">
               <table className="w-full">
                  <thead className="bg-gray-50">
                     <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Phone
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Role
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Delete
                        </th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                     {admins.length > 0 ? (
                        admins.map((admin) => (
                           <tr key={admin._id}>
                              <td className="px-6 py-4 whitespace-nowrap">{admin.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{admin.phone}</td>
                              <td className="px-6 py-4 whitespace-nowrap capitalize">
                                 {admin.role}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-red-500 hover:text-red-600 cursor-pointer text-2xl flex justify-center">
                                 <MdOutlineDelete onClick={() => {
                                    handleDeleteAdmin(admin._id)
                                 }} />
                              </td>
                           </tr>
                        ))
                     ) : (
                        <tr>
                           <td
                              colSpan="3"
                              className="px-6 py-4 text-center text-gray-500"
                           >
                              No admins found
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Admin Creation Modal */}
         <AdminCreationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            axiosPublic={axiosPublic}
            refetchAdmins={refetch}
         />
      </div>
   );
};

// Admin Creation Modal Component
const AdminCreationModal = ({ isOpen, onClose, axiosPublic, refetchAdmins }) => {
   const [loading, setLoading] = useState(false);

   const handleCreateAdmin = async (e) => {
      e.preventDefault();
      setLoading(true);

      const form = e.target;
      const name = form.name.value;
      const phone = form.phone.value;
      const password = form.password.value;

      try {
         // Make API call to create admin
         await axiosPublic.post('/auth/create-admin', {
            name,
            phone,
            password,
            role: 'admin'
         });

         // Refetch admin list to update the table
         refetchAdmins();

         // Reset form and close modal
         form.reset();
         onClose();
      } catch (error) {
         console.error("Error creating admin:", error);
      } finally {
         setLoading(false);
      }
   };

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
         <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
               <h2 className="text-xl font-bold mb-4">Create Admin</h2>
               <form onSubmit={handleCreateAdmin}>
                  <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Name
                        </label>
                        <input
                           type="text"
                           name="name"
                           className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="Enter name"
                           required
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Phone
                        </label>
                        <input
                           type="tel"
                           name="phone"
                           className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="e.g. 1712345678"
                           required
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Password
                        </label>
                        <input
                           type="password"
                           name="password"
                           className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="Enter password"
                           required
                        />
                     </div>
                     <div className="flex items-center justify-end space-x-3 pt-2">
                        <button
                           type="button"
                           onClick={onClose}
                           className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                        >
                           Cancel
                        </button>
                        <button
                           type="submit"
                           disabled={loading}
                           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center"
                        >
                           {loading ? <LoadingSpinner /> : "Create Admin"}
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

// Simple loading spinner component
const LoadingSpinner = () => (
   <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
);

export default AllAdmin;