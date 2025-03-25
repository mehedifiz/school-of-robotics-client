import React, { useState } from 'react';
import { Bell, Tag, Trash2, Edit } from 'lucide-react';
import { IoAddOutline } from 'react-icons/io5';
import AddNoticeModal from './AddNoticeModal';
import { useQuery } from '@tanstack/react-query';
import useAxios from '@/Hooks/useAxios';
import Swal from 'sweetalert2';


const ManageNotice = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const axiosPublic = useAxios();

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const { data: notices = [], refetch } = useQuery({
        queryKey: ['notices'],
        queryFn: async () => {
            const res = await axiosPublic.get('/notice/get-notices');
            return res.data.data;
        }
    })

    const handleDeleteNotice = (id) => {
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
                    const res = await axiosPublic.delete(`/notice/delete/${id}`);
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


    const getPlanColor = (plan) => {
        const colorMap = {
            'free': 'bg-green-100 text-green-800',
            'basic': 'bg-blue-100 text-blue-800',
            'standard': 'bg-purple-100 text-purple-800',
            'premium': 'bg-yellow-100 text-yellow-800'
        };
        return colorMap[plan] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold flex items-center">
                    <Bell className="mr-3 text-blue-600" />
                    Notices
                </h1>
                <div className="flex space-x-2">

                    <button onClick={() => setIsModalOpen(true)} className='flex items-center space-x-3 py-2 px-6 bg-indigo-700 text-white hover:bg-indigo-800 duration-300 rounded-sm'>
                        <IoAddOutline className='text-xl' />
                        <span>Add Notice</span>
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {notices.map(notice => (
                    <div
                        key={notice._id}
                        className="bg-white p-6 rounded-lg border transition-shadow"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{notice.title}</h2>
                                <p className="text-gray-600 mb-3">{notice.description}</p>

                                <div className="flex space-x-2 mb-3">
                                    {notice.targetPlans.map(plan => (
                                        <span
                                            key={plan}
                                            className={`px-2 py-1 rounded-full text-xs ${getPlanColor(plan)}`}
                                        >
                                            {plan}
                                        </span>
                                    ))}
                                </div>

                                <div className="text-sm text-gray-500 flex items-center">
                                    <Tag className="mr-2 w-4 h-4" />
                                    Created: {formatDate(notice.createdAt)}
                                </div>
                            </div>

                            <button
                                onClick={() => handleDeleteNotice(notice._id)}
                                className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <AddNoticeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                refetch={refetch}
            />

        </div >
    );
};


export default ManageNotice;