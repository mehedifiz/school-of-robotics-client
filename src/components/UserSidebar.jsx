import { NavLink } from "react-router-dom";
import logo from './../assets/images/logo-footer.png'

const UserSidebar = () => {
    return (
        <div className="dashboard-side-nav pt-5 min-h-screen flex flex-col items-center justify-between">
      <Link to="/">
        <img src={logo} className="max-w-20 mx-auto" alt="Logo" />
      </Link>

      <ul className="space-y-1">
        <li>
          <NavLink to="/dashboard/student-dashboard" className="block p-3 m-2 rounded-xl text-[#14213d] hover:text-primary duration-300">
            {/* <Houss className="size-6" /> */} Home 
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/rapidRead" className="block p-3 m-2 rounded-xl text-[#14213d] hover:text-primary duration-300">
            {/* <BookOpenCheck className="size-6" />  */} Bood
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/mock-test" className="block p-3 m-2 rounded-xl text-[#14213d] hover:text-primary duration-300">
            {/* <NotebookText className="size-6" /> */} NotebookText
          </NavLink>
        </li>

        <li>
          <NavLink to="/" className="block p-3 m-2 rounded-xl text-[#14213d] hover:text-primary duration-300">
            {/* <ClipboardList className="size-6" /> */}ClipboardList
          </NavLink>
        </li>

        <li>
          <NavLink to="leaderboard" className="block p-3 m-2 rounded-xl text-[#14213d] hover:text-primary duration-300">
            {/* <PiRanking className="size-6" /> */}PiRanking
          </NavLink>
        </li>
      </ul>

      <div className="pb-8">
        <NavLink to="/" className="block p-3 m-2 rounded-xl text-[#14213d] hover:text-primary duration-300">
          {/* <Settings className="size-6" /> */}Settings
        </NavLink>
      </div>
    </div>
    );
};

export default UserSidebar;