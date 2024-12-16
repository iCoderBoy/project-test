import { Close, Person, Menu } from "@mui/icons-material";

import React, { useState } from "react";

const LeftSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  return (
    <div className={`w-full sm:w-1/4 bg-gradient-to-b from-gray-800 to-gray-600 text-white p-6 flex flex-col h-screen fixed w-full min-h-screen top-[0] ${isOpen ? "left-[-100%]": "left-[0]"} transition-all z-[90]`}>
      
      <div
        className={`w-[50px] h-[50px] bg-blue-600 absolute top-[10px] ${isOpen ? "rounded-tr-[10px] rounded-br-[10px] right-[-50px]" : "rounded-lg right-[20px]"} transition-all md:hidden sm:block flex items-center justify-center text-white cursor-pointer`}
        onClick={handleOpen}
      >
        {isOpen? <Menu /> : <Close/>}
      </div>
      {/* Project Title */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Edu-Co</h1>
        <p className="text-sm text-gray-300">Amaliyot platformasi</p>
      </div>

      {/* Navigation */}
      <nav className="flex-grow">
        <ul className="space-y-4">
          <li>
            <a
              href="/dashboard"
              className="flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-700 transition-all"
            >
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h11M9 21H3M21 21h-6M21 10h-6"
                />
              </svg>
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/docs"
              className="flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-700 transition-all"
            >
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6h4m-2 2v8m-6 4h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2z"
                />
              </svg>
              Documents
            </a>
          </li>
          <li>
            <a
              href="/attendance"
              className="flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-700 transition-all"
            >
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
              Attendance
            </a>
          </li>
          <li>
            <a
              href="/settings"
              className="flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-700 transition-all"
            >
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 12v1m0 4h.01M4.22 4.22l1.42 1.42M1 12h1m16-7h1M12 1v1m7.07 4.93l-1.42-1.42M4.22 19.78l1.42-1.42M1 12h1m16-7h1M12 1v1"
                />
              </svg>
              Settings
            </a>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <footer className="mt-auto text-center text-sm text-gray-300">
        <p>&copy; {new Date().getFullYear()} Edu-Co</p>
      </footer>
    </div>
  );
};

export default LeftSidebar;
