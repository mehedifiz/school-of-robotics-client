import Statistics from "./Statistics";


const DashboardHome = () => {
    return (
        <div className="max-w-7xl mt-24  mx-auto p-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                <Statistics></Statistics>
                <Statistics></Statistics>
            </div>
        </div>
    );
};

export default DashboardHome;