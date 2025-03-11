import React, { useEffect } from 'react';
import AOS from 'aos';

const PricingSection = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section id="pricing" className="py-16 relative">
      <div className="absolute inset-0 bg-gray-50 opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-12">
          <div className="max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Packages</h2>
              <p className="text-gray-600 text-lg">There are different e-learning packages are available. In each package, you get high-quality e-learning, excellent resources and many more...</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Standard Plan */}
          <div data-aos="fade-right" data-aos-duration="1800">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mx-1 mt-4 hover:shadow-lg transition-shadow duration-300">
              <div className="p-6 border-b border-gray-200">
                <h6 className="text-lg font-medium text-gray-700">Standard</h6>
                <h1 className="text-3xl font-bold mt-2">BDT 2000 <span className="text-sm font-normal text-gray-500">/-Monthly</span></h1>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <PricingFeature text="12+ Classes" checked={true} />
                  <PricingFeature text="1+ Projects" checked={true} />
                  <PricingFeature text="Build Tools" checked={true} />
                  <PricingFeature text="Free Update" checked={false} />
                  <PricingFeature text="Source Files" checked={false} />
                </ul>
                <div className="mt-6">
                  <button className="w-full py-2 px-4 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-600 hover:text-white transition-colors duration-300">Choose Plan</button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Premium Plan */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mx-1 mt-4 border-2 border-teal-600 relative hover:shadow-lg transition-shadow duration-300">
              <span className="absolute top-0 right-0 bg-teal-600 text-white px-2 py-1 text-xs uppercase">popular</span>
              <div className="p-6 border-b border-gray-200">
                <h6 className="text-lg font-medium text-gray-700">Premium</h6>
                <h1 className="text-3xl font-bold mt-2">BDT 3000 <span className="text-sm font-normal text-gray-500">/-Monthly</span></h1>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <PricingFeature text="24+ Classes" checked={true} />
                  <PricingFeature text="3+ Projects" checked={true} />
                  <PricingFeature text="Build Tools" checked={true} />
                  <PricingFeature text="Free Update" checked={true} />
                  <PricingFeature text="Source Files" checked={false} />
                </ul>
                <div className="mt-6">
                  <button className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-300">Choose Plan</button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enterprise Plan */}
          <div data-aos="fade-left" data-aos-duration="1800">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mx-1 mt-4 hover:shadow-lg transition-shadow duration-300">
              <div className="p-6 border-b border-gray-200">
                <h6 className="text-lg font-medium text-gray-700">Enterprise</h6>
                <h1 className="text-3xl font-bold mt-2">BDT 5000 <span className="text-sm font-normal text-gray-500">/-Monthly</span></h1>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <PricingFeature text="36+ Classes" checked={true} />
                  <PricingFeature text="5+ Projects" checked={true} />
                  <PricingFeature text="Build Tools" checked={true} />
                  <PricingFeature text="Free Update" checked={true} />
                  <PricingFeature text="Source Files" checked={true} />
                </ul>
                <div className="mt-6">
                  <button className="w-full py-2 px-4 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-600 hover:text-white transition-colors duration-300">Choose Plan</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PricingFeature = ({ text, checked }) => {
  return (
    <li>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center">
            {checked ? (
              <svg className="h-4 w-4 text-teal-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-4 w-4 text-teal-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
        <div className="ml-3">
          <p className="text-sm text-gray-700">{text}</p>
        </div>
      </div>
    </li>
  );
};

export default PricingSection;