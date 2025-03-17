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

  return <div></div>;
};

export default Profile;
