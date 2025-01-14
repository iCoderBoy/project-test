import { Search, WbSunny } from "@mui/icons-material";
import { ChartBox } from "./middle/ChartBox";
import { CompilationProgress } from "./middle/CompilationProgress";
import { Messages } from "./middle/Messages";
import { ToppersTable } from "./middle/TopperTable";

export default function MiddleContent() {
  return (
    <div className="middle-container  w-[100%] block min-h-[90vh] p-5">
      <div className="w-full flex items-center justify-around">
            <div className="bg-white p-[10px] rounded-[25px] max-w-[270px] w-full">
              <span className="mr-[10px]">
                <Search />
              </span>
              <input className="bg-transparent text-[#8a8a8a] border-[none]" style={{outline:"none"}} type="text" placeholder="Nima qidirayabsiz?" />
            </div>
            <div className="mode-toogle text-[white]">
              <WbSunny />
            </div>
          </div>
      <div className="main-content w-full mt-5 h-[80vh] flex flex-col overflow-y-auto 2xl:grid grid-cols-[1fr_30%] grid-rows-[repeat(2,50%)] gap-[20px] items-center justify-around py-5 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200"
      >
        <ChartBox/>
        <CompilationProgress/>
        <Messages/>
        <ToppersTable/>
      </div>
    </div>
  );
}
