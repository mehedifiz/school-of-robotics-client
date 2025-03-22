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
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col h-full group">
      {/* Thumbnail with plan badge */}
      <div className="relative mx-auto mb-2 mt-4 group-hover:translate-y-[-5px] transition-all duration-300">
        {/* Book cover */}
        <div>
          <img src={thumbnail} alt={name} className="w-full h-52 object-cover object-center rounded-sm shadow-lg" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary transition-colors">{name}</h3>

        <p className="text-sm text-gray-500 mb-2">By {author}</p>

        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

        <div className="flex items-center justify-between mt-auto mb-4">
          {/* Plan badge */}
          <div>
            <span className={`capitalize text-xs font-semibold px-2.5 py-1 rounded-full ${planBadgeStyle[plan]}`}>{plan}</span>
          </div>

          {/* Chapter count badge */}
          <div>
            <span className="bg-black/60 text-white text-xs px-2.5 py-1 rounded-full flex items-center">
              <FaBookOpen className="mr-1" />
              {chapters.length} {chapters.length === 1 ? "Chapter" : "Chapters"}
            </span>
          </div>
        </div>

        <div>
          <Link
            to={`/book-details/${_id}`}
            className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
          >
            View Details <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BooksCard;
