import { useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/Hooks/useAxios";
import useAuth from "@/Hooks/useAuth";
import Loader from "@/components/shared/Loader";

const Plan = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axios = useAxios();
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const res = await axios.get("/plan/all");
      return res.data.data;
    },
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace("BDT", "৳");
  };

  const getPopularPlan = () => {
    if (plans.length <= 1) return null;
    // Usually the middle-tier plan is marked as popular
    const sortedPlans = [...plans].sort((a, b) => a.price - b.price);
    return sortedPlans.length >= 3 ? sortedPlans[1]._id : sortedPlans[sortedPlans.length - 1]._id;
  };

  const popularPlanId = getPopularPlan();

  const getCurrentPlan = () => {
    return user?.subscription?.plan || "free";
  };

  const currentPlan = getCurrentPlan();

  const isPlanActive = (planName) => {
    return currentPlan === planName;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader />
      </div>
    );
  }

  return (
    <section className="w-full rounded-xl p-5">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-3">Choose Your Plan</h1>
        <p className="text-gray-600 max-w-2xl">
          Select the subscription that best fits your learning journey. Upgrade anytime to access more content and features.
        </p>
      </div>

      {/* Current Plan Indicator */}
      {currentPlan !== "free" && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 flex items-center">
          <div className="p-2 bg-blue-100 rounded-full mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-blue-800">
              Your current plan: <span className="capitalize font-bold">{currentPlan}</span>
            </p>
            {user?.subscription?.endDate && <p className="text-sm text-blue-600">Valid until: {new Date(user.subscription.endDate).toLocaleDateString()}</p>}
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {plans.map((plan) => {
          const isPopular = plan._id === popularPlanId;
          const isActive = isPlanActive(plan.name);
          const isHovered = hoveredPlan === plan._id;

          return (
            <div
              key={plan._id}
              className={`w-full flex flex-col justify-between h-full rounded-xl p-6 transition-all duration-300 relative bg-white border
                ${isPopular ? "border-primary" : "border-gray-100"} 
                ${isHovered ? "shadow-xl translate-y-[-8px]" : "shadow"}`}
              onMouseEnter={() => setHoveredPlan(plan._id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div className="absolute top-0 right-6 -translate-y-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full">POPULAR</div>
              )}

              {/* Active Plan Badge */}
              {isActive && (
                <div className="absolute top-0 left-6 -translate-y-1/2 px-4 py-1 bg-green-500 text-white text-xs font-bold rounded-full">CURRENT PLAN</div>
              )}

              <div>
                <h3 className={`text-2xl font-semibold mt-3 capitalize`}>{plan.name} Plan</h3>
                <p className={`text-sm mt-2 text-gray-600`}>{plan.description}</p>

                <div className={`mt-4`}>
                  <span className="text-3xl font-extrabold">{formatPrice(plan.price)}</span>
                  <span className={`text-base text-gray-400 ml-1`}>
                    /{plan.duration} {plan.duration > 1 ? "months" : "month"}
                  </span>
                </div>

                <div className="flex flex-col gap-3 mt-6">
                  {plan.features.map((feature, index) => (
                    <p
                      key={index}
                      className={`text-base flex items-center gap-3 
                        text-gray-600`}
                    >
                      <MdOutlineDone
                        className={`text-2xl p-1 rounded-full 
                          text-gray-800`}
                      />
                      {feature}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => navigate("/payment/checkout", { state: { planId: plan._id } })}
                  disabled={isActive}
                  className={`py-4 px-4 w-full rounded-md mt-3 transition-all duration-300
                    ${
                      isActive
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : isPopular
                        ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        : "bg-primary/10 hover:bg-primary/20 text-primary cursor-pointer"
                    }`}
                >
                  {isActive ? "Current Plan" : "Choose Plan"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Subscription Benefits</h3>
        <ul className="grid md:grid-cols-2 gap-x-12 gap-y-3">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-primary mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Learn at your own pace with flexible courses</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-primary mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Access to high-quality learning materials</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-primary mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Interactive quizzes and projects</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-primary mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Upgrade or downgrade anytime</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Plan;
