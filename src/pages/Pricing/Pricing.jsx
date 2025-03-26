import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AOS from "aos";
import "aos/dist/aos.css";
import SectionHeader from "@/components/utility/SectionHeader";
import useAxios from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/Hooks/useAuth";

const PricingSection = () => {
  const navigate = useNavigate();
  const axios = useAxios();
  const { user } = useAuth();

  // Initialize animations
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
  }, []);

  // Fetch plans from API
  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["pricing-plans"],
    queryFn: async () => {
      const res = await axios.get("/plan/all");
      return res.data.data;
    },
  });

  // Determine which plan should be marked as popular (middle-tier plan)
  const getPopularPlan = () => {
    if (plans.length <= 1) return null;
    const sortedPlans = [...plans].sort((a, b) => a.price - b.price);
    return sortedPlans.length >= 3 ? sortedPlans[1]._id : sortedPlans[sortedPlans.length - 1]._id;
  };

  const popularPlanId = getPopularPlan();

  // Get user's current subscription plan
  const getCurrentPlan = () => {
    return user?.subscription?.plan || "free";
  };

  const currentPlan = getCurrentPlan();

  // Check if a plan is the user's current active plan
  const isPlanActive = (planName) => {
    return currentPlan === planName;
  };

  return (
    <section id="packages" className="bg-white py-16 md:py-28 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Our Pricing"
          title="Subscription Plans"
          description="Choose a plan that works best for your learning journey. Each subscription includes unlimited access to our platform and resources."
        />

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {plans.map((plan, index) => {
              const isPopular = plan._id === popularPlanId;
              const isActive = isPlanActive(plan.name);

              return (
                <div
                  key={plan._id}
                  className={cn(
                    "glass-card p-8 transition-all duration-300 hover:shadow-xl relative flex flex-col justify-between",
                    isPopular ? "border-primary border-2" : "border border-gray-100"
                  )}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div>
                    {isPopular && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full">
                        POPULAR
                      </div>
                    )}

                    <h3 className="text-xl font-bold mb-2 capitalize">{plan.name} Plan</h3>
                    <div className="mb-6">
                      <span className="text-3xl font-bold">BDT {plan.price}</span>
                      <span className="text-gray-500">
                        /{plan.duration} {plan.duration > 1 ? "months" : "month"}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-6 text-sm">{plan.description}</p>

                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate("/payment/checkout", { state: { planId: plan._id } })}
                    disabled={isActive}
                    className={cn(
                      "w-full",
                      isActive
                        ? "bg-gray-300 hover:bg-gray-300 text-gray-500 cursor-not-allowed"
                        : isPopular
                        ? "bg-primary hover:bg-primary-600 text-white"
                        : "bg-white border-2 border-primary text-primary hover:bg-primary-50"
                    )}
                  >
                    {isActive ? "Current Plan" : "Choose Plan"}
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        {/* Subscription Benefits */}
        <div className="mt-16 bg-gray-50 rounded-lg p-6 border border-gray-200" data-aos="fade-up">
          <h3 className="text-lg font-semibold mb-4">Why Subscribe?</h3>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-3">
            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <span>Learn at your own pace with flexible courses</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <span>Access to high-quality learning materials</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <span>Interactive quizzes and projects</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <span>Regular updates and new content</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <span>Certificates upon course completion</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <span>Upgrade or downgrade anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
