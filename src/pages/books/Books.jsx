import React, { useState } from "react";
import BooksCard from "./BooksCard";
import { HiSearch } from "react-icons/hi";

const Books = () => {
  const [selectedPlan, setSelectedPlan] = useState("all");
  const books = [
    {
      _id: "67d76fd3453a676f2e7ed681",
      name: "Introduction to Robotics",
      author:"Md. Yamin Hossain",
      description:
        "Learn robotics from scratch with practical examples and build your first robot",
      thumbnail:
        "https://media.springernature.com/w316/springer-static/cover-hires/book/978-981-19-1983-1?as=webp",
      plan: "basic",
      chapters: [
        "65f8a1d8e4b09c7823a1b2c4",
        "65f8a1d8e4b09c7823a1b2c5",
        "65f8a1d8e4b09c7823a1b2c6",
      ],
      createdAt: "2025-03-17T00:41:55.890Z",
      updatedAt: "2025-03-17T00:41:55.890Z",
      __v: 0,
    },
    {
      _id: "67d76fd3453a676f2e7ed682",
      name: "Arduino Programming Essentials",
      author:"Mehedi Hasan Santo",
      description:
        "Master Arduino programming fundamentals for robotics applications with step-by-step tutorials",
      thumbnail:
        "https://media.springernature.com/w316/springer-static/cover-hires/book/978-981-19-1983-1?as=webp",
      plan: "basic",
      chapters: ["65f8a1d8e4b09c7823a1b2c7", "65f8a1d8e4b09c7823a1b2c8"],
      createdAt: "2025-03-17T01:15:22.430Z",
      updatedAt: "2025-03-17T01:15:22.430Z",
      __v: 0,
    },
    {
      _id: "67d76fd3453a676f2e7ed683",
      name: "Advanced Sensor Integration",
      author:"Arman khan",
      description:
        "Learn to integrate various sensors for your robotics projects with real-world applications",
      thumbnail:
        "https://media.springernature.com/w316/springer-static/cover-hires/book/978-981-19-1983-1?as=webp",
      plan: "standard",
      chapters: [
        "65f8a1d8e4b09c7823a1b2c9",
        "65f8a1d8e4b09c7823a1b2ca",
        "65f8a1d8e4b09c7823a1b2cb",
        "65f8a1d8e4b09c7823a1b2cc",
      ],
      createdAt: "2025-03-17T02:23:41.712Z",
      updatedAt: "2025-03-17T02:23:41.712Z",
      __v: 0,
    },
    {
      _id: "67d76fd3453a676f2e7ed684",
      name: "Mobile Robot Navigation",
      author:"MD. MUKTER HOSSAIN",
      description:
        "Comprehensive guide to path planning, obstacle avoidance, and autonomous navigation techniques",
      thumbnail:
        "https://media.springernature.com/w316/springer-static/cover-hires/book/978-981-19-1983-1?as=webp",
      plan: "standard",
      chapters: [
        "65f8a1d8e4b09c7823a1b2cd",
        "65f8a1d8e4b09c7823a1b2ce",
        "65f8a1d8e4b09c7823a1b2cf",
      ],
      createdAt: "2025-03-17T03:37:19.265Z",
      updatedAt: "2025-03-17T03:37:19.265Z",
      __v: 0,
    },
    {
      _id: "67d76fd3453a676f2e7ed685",
      name: "Computer Vision for Robotics",
      author:"Md. Yamin Hossain",
      description:
        "Advanced techniques for implementing computer vision in robotic systems with Python and OpenCV",
      thumbnail:
        "https://media.springernature.com/w316/springer-static/cover-hires/book/978-981-19-1983-1?as=webp",
      plan: "premium",
      chapters: [
        "65f8a1d8e4b09c7823a1b2d0",
        "65f8a1d8e4b09c7823a1b2d1",
        "65f8a1d8e4b09c7823a1b2d2",
        "65f8a1d8e4b09c7823a1b2d3",
        "65f8a1d8e4b09c7823a1b2d4",
      ],
      createdAt: "2025-03-17T04:52:08.931Z",
      updatedAt: "2025-03-17T04:52:08.931Z",
      __v: 0,
    },
    {
      _id: "67d76fd3453a676f2e7ed686",
      name: "Artificial Intelligence for Autonomous Robots",
      author:"Md. Yamin Hossain",
      description:
        "Cutting-edge AI techniques and algorithms for building intelligent robotic systems",
      thumbnail:
        "https://media.springernature.com/w316/springer-static/cover-hires/book/978-981-19-1983-1?as=webp",
      plan: "premium",
      chapters: [],
      createdAt: "2025-03-17T05:43:27.518Z",
      updatedAt: "2025-03-17T05:43:27.518Z",
      __v: 0,
    },
  ];

  const filteredBooks =
    selectedPlan === "all"
      ? books
      : books.filter((book) => book.plan === selectedPlan);
  return (
    <div className="max-w-7xl mt-20 mb-10 bg-white mx-auto p-5">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-3">
          <h3 className="text-lg font-medium text-[#606875]">Sort by : </h3>
          <div className="flex items-center  shadow gap-x-1 p-2 max-w-fit rounded-md">
            {["all", "basic", "standard", "premium"].map((plan) => (
              <button
                key={plan}
                className={`px-3 py-1 text-[13px] sm:text-[16px] rounded-md duration-300 ${
                  selectedPlan === plan
                    ? "bg-[#00776D] text-white"
                    : " text-black"
                }`}
                onClick={() => setSelectedPlan(plan)}
              >
                {plan.charAt(0).toUpperCase() + plan.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className=" flex  shadow  bg-white px-3 py-2 rounded-md items-center justify-end gap-x-2 max-w-[275px] border">
          <button className="text-[#515e67] hover:text-black duration-300 cursor-pointer ">
            <HiSearch  size={18}/>
          </button>
          <input
            type="text"
            className="outline-0 placeholder-[#CBCED3]  w-full bg-transparent"
            placeholder="Search..."
          />
        </div>
      </div>
      {/* card section */}
      <div className="grid grid-cols-1 mt-8 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBooks.map((book) => (
          <BooksCard key={book._id} book={book}></BooksCard>
        ))}
      </div>
    </div>
  );
};

export default Books;
