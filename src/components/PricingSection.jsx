import AOS from "aos";
import { useEffect } from "react";

const PricingSection = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section
      id="pricing"
      className="py-16 relative text-white transition-colors duration-300 "
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-12">
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-4 text-teal-950">Packages</h2>
            <p className="text-teal-950 text-lg">
              There are different e-learning packages available. In each
              package, you get high-quality e-learning, excellent resources, and
              many more...
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Standard Plan */}
          <PricingCard
            plan="Standard"
            price="BDT 2000"
            features={["12+ Classes", "1+ Projects", "Build Tools"]}
            unavailable={["Free Update", "Source Files"]}
          />

          {/* Premium Plan (Most Popular) */}
          <PricingCard
            plan="Premium"
            price="BDT 3000"
            features={[
              "24+ Classes",
              "3+ Projects",
              "Build Tools",
              "Free Update",
            ]}
            unavailable={["Source Files"]}
            highlight
          />

          {/* Enterprise Plan */}
          <PricingCard
            plan="Enterprise"
            price="BDT 5000"
            features={[
              "36+ Classes",
              "5+ Projects",
              "Build Tools",
              "Free Update",
              "Source Files",
            ]}
          />
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({ plan, price, features, highlight }) => {
  return (
    <div
      className={`relative group ${highlight ? "border-2 border-teal-400" : ""}
      bg-gray-800 text-white rounded-lg shadow-md overflow-hidden mx-1 mt-4 
      hover:shadow-lg hover:scale-105 transition-transform duration-300`}
    >
      {highlight && (
        <span className="absolute top-9 text-xs right-0 bg-white text-teal-600 font-bold px-2 py-1 uppercase shadow-md rotate-90 translate-x-6 -translate-y-4">
          POPULAR
        </span>
      )}

      <div className="p-6 border-b border-gray-700 group-hover:bg-teal-700 group-hover:text-white transition-colors duration-300">
        <h6 className="text-lg font-medium">{plan}</h6>
        <h1 className="text-3xl font-bold mt-2">
          {price}{" "}
          <span className="text-sm font-normal text-gray-300">/-Monthly</span>
        </h1>
      </div>

      <div className="p-6 h-80 flex flex-col justify-between relative">
        <ul className="space-y-4">
          {features.map((text, index) => (
            <PricingFeature key={index} text={text} checked={true} />
          ))}
        </ul>

        <div className="absolute bottom-6 left-0 w-full flex p-2 justify-center">
          <button className=" w-full py-2 px-4 border border-teal-600 text-teal-600 rounded-md group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  );
};

const PricingFeature = ({ text, checked }) => {
  return (
    <li className="flex items-center">
      <div className="flex-shrink-0">
        <div className="h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center">
          {checked ? (
            <svg
              className="h-4 w-4 text-teal-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="h-4 w-4 text-teal-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      <div className="ml-3">
        <p className="text-sm text-gray-300 group-hover:text-white">{text}</p>
      </div>
    </li>
  );
};

export default PricingSection;
