import Calendar from "./right/Calendar";
import UpcomingActivities from "./right/Upcoming";

export default function RightSidebar() {
    return(
        <div className="w-[380px] h-[90vh] p-5 rounded-[25px] bg-white rounded-[25px];">
            <Calendar/>
            <h3 className="text-[#333] text-lg font-semibold mx-0 my-2.5">Upcoming activities</h3>
            <UpcomingActivities/>
        </div>
    )
}