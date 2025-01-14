// ChartBox Component
export function ChartBox() {
    return (
      <div className="backdrop-blur-md bg-white/75 rounded-[25px] border border-gray-300 p-4 w-[100%]  h-[100%]">
        <div className="chart-header flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Performance</h3>
          <select className="border-none outline-none bg-transparent font-medium text-gray-700">
            <option value="">Attendance</option>
            <option value="">GPA</option>
            <option value="">Subjects</option>
          </select>
        </div>
        <div className="chart-content">{/* Chart content here */}</div>
      </div>
    );
  }