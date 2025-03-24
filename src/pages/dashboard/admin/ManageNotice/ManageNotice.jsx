import React, { useState } from 'react';
import { Bell, Tag, Trash2, Edit } from 'lucide-react';
import { IoAddOutline } from 'react-icons/io5';
import AddNoticeModal from './AddNoticeModal';

// Mock data to simulate notices from backend
const initialNotices = [
    {
        _id: '1',
        title: 'System Maintenance',
        description: 'Our platform will undergo routine maintenance on April 15th from 2-4 AM EST.',
        targetPlans: ['premium', 'standard'],
        createdAt: new Date('2024-03-20T10:30:00Z')
    },
    {
        _id: '2',
        title: 'New Feature Rollout',
        description: 'We\'ve added advanced analytics to all standard and premium plans.',
        targetPlans: ['standard', 'premium'],
        createdAt: new Date('2024-03-22T15:45:00Z')
    },
    {
        _id: '3',
        title: 'Free Tier Update',
        description: 'Free tier users can now access basic reporting features.',
        targetPlans: ['free'],
        createdAt: new Date('2024-03-24T09:15:00Z')
    }
];

const ManageNotice = () => {
    const [notices, setNotices] = useState(initialNotices);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Format date to be more readable
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };


    // Delete notice handler
    const handleDeleteNotice = (id) => {
        setNotices(notices.filter(notice => notice._id !== id));
    };

    // Plan color mapping
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

                            <div className="flex space-x-2">
                                <button
                                    className="text-blue-500 hover:bg-blue-100 p-2 rounded-full"
                                    onClick={() => {/* Edit logic */ }}
                                >
                                    <Edit className="w-5 h-5" />
                                </button>
                                <button
                                    className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                                    onClick={() => handleDeleteNotice(notice._id)}
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <AddNoticeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

        </div >
    );
};


export default ManageNotice;