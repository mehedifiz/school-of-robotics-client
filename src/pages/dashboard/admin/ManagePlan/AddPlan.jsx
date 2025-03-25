import { useState, useRef } from 'react';
import { AlertCircle, Check } from 'lucide-react';
import useAxios from '@/Hooks/useAxios';

export default function AddPlan() {
    const [errors, setErrors] = useState({});
    const [features, setFeatures] = useState(['']);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const axiosPublic = useAxios();

    const formRef = useRef(null);

    const planOptions = ["Free Plan", "Basic Plan", "Standard Plan", "Premium Plan"];
    const accessLevels = ["free", "basic", "standard", "premium"];

    const handleFeatureChange = (index, value) => {
        const updatedFeatures = [...features];
        updatedFeatures[index] = value;
        setFeatures(updatedFeatures);
    };

    const addFeature = () => {
        setFeatures([...features, '']);
    };

    const removeFeature = (index) => {
        const updatedFeatures = features.filter((_, i) => i !== index);
        setFeatures(updatedFeatures);
    };

    const getFormData = () => {
        if (!formRef.current) return null;

        const formData = new FormData(formRef.current);
        const resourceAccess = {
            courses: formData.get('courses'),
            books: formData.get('books')
        };

        return {
            name: formData.get('name'),
            price: formData.get('price'),
            duration: formData.get('duration'),
            features: features.filter(feature => feature.trim()),
            resourceAccess,
            description: formData.get('description')
        };
    };

    const validateForm = (data) => {
        const newErrors = {};

        if (!data.name) newErrors.name = "Plan name is required";
        if (!planOptions.includes(data.name)) newErrors.name = "Invalid plan name";

        if (!data.price && data.price !== '0') newErrors.price = "Price is required";
        if (isNaN(Number(data.price)) || Number(data.price) < 0) newErrors.price = "Price must be a positive number";

        if (!data.duration) newErrors.duration = "Duration is required";
        if (isNaN(Number(data.duration)) || Number(data.duration) <= 0) newErrors.duration = "Duration must be a positive number";

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
                await axiosPublic.post('/plan/create', data)
                setSubmitSuccess(true);
                formRef.current.reset();
                setFeatures(['']);

            } catch (error) {
                console.error("Error submitting form:", error);
                setErrors({ submit: "Failed to submit form. Please try again." });
            }
        }
    };

    const getDescriptionCharCount = () => {
        if (!formRef.current) return 0;
        const description = formRef.current.description.value || '';
        return description.length;
    };

    return (
        <div className=" p-8 bg-white rounded-lg border">
            <h1 className="text-2xl font-bold mb-6 text-indigo-700">Create New Subscription Plan</h1>

            {submitSuccess && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
                    <Check className="mr-2" size={20} />
                    <span>Subscription plan created successfully!</span>
                </div>
            )}

            {errors.submit && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
                    <AlertCircle className="mr-2" size={20} />
                    <span>{errors.submit}</span>
                </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Plan Name */}
                    <div>
                        <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                            Plan Name <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="name"
                            name="name"
                            defaultValue=""
                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <option value="">Select a plan</option>
                            {planOptions.map(plan => (
                                <option key={plan} value={plan}>{plan}</option>
                            ))}
                        </select>
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block mb-2 font-medium text-gray-700">
                            Price (USD) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            id="price"
                            name="price"
                            placeholder="0.00"
                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.price ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                    </div>

                    {/* Duration */}
                    <div>
                        <label htmlFor="duration" className="block mb-2 font-medium text-gray-700">
                            Duration (days) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            placeholder="30"
                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.duration ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
                    </div>
                </div>

                {/* Resource Access */}
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h3 className="text-lg font-medium mb-4 text-gray-700">Resource Access Levels</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="courses" className="block mb-2 font-medium text-gray-700">
                                Courses Access <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="courses"
                                name="courses"
                                defaultValue="basic"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {accessLevels.map(level => (
                                    <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="books" className="block mb-2 font-medium text-gray-700">
                                Books Access <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="books"
                                name="books"
                                defaultValue="basic"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {accessLevels.map(level => (
                                    <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div>
                    <label className="block mb-2 font-medium text-gray-700">
                        Features <span className="text-red-500">*</span>
                        {errors.features && <span className="ml-2 text-sm text-red-500">{errors.features}</span>}
                    </label>

                    {features.map((feature, index) => (
                        <div key={index} className="flex mb-2">
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
                                    className="ml-2 p-3 bg-red-50 text-red-500 rounded-md hover:bg-red-100"
                                >
                                    Remove
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
                        placeholder="Provide a detailed description of the subscription plan"
                        onChange={() => setErrors({ ...errors, description: null })}
                        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.description ? 'border-red-500' : 'border-gray-300'
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
                        Create Subscription Plan
                    </button>
                </div>
            </form>
        </div>
    );
}
