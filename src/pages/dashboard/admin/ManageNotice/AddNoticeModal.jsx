import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import useAxios from '@/Hooks/useAxios';
import toast from 'react-hot-toast';

const AddNoticeModal = ({ isOpen, onClose, refetch }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetPlans, setTargetPlans] = useState([]);
  const axiosPublic = useAxios();

  const planOptions = ['free', 'basic', 'standard', 'premium'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noticeData = { title, description, targetPlans };
    const res = await axiosPublic.post('/notice/create', noticeData);
    if (res.data.success) {
      toast.success('Notice has been created successfully!');
      onClose(true)
      refetch()
      setTitle('')
      setDescription('')
      setTargetPlans([])
    }
  };

  const togglePlan = (plan) => {
    setTargetPlans(prev => prev.includes(plan) ? prev.filter(p => p !== plan) : [...prev, plan]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60">
      <div className="relative w-full max-w-md mx-auto p-6 bg-white shadow-xl rounded-lg">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Create Notice</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm" placeholder="Enter notice title" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm h-32" placeholder="Enter notice description" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Target Plans</label>
            <div className="flex flex-wrap gap-2">
              {planOptions.map(plan => (
                <button key={plan} type="button" onClick={() => togglePlan(plan)}
                  className={`px-3 py-1 rounded-full text-sm flex items-center ${targetPlans.includes(plan) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {targetPlans.includes(plan) ? <>{plan} <X className="ml-2 w-4 h-4" /></> : plan}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center">
            <Plus className="mr-2 w-5 h-5" /> Create Notice
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNoticeModal;