import { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";

// --- DATA: Map dates to Tailwind CSS background color classes ---
const dateColors = {
  "2025-09-02": "bg-green-100",
  "2025-09-03": "bg-purple-100",
  "2025-09-04": "bg-blue-100",
  "2025-09-05": "bg-blue-100",
  "2025-09-06": "bg-purple-100",
  "2025-09-07": "bg-green-100",
  // You can even add text color or font weight!
  "2025-09-08": "bg-blue-200 font-bold",
};

export const Calender = () => {
  const [date, setDate] = useState(new Date());

  // --- LOGIC: The function to apply classes to tiles ---
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      // Return the Tailwind class if the date is in our map
      return dateColors[dateString];
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={tileClassName} // Prop remains the same
        next2Label={null} // <-- ADD THIS LINE to hide the "next year" button
        prev2Label={null} // <-- ADD THIS LINE to hide the "previous year" button
      />
    </div>
  );
};

export default Calender;
