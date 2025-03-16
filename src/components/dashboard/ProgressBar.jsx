import { Progress, Typography } from "@material-tailwind/react";


const ProgressBar = () => {
  
  
  // Books Showcase Data
  const booksData = [
    {
      _id: "b001",
      name: "Robotics Fundamentals",
      plan: "basic",
      thumbnail: "https://example.com/images/robotics-book.jpg",
      stats: {
        totalChapters: 10,
        pagesCount: 245,
        readersCount: 850,
        rating: 4.6
      },
      progress: {
        currentChapter: 4,
        completedPages: 98,
        nextQuiz: "Chapter 4: Actuators",
        percentageComplete: "40%"
      },
      highlights: [
        "Beginner friendly",
        "Practical examples",
        "Interactive quizzes",
        "Downloadable resources"
      ]
    },
    {
      _id: "b002",
      name: "Advanced Robotics Control",
      plan: "premium",
      thumbnail: "https://example.com/images/advanced-control.jpg",
      stats: {
        totalChapters: 15,
        pagesCount: 380,
        readersCount: 620,
        rating: 4.9
      },
      progress: {
        currentChapter: 2,
        completedPages: 45,
        nextQuiz: "Chapter 2: Control Systems",
        percentageComplete: "15%"
      },
      highlights: [
        "Advanced concepts",
        "Real-world case studies",
        "Industry practices",
        "Certification prep"
      ]
    }
  ];
  

 
  return (
    <div className="w-full h-full bg-white rounded-xl p-5 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
      {booksData.map((book) => (
        <div key={book._id} className="mb-6">
          <Typography color="blue-gray" variant="h6">
            {book.name}
          </Typography>
          <div className="mb-2 flex items-center justify-between gap-4">
            <Typography color="gray" variant="small">
              Completed
            </Typography>
            <Typography color="gray" variant="small">
              {book.progress.percentageComplete}
            </Typography>
          </div>

          <Progress value={book.progress.percentageComplete} color="blue" />
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
