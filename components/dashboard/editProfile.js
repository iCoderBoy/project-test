import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";

const EditProfileModal = ({ isOpen, onClose, user }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    department: "",
    group: "",
    course: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", user.userId), formData);
    } catch (error) {
      toast.error(error.message);
    }

    onClose(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Edit Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ism:
            </label>
            <input
              type="text"
              name="firstName"
              placeholder={user.firstName}
              onChange={handleChange}
              className="mt-1 block w-full p-[10px] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ism:
            </label>
            <input
              type="text"
              name="lastName"
              placeholder={user.lastName}
              onChange={handleChange}
              className="mt-1 block w-full p-[10px] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex">
            <span className="inline-flex p-[10px] items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 rounded-l-md">
              +998
            </span>
            <input
              type="tel"
              name="phone"
              placeholder={user.phone}
              onChange={handleChange}
              required
              className="p-[10px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bo'lim:
            </label>
            <input
              type="text"
              name="department"
              placeholder={user.department}
              onChange={handleChange}
              className="mt-1 block p-[10px] w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Guruh:
            </label>
            <input
              type="text"
              name="group"
              placeholder={user.group}
              onChange={handleChange}
              className="mt-1 block w-full p-[10px] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bosqich:
            </label>
            <input
              type="text"
              name="course"
              placeholder={user.course}
              onChange={handleChange}
              className="mt-1 block w-full p-[10px] border-2 border-[#333] rounded-md shadow-sm focus:ring-blue-500 focus:border-2 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
