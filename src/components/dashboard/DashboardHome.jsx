import UserDashHome from "./UserDashHome";



const DashboardHome = () => {
    const role = 'user'
    return (
        <div className="max-w-7xl mt-24  mx-auto p-4 ">
            {role === 'user' && <UserDashHome></UserDashHome>}
        </div>
    );
};

export default DashboardHome;