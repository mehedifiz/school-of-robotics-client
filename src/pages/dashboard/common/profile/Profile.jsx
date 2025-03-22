import { Link } from "react-router-dom";
import photo from "./../../../../assets/images/photo.png";
const Profile = () => {
  const user = {
    _id: "65f6a1d8e4b09c7823a1b2c3",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: 9876543210,
    password: "$2a$10$xH4c2Y5ZvCn7Q8ZnVy3DRe9jGjKHD4GhW6OQh0BZsc1tLnUneKnMq",
    role: "student",
    subscription: "standard",
    progress: [
      {
        _id: "65f6a2e1f5d2a3b4c5d6e7f8",
        chapterId: "65f6a1e2d3c4b5a6978d8e9f",
        completed: true,
      },
      {
        _id: "65f6a3f2e1d2c3b4a5968d7e",
        chapterId: "65f6a2f3e4d5c6b7a8d9e0f1",
        completed: true,
      },
      {
        _id: "65f6a4f3e2d3c4b5a6d7e8f9",
        chapterId: "65f6a3f4e5d6c7b8a9d0e1f2",
        completed: false,
      },
      {
        _id: "65f6a5f4e3d4c5b6a7d8e9f0",
        moduleId: "65f6a4f5e6d7c8b9a0e1f2d3",
        completed: true,
      },
      {
        _id: "65f6a6f5e4d5c6b7a8d9e0f1",
        moduleId: "65f6a5f6e7d8c9b0a1e2f3d4",
        completed: false,
      },
    ],
    createdAt: "2024-03-17T10:25:12.345Z",
    updatedAt: "2024-03-17T15:30:45.678Z",
  };

  return (
    <div className="bg-white shadow  rounded-2xl p-8 ">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-5">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-x-5 gap-y-2">
          <img src={photo} alt="photo" />
          <div>
            <h2 className="text-2xl font-semibold text-center md:text-start text-[#000]">{user?.name}</h2>
            <p className="text-[16px] text-center md:text-start text-[#000] opacity-40">{user?.email}</p>
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-end items-end">
          <Link to="/dashboard/editProfile" >
          <button className="bg-[#00776D] px-7 py-2 hover:bg-[#84f5ee] text-white hover:text-[#00776D] duration-300 rounded-md">
            Edit
          </button>
        </Link>
          </div>
        </div>
        
      </div>
      <div className="max-w-lg mt-8 md:mt-12 pb-32">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <h3 className="w-3/8 text-[15px] md:text-lg text-[#000] opacity-60">Full Name</h3>
          <p className="w-5/8 text-[15px] md:text-lg text-[#000] opacity-60 font-semibold">{user?.name}</p>
        </div>
        <div className="flex justify-between items-center border-b border-gray-100 pb-4 pt-4">
          <h3 className="w-3/8 text-[15px] md:text-lg text-[#000] opacity-60">Email</h3>
          <p className="w-5/8 text-[15px] md:text-lg text-[#000] opacity-60 font-semibold">{user?.email}</p>
        </div>
        <div className="flex justify-between items-center border-b border-gray-100 pb-4 pt-4">
          <h3 className="w-3/8 text-[15px] md:text-lg text-[#000] opacity-60">Phone</h3>
          <p className="w-5/8 text-[15px] md:text-lg text-[#000] opacity-60 font-semibold">{user?.phone}</p>
        </div>
        <div className="flex justify-between items-center border-b border-gray-100 pb-4 pt-4">
          <h3 className="w-3/8 text-[15px] md:text-lg text-[#000] opacity-60">Member Since</h3>
          <p className="w-5/8 text-[15px] md:text-lg text-[#000] opacity-60 font-semibold">{user?.createdAt.slice(0, 10)}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
