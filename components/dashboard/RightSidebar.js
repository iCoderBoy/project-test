import { Person, Close, Logout } from "@mui/icons-material";
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import EditProfileModal from "./editProfile";

const RightSidebar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`w-full min-h-screen lg:w-1/4 bg-gradient-to-b from-gray-800 to-gray-600 p-6 border-gray-200 fixed top-0 transition-all duration-300 ${
        isOpen ? "z-[101] left-0" : " left-[100%]"
      }`}
    >
      <EditProfileModal user={user} isOpen={editProfileModalOpen} onClose={setEditProfileModalOpen}/>
      <div
        className="w-[50px] h-[50px] bg-blue-600 absolute top-[10px] left-[-50px] md:hidden sm:block rounded-tl-lg rounded-bl-lg flex items-center justify-center text-white cursor-pointer"
        onClick={handleOpen}
      >
        <Person />
      </div>
      <div
        className="w-[50px] h-[50px] bg-blue-600 absolute right-[20px] md:hidden sm:block rounded-lg flex items-center justify-center text-white cursor-pointer"
        onClick={handleOpen}
      >
        <Close />
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Info</h2>
      {user ? (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <img
                src={user.image || "https://via.placeholder.com/150"}
                alt="User"
                className="w-full h-full rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Telefon: +998</strong> {user.phone || "N/A"}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Bo'lim:</strong> {user.department || "N/A"}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Guruh:</strong> {user.group || "N/A"}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Bosqich:</strong> {user.course || "N/A"}
            </p>
          </div>
          <button onClick={()=>setEditProfileModalOpen(true)} className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
            Edit Profile
          </button>
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center gap-[5px] bg-[crimson]"
            onClick={() => signOut(auth)}
          >
            <Logout />
            LogOut
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Ma’lumot yuklanmadi...</p>
      )}
    </div>
  );
};

export default RightSidebar;
