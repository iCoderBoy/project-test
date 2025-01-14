import React, { useState, useEffect } from "react";
import {
  months,
  daysOfWeek,
  getDaysInMonth,
  getFirstDayOfMonth,
  currentYear,
  currentMonth,
} from "./calendarData";
import { database } from "@/server/firebase";
import { ref, onValue, push, set } from "firebase/database";
import { CancelSharp, Save } from "@mui/icons-material";

const Calendar = () => {
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
    time: "",
    address: "",
  });
  const [busyDays, setBusyDays] = useState({});

  const daysInMonth = getDaysInMonth(month, year);
  const firstDayOfWeek = getFirstDayOfMonth(month, year);

  useEffect(() => {
    const eventsRef = ref(database, "events");

    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const busyDates = {};
        Object.keys(data).forEach((date) => {
          busyDates[date] = true;
        });
        setBusyDays(busyDates);
      } else {
        setBusyDays({});
      }
    });
  }, [month, year]);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const openModal = (day) => {
    setSelectedDate(`${year}-${month + 1}-${day}`);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEventData({ name: "", time: "", address: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    const eventsRef = ref(database, `events/${selectedDate}`);
    const newEventRef = push(eventsRef); // Yangi kalit yaratadi
    set(newEventRef, eventData)
      .then(() => {
        closeModal();
      })
      .catch((error) => {
        console.error("Error saving event: ", error);
      });
  };
  

  const renderDays = () => {
    const calendarCells = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarCells.push(<div key={`empty-${i}`} className="w-1/7 h-12"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const formattedDate = `${year}-${month + 1}-${day}`;
      const isBusy = busyDays[formattedDate];

      calendarCells.push(
        <div
          key={day}
          className={`w-1/7 h-12 flex items-center justify-center cursor-pointer rounded-full ${
            isBusy
              ? "bg-orange-500 text-white"
              : "text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => openModal(day)}
        >
          {day}
        </div>
      );
    }
    return calendarCells;
  };

  return (
    <div className="flex flex-col items-center w-full mb-2.5 bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between w-full mb-4">
        <button
          className="w-8 h-8 rounded-full bg-blue-500 text-white"
          onClick={prevMonth}
        >
          &lt;
        </button>
        <h2 className="text-lg font-bold text-blue-500">{`${months[month]} ${year}`}</h2>
        <button
          className="w-8 h-8 rounded-full bg-blue-500 text-white"
          onClick={nextMonth}
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 w-full mb-2 text-center text-blue-500 font-semibold">
        {daysOfWeek.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 w-full">{renderDays()}</div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80 space-y-4">
            <h3 className="text-blue-500 font-bold">Add Event</h3>
            <label className="block">
              <span className="text-gray-700">Event Name:</span>
              <input
                type="text"
                name="name"
                value={eventData.name}
                onChange={handleInputChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Time:</span>
              <input
                type="time"
                name="time"
                value={eventData.time}
                onChange={handleInputChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Address:</span>
              <input
                type="text"
                name="address"
                value={eventData.address}
                onChange={handleInputChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <div className="flex justify-between">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
              >
                <Save className="mr-1" /> Save
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
              >
                <CancelSharp className="mr-1" /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
