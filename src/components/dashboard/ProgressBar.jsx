import { Progress, Typography } from "@material-tailwind/react";


const ProgressBar = () => {
  return (
    <div>
        <div className="w-full h-full bg-white rounded-xl p-5">
        <div className="">
          <h2 className="text-2xl font-semibold">Your Progress</h2>
        </div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <Typography color="blue-gray" variant="h6">
              Completed 
            </Typography>
            <Typography color="blue-gray" variant="h6">
              50%
            </Typography>
          </div>
          <Progress value={50} />
        </div>
      </div>
  );
};

export default ProgressBar;
