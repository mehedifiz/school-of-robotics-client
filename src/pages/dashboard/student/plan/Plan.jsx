import React from "react";
import { MdOutlineDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/Hooks/useAxios";
import useAuth from "@/Hooks/useAuth";

const Plan = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axios = useAxios();

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const res = await axios.get("/plan/all");
      return res.data.data;
    },
  });

  console.log(plans, user.subscription.plan);
  //   {
  //     "_id": "67daae126d6be0ae9b131cd1",
  //     "name": "basic",
  //     "price": 4000,
  //     "duration": 6,
  //     "features": [
  //         "Access to basic courses",
  //         "Basic programming tutorials",
  //         "Forum access"
  //     ],
  //     "resourceAccess": {
  //         "courses": "basic",
  //         "books": "basic"
  //     },
  //     "description": "Perfect for beginners starting their journey",
  //     "createdAt": "2025-03-19T11:44:18.711Z",
  //     "updatedAt": "2025-03-26T16:27:15.419Z",
  //     "__v": 0
  // },

  return (
    <section className="w-full rounded-xl p-5">
      {/* Header */}
      <h1 className="text-3xl font-medium">Chose your plan</h1>

      {/* Pricing Cards */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-white gap-8  rounded-xl mt-10 ">
        {/* Base Plan */}
        <div className="w-full flex flex-col justify-between h-full border bg-white rounded-xl p-5">
          <div>
            <h3 className="text-2xl font-semibold mt-3">Basic</h3>
            <div className="flex flex-col gap-3 mt-5">
              <p className="text-base text-gray-500 flex items-center gap-3">
                <MdOutlineDone className="text-2xl p-1 rounded-full text-gray-800" />
                Upload Video with HD Resolution
              </p>
              <p className="text-base text-gray-500 flex items-center gap-3">
                <MdOutlineDone className="text-2xl p-1 rounded-full text-gray-800" />
                Attachment & Post Scheduling
              </p>
              <p className="text-base text-gray-300 flex items-center gap-3">
                <RxCross1 className="text-2xl p-1 rounded-full text-gray-300" />
                Set your rates
              </p>
              <p className="text-base text-gray-300 flex items-center gap-3">
                <RxCross1 className="text-2xl p-1 rounded-full text-gray-300" />
                Exclusive Deals
              </p>
              <p className="text-base text-gray-300 flex items-center gap-3">
                <RxCross1 className="text-2xl p-1 rounded-full text-gray-300" />
                Advanced Statistics
              </p>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-extrabold">৫৯৯ ৳</h3>
              <span className="text-base text-gray-400 mb-2">/month</span>
            </div>
            <button
              onClick={() => navigate("/payment/checkout", { state: { planId: "67daae126d6be0ae9b131cd1" } })}
              className="py-4 px-4 w-full bg-primary cursor-pointer text-white rounded-md mt-3"
            >
              Choose
            </button>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="w-full flex flex-col justify-between h-full bg-gray-900 rounded-xl p-6 sm:mb-16">
          <div>
            <div className="flex items-center justify-between w-full">
              <h3 className="text-2xl font-semibold mt-3 text-white">Pro</h3>
              <span className="rounded-md px-4 py-1 bg-purple-50 text-primary text-sm">Save ৪২%</span>
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <p className="text-base text-gray-200 flex items-center gap-3">
                <MdOutlineDone className="text-2xl p-1 rounded-full text-gray-200" />
                Upload Video with HD Resolution
              </p>
              <p className="text-base text-gray-200 flex items-center gap-3">
                <MdOutlineDone className="text-2xl p-1 rounded-full text-gray-200" />
                Attachment & Post Scheduling
              </p>
              <p className="text-base text-gray-200 flex items-center gap-3">
                <MdOutlineDone className="text-2xl p-1 rounded-full text-gray-200" />
                Set your rates
              </p>
              <p className="text-base text-gray-200 flex items-center gap-3">
                <MdOutlineDone className="text-2xl p-1 rounded-full text-gray-200" />
                Exclusive Deals
              </p>
              <p className="text-base text-gray-500 flex items-center gap-3">
                <RxCross1 className="text-2xl p-1 rounded-full text-gray-500" />
                Advanced Statistics
              </p>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-extrabold text-white">৯৯৯ ৳</h3>
              <span className="text-base text-gray-300 mb-2">/month</span>
            </div>
            <button
              onClick={() => navigate("/payment/checkout", { state: { planId: "67e1909ca02d1538e0b12bbd" } })}
              className="py-4 px-4 w-full bg-primary cursor-pointer text-white rounded-md mt-3"
            >
              Choose
            </button>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="w-full flex flex-col justify-between h-full border bg-white rounded-xl p-5">
          <div>
            <h3 className="text-2xl font-semibold mt-3">All Course</h3>
            <div className="flex flex-col gap-3 mt-5">
              <p className="text-base text-gray-500 flex items-center gap-3">
                <MdOutlineDone className="text-2xl p-1 rounded-full text-gray-800" />
                Upload Video with HD Resolution
              </p>
              <p className="text-base text-gray-500 flex items-center gap-3">
                <MdOutlineDone className="text-2xl p-1 rounded-full text-gray-800" />
                Attachment & Post Scheduling
              </p>
              <p className="text-base text-gray-800 flex items-center gap-3">
                <MdOutlineDone className="text-2xl p-1 rounded-full text-gray-800" />
                Set your rates
              </p>
              <p className="text-base text-gray-800 flex items-center gap-3">
                <MdOutlineDone className="text-2xl p-1 rounded-full text-gray-800" />
                Exclusive Deals
              </p>
              <p className="text-base text-gray-800 flex items-center gap-3">
                <MdOutlineDone className="text-2xl p-1 rounded-full text-gray-800" />
                Advanced Statistics
              </p>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-extrabold">৫৯৯৯ ৳</h3>
              <span className="text-base text-gray-400 mb-2">/month</span>
            </div>
            <button
              onClick={() => navigate("/payment/checkout", { state: { planId: "67e1acc322da00ce3be1bc2e" } })}
              className="py-4 px-4 w-full bg-primary/10 text-primary rounded-md mt-3 cursor-pointer"
            >
              Choose
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plan;
