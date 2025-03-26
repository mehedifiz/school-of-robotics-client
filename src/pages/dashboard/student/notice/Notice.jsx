import useAxios from '@/Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Bell, Tag } from 'lucide-react';

const Notice = () => {

    const axiosPublic = useAxios();

    const { data: notices = [] } = useQuery({
        queryKey: ['notices'],
        queryFn: async () => {
            const res = await axiosPublic.get('/notice/get-notices');
            return res.data.data;
        }
    })

    const getPlanColor = (plan) => {
        const colorMap = {
            'free': 'bg-green-100 text-green-800',
            'basic': 'bg-blue-100 text-blue-800',
            'standard': 'bg-purple-100 text-purple-800',
            'premium': 'bg-yellow-100 text-yellow-800'
        };
        return colorMap[plan] || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };


    return (
        <div>
            <h1 className="text-3xl font-bold flex items-center mb-6">
                <Bell className="mr-3 text-blue-600" />
                Notices
            </h1>

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
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Notice;