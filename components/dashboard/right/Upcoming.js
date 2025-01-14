import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/server/firebase";

const UpcomingActivities = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const eventsRef = ref(database, "events");

    // Listen for value changes in the database
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const eventsArray = [];
        Object.keys(data).forEach((dateKey) => {
          const eventsForDate = data[dateKey];
          Object.keys(eventsForDate).forEach((eventKey) => {
            eventsArray.push({
              date: dateKey,
              ...eventsForDate[eventKey],
            });
          });
        });
        setUpcomingEvents(eventsArray);
      } else {
        setUpcomingEvents([]);
      }
    });
  }, []);

  return (
    <div className="flex flex-col w-full h-[50%] items-start justify-start overflow-y-auto overflow-x-hidden">
      {upcomingEvents.length ? (
        upcomingEvents.map((eventData, index) => (
          <div
            key={index}
            className="flex w-4/5 min-w-[300px] min-h-[100px] items-center justify-start p-4 bg-blue-100 rounded-xl mb-4"
          >
            <div className="w-12 h-12 rounded-full bg-orange-500 mr-4"></div>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-gray-800">{eventData.name}</h3>
              <div className="flex items-center text-sm text-gray-600">
                <p>{eventData.date}</p>
                <div className="w-2 h-2 bg-blue-500 rounded-full mx-2"></div>
                <p>{eventData.time}</p>
              </div>
              <p className="text-sm text-gray-600">{eventData.address}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No upcoming activities.</p>
      )}
    </div>
  );
};

export default UpcomingActivities;
