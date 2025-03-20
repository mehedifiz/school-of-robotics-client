import React from "react";

const CoursesData = () => {
  const coursesData = [
    {
      _id: "c001",
      title: "Introduction to Robotics",
      description: "Learn the fundamentals of robotics and automation",
      thumbnail: "https://example.com/images/intro-robotics.jpg",
      plan: "basic",
      stats: {
        totalModules: 8,
        totalDuration: "16 hours",
        studentsEnrolled: 1200,
        rating: 4.5,
      },
      highlights: [
        "Basic robot programming",
        "Sensor integration",
        "Motor control",
        "Project-based learning",
      ],
      progress: {
        completed: "60%",
        currentModule: "Module 4: Sensors",
        nextQuiz: "Sensor Integration Quiz",
      },
    },
    {
      _id: "c002",
      title: "Advanced Robot Programming",
      description: "Master complex robotics programming concepts",
      thumbnail: "https://example.com/images/advanced-robotics.jpg",
      plan: "premium",
      stats: {
        totalModules: 12,
        totalDuration: "24 hours",
        studentsEnrolled: 800,
        rating: 4.8,
      },
      highlights: [
        "AI integration",
        "Computer Vision",
        "ROS Framework",
        "Advanced Control Systems",
      ],
      progress: {
        completed: "30%",
        currentModule: "Module 3: Computer Vision",
        nextQuiz: "OpenCV Basics Quiz",
      },
    },
    {
      _id: "c003",
      title: "Advanced Robot Programming",
      description: "Master complex robotics programming concepts",
      thumbnail: "https://example.com/images/advanced-robotics.jpg",
      plan: "premium",
      stats: {
        totalModules: 12,
        totalDuration: "24 hours",
        studentsEnrolled: 800,
        rating: 4.8,
      },
      highlights: [
        "AI integration",
        "Computer Vision",
        "ROS Framework",
        "Advanced Control Systems",
      ],
      progress: {
        completed: "30%",
        currentModule: "Module 3: Computer Vision",
        nextQuiz: "OpenCV Basics Quiz",
      },
    },
  ];
  return (
    <div className="mt-12 md:mt-20">
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {coursesData.map((course) => (
          <div className="bg-white rounded-xl p-4 border">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{course.title}</h3>
            <p className="text-gray-600 text-sm">{course.description}</p>
            <div className="mt-3 text-sm text-gray-500">
              <p>
                <strong>Modules:</strong> {course.stats.totalModules}
              </p>
              <p>
                <strong>Duration:</strong> {course.stats.totalDuration}
              </p>
              <p>
                <strong>Students:</strong> {course.stats.studentsEnrolled}
              </p>
              <p>
                <strong>Rating:</strong> ⭐{course.stats.rating}
              </p>
            </div>
            <div className="mt-3">
              <h4 className="font-medium text-gray-700">Highlights:</h4>
              <ul className="list-disc pl-4 text-sm text-gray-600">
                {course.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-700">
                <strong>Progress:</strong> {course.progress.completed}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Current Module:</strong> {course.progress.currentModule}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Next Quiz:</strong> {course.progress.nextQuiz}
              </p>
            </div>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Continue Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesData;
