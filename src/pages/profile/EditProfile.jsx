import { Pencil } from "lucide-react";
import photo from "./../../assets/images/photo.png";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    // const email = form.email.value
    const phone = user.phone;
    const gender = form.gender.value;
    const className = form.className.value;
    const institute = form.institute.value;
    const address = form.address.value;
    const userData = {
      name,
      phone,
      gender,
      className,
      institute,
      address,
    };
    console.table(userData);
    console.log(userData);
  };
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
          <div className="relative inline-block">
            {/* Profile Image */}
            <img
              className="rounded-md max-w-36 max-h-36 object-cover "
              src={`${photo}`}
              alt="Profile"
            />
            <div className=" absolute bottom-1 right-1 ">
              <label
                htmlFor="imageUpload"
                className="absolute bottom-1 right-1 bg-green-700 p-1 rounded-full cursor-pointer"
              >
                <Pencil size={15} className="text-white" />
              </label>
              <input
                type="file"
                name="image"
                id="imageUpload"
                className="hidden"
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl text-center md:text-start font-semibold text-[#000]">{user?.name}</h2>
            <p className="text-[16px] text-center md:text-start text-[#000] opacity-40">{user?.email}</p>
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-end items-end">
            <Link to="/dashboard/profile">
              <button className="bg-[#00776D]  px-7 py-2 hover:bg-[#84f5ee] text-white hover:text-[#00776D] duration-300 rounded-md">
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className=" mt-8 md:mt-12 pb-32">
        <form onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col space-y-2">
              <label className="text-lg text-[#000] opacity-70">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user?.name}
                className="bg-[#F9F9F9] outline-none py-3 px-5 rounded-md w-full"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-lg text-[#000] opacity-70">
                Mobile Number
              </label>
              <input
                type="text"
                defaultValue={user?.phone}
                disabled
                className="bg-[#F9F9F9] cursor-not-allowed outline-none py-3 px-5  rounded-md w-full"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-lg text-[#000] opacity-70">Gender</label>
              <select
                name="gender"
                id=""
                className="bg-[#F9F9F9] outline-none py-3 px-5  rounded-md w-full"
              >
                <option defaultValue="gender" value="">
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-lg text-[#000] opacity-70">Class</label>
              <select
                name="className"
                id="className"
                className="bg-[#F9F9F9] outline-none py-3 px-5  rounded-md w-full"
              >
                <option value="">Select Class</option>
                <option value="Six">Six</option>
                <option value="Seven">Seven</option>
                <option value="Eight">Eight</option>
                <option value="Nine">Nine</option>
                <option value="Ten">Ten</option>
                <option value="SSC Examiner">SSC Examiner</option>
                <option value="HSC 1st year">HSC 1st year</option>
                <option value="HSC 2nd year">HSC 2nd year</option>
                <option value="HSC Examiner">HSC Examiner</option>
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-lg text-[#000] opacity-70">
                Institute Name
              </label>
              <select
                name="institute"
                id="institute"
                className="bg-[#F9F9F9] outline-none py-3 px-5  rounded-md w-full"
              >
                <option value="">Select Institute</option>
                <option value="ABC">ABC</option>
                <option value="XYZ">XYZ</option>
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-lg text-[#000] opacity-70">Address</label>
              <input
                name="address"
                type="text"
                defaultValue={user?.address ? user?.address : "No address"}
                className="bg-[#F9F9F9] outline-none py-3 px-5  rounded-md w-full"
              />
            </div>
          </div>
          <div className="flex justify-end items-end">
            <button className="bg-[#00776D]  mt-5 px-7 py-2 hover:bg-[#84f5ee] text-white hover:text-[#00776D] duration-300 rounded-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
