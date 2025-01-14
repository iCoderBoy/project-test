import topperstyle from "./topper.module.css"

export function ToppersTable() {
  return (
    <div className="main toppers-table h-[100%] bg-white rounded-[25px] p-4 border border-gray-200 w-full ">
      <h3 className="text-lg font-bold mb-4">Top Performing Groups</h3>
      <div className="main flex flex-col gap-2  overflow-y-auto h-[270px]" >

        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`${topperstyle.toppers_item} flex items-center gap-4 p-4 bg-gray-100 rounded-lg`}
          >
            <div className="toppers-imgBx w-12 h-12 rounded-full bg-orange-500"></div>
            <div className="text-side">
              <h4 className="text-base font-bold">BTechIT 401</h4>
              <p className="text-sm text-gray-500">9.6/10 POINTS</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
