// calendarData.js

// Array of month names
export const months = [
    'January', 'February', 'March', 'April', 'May', 
    'June', 'July', 'August', 'September', 'October', 
    'November', 'December'
  ];
  
  // Array of day names
  export const daysOfWeek = [
    'Su', 'Mo', 'Tu', 'We', 'Th', 
    'Fr', 'Sa'
  ];
  
  // Get the number of days in a specific month of a year
  export const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get the starting day of the week for a specific month and year
  export const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
  };
  
  // Get the current year
  export const currentYear = new Date().getFullYear();
  
  // Get the current month (0 - 11, where 0 = January, 11 = December)
  export const currentMonth = new Date().getMonth();
  
  // Get today's date
  export const today = new Date().getDate();
  