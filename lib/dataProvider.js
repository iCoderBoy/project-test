// context/DataContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
// Your firebase config

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [students, setStudents] = useState({});
  const [teachers,setTeachers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      const users = snapshot.docs.map(doc => doc.data());

      // Process students data (faculties, courses, and groups)
      const studentData = {};

      users.forEach(user => {
        const { department, course, group } = user;
        if (!studentData[department]) studentData[department] = {};
        if (!studentData[department][course]) studentData[department][course] = {};
        if (!studentData[department][course][group]) studentData[department][course][group] = [];

        studentData[department][course][group].push(user);
      });

      setStudents(studentData);
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={students}>
      {children}
    </DataContext.Provider>
  );
};
