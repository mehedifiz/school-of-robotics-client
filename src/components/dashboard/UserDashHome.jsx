import PrograssBar from "./ProgressBar";
import Statistics from "./Statistics";


const UserDashHome = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                <Statistics></Statistics>
                <PrograssBar></PrograssBar>
            </div>
        </div>
    );
};

export default UserDashHome;