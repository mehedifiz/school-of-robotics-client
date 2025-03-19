

const BooksCard = ({book}) => {
    const {thumbnail, name, description, plan,author} = book;
    return (
        <div>
            <div className="border rounded-lg shadow-md ">
            <div className="bg-gray-50 py-5  flex justify-center items-center">
            <div className="w-34 h-62">
            <img
              src={thumbnail}
              alt={name}
              className=" h-full w-fit object-fill  rounded-md"
            />
            </div>
            </div>
            <div className="p-4">
            <span
              className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded ${
                plan === "basic"
                  ? "bg-green-200 text-green-700"
                  : plan === "standard"
                  ? "bg-blue-200 text-blue-700"
                  : "bg-purple-200 text-purple-700"
              }`}
            >
              {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </span>
            <h3 className="pt-1 text-lg text-[#5c52f4] font-bold">{name}</h3>
            <h3 className="py-1 text-lg font-medium">{author}</h3>
            <p className="text-[#858890] text-sm">{description}</p>
            
            </div>
          </div>
        </div>
    );
};

export default BooksCard;