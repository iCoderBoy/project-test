export function CompilationProgress() {
  return (
    <div className="main flex flex-col bg-white rounded-[25px] p-4 border h-[100%] border-gray-200 w-full">
      <h3 className="text-lg font-bold mb-4">Compilation Progress</h3>
      <div className="compilation-content flex flex-col gap-4 overflow-y-auto">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="compilation-item flex justify-between items-center p-4 bg-gray-100 rounded-lg"
          >
            <div className="text-side">
              <h4 className="text-base font-bold">Life Contingency</h4>
              <p className="text-sm text-gray-500">Chapter 3</p>
            </div>
            <div className="progressBx relative w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm font-bold">75%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
