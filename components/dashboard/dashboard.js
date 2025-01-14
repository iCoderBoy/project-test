import LeftSidebar from "./leftSidebar";
import MiddleContent from "./middleContent";
import RightSidebar from "./rightSidebar";

export default function Dashboard() {
  return (
    <div
      class="home-section w-full min-h-screen h-full relative bg-center bg-cover flex items-center justify-between p-[20px]"
      style={{ backgroundImage: "url('/images/desmumtz11.jpg')" }}
    >
      <div class="home-container w-full h-auto gap-[10px] relative p-[10px] flex items-center justify-around backdrop-blur-[25px] backdrop-saturate-[200%] bg-white/34 rounded-lg border border-white/20">
        <div className="hidden sm:block">
          <LeftSidebar />
        </div>

        <MiddleContent />
        <div className="hidden xl:block">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
