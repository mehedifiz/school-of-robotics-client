import { useState, useRef, useEffect } from 'react';
import { AlertCircle, Check, Trash } from 'lucide-react';
import useAxios from '@/Hooks/useAxios';
import { useLoaderData, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function UpdatePlan() {
    const [errors, setErrors] = useState({});
    const [features, setFeatures] = useState(['']);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const axiosPublic = useAxios();
    const plan = useLoaderData();
    const formRef = useRef(null);

    useEffect(() => {
        if (plan?.data?.features) {
            setFeatures(plan.data.features.length > 0 ? plan.data.features : ['']);
        }
    }, [plan]);

    const handleFeatureChange = (index, value) => {
        const updatedFeatures = [...features];
        updatedFeatures[index] = value;
        setFeatures(updatedFeatures);
    };

    const addFeature = () => {
        setFeatures([...features, '']);
    };

    const removeFeature = (index) => {
        if (features.length > 1) {
            const updatedFeatures = features.filter((_, i) => i !== index);
            setFeatures(updatedFeatures);
        }
    };

    const getFormData = () => {
        if (!formRef.current) return null;

        return {
            price: formRef.current.price.value,
            duration: Number(formRef.current.duration.value),
            features: features.filter(feature => feature.trim()),
            description: formRef.current.description.value
        };
    };

    const validateForm = (data) => {
        const newErrors = {};

        if (!data.price && data.price !== '0') newErrors.price = "Price is required";
        if (isNaN(Number(data.price)) || Number(data.price) < 0) newErrors.price = "Price must be a positive number";

        if (!data.duration) newErrors.duration = "Duration is required";
        if (isNaN(Number(data.duration)) || Number(data.duration) < 1) {
            newErrors.duration = "Duration must be at least 1 month";
        }

        if (data.features.length === 0) newErrors.features = "At least one feature is required";
        if (data.features.some(feature => !feature.trim())) newErrors.features = "All features must have a value";

        if (!data.description) newErrors.description = "Description is required";
        if (data.description.length > 500) newErrors.description = "Description cannot exceed 500 characters";

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitSuccess(false);

        const data = getFormData();
        const newErrors = validateForm(data);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                await axiosPublic.patch(`/plan/update/${plan.data._id}`, data);
                setSubmitSuccess(true);
            } catch (error) {
                console.error("Error updating plan:", error);
                setErrors({ submit: error.response?.data?.message || "Failed to update plan. Please try again." });
            }
        }
    };

    const getDescriptionCharCount = () => {
        if (!formRef.current) return 0;
        const description = formRef.current.description.value || '';
        return description.length;
    };

    return (
        <div className="p-8 bg-white rounded-lg border">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-indigo-700">Update Plan</h1>
                    <p className="text-gray-600 mt-1">{plan.data.name}</p>
                </div>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full">
                    {plan.data.duration} Month
                </span>
            </div>

            {submitSuccess && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
                    <Check className="mr-2" size={20} />
                    <span>Plan updated successfully!</span>
                </div>
            )}

            {errors.submit && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
                    <AlertCircle className="mr-2" size={20} />
                    <span>{errors.submit}</span>
                </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Price Input */}
                    <div>
                        <label htmlFor="price" className="block mb-2 font-medium text-gray-700">
                            Price (BDT) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            id="price"
                            name="price"
                            defaultValue={plan.data.price}
                            placeholder="0.00"
                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                errors.price ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                    </div>

                    {/* Duration Input */}
                    <div>
                        <label htmlFor="duration" className="block mb-2 font-medium text-gray-700">
                            Duration (Months) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            min="1"
                            defaultValue={plan.data.duration}
                            placeholder="Enter duration in months"
                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                errors.duration ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
                    </div>
                </div>

                {/* Features */}
                <div>
                    <label className="block mb-2 font-medium text-gray-700">
                        Features <span className="text-red-500">*</span>
                        {errors.features && (
                            <span className="ml-2 text-sm text-red-500">{errors.features}</span>
                        )}
                    </label>

                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={feature}
                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                placeholder="Enter a feature"
                                className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeFeature(index)}
                                    className="ml-2 p-2 bg-red-50 text-red-500 rounded-md hover:bg-red-100"
                                >
                                    <Trash size={16} />
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addFeature}
                        className="mt-2 inline-flex items-center px-4 py-2 border border-indigo-300 text-indigo-700 bg-indigo-50 rounded-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        + Add Feature
                    </button>
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block mb-2 font-medium text-gray-700">
                        Description <span className="text-red-500">*</span>
                        <span className="text-sm font-normal text-gray-500 ml-2">
                            ({getDescriptionCharCount()}/500 characters)
                        </span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        defaultValue={plan.data.description}
                        placeholder="Provide a detailed description of the subscription plan"
                        onChange={() => setErrors({ ...errors, description: null })}
                        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                            errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                    ></textarea>
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Update Plan
                    </button>
                </div>
            </form>
        </div>
    );
}
