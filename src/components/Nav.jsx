import { CiSearch } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="border-b bg-slate-50 border-gray-200">
      <div className="max-w-7xl mx-auto p-4">
        <div className=" mx-auto flex justify-between items-center">
          <div className="flex items-center gap-x-8">
            <Link to="/" className="text-3xl text-primary font-bold">
              Logo
            </Link>
            <ul className="flex space-x-3 font-light">
              <NavLink to="/about">About</NavLink>
              <NavLink to="/course">Course</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </ul>
          </div>

          <div className="flex items-center space-x-5">
            <form className="border flex items-center border-gray-300  rounded-sm pl-2 ">
              <CiSearch />
              <input
                type="search"
                name=""
                className="p-1.5 outline-0 border-none placeholder:text-sm"
                placeholder="Search Course"
              />
            </form>

            <Link
              to="/register"
              className="bg-primary px-4 py-2 rounded-sm text-white inline-block text-sm font-semibold"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
