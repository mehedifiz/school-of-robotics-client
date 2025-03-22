import { FaArrowRight, FaBookOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

const BooksCard = ({ book }) => {
  const { _id, thumbnail, name, description, plan, author, chapters } = book;

  // Determine plan badge style
  const planBadgeStyle = {
    basic: "bg-blue-100 text-blue-800 border border-blue-200",
    standard: "bg-green-100 text-green-800 border border-green-200",
    premium: "bg-purple-100 text-purple-800 border border-purple-200",
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border transition-shadow duration-300 flex flex-col h-full group">
      {/* Thumbnail with plan badge */}
      <div className="relative">
        <img src={thumbnail} alt={name} className="w-full h-48 object-cover object-center" />
        <div className="absolute top-0 right-0 m-3">
          <span className={`capitalize text-xs font-semibold px-2.5 py-1 rounded-full ${planBadgeStyle[plan]}`}>{plan}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{name}</h3>

        <p className="text-sm text-gray-500 mb-2">By {author}</p>

        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

        <div className="flex items-center mt-auto">
          <div className="flex items-center text-gray-500 text-sm">
            <FaBookOpen className="mr-1" />
            <span>
              {chapters.length} {chapters.length === 1 ? "Chapter" : "Chapters"}
            </span>
          </div>

          <Link
            to={`/books/${_id}`}
            className="ml-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors group-hover:bg-blue-700"
          >
            Details <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BooksCard;
