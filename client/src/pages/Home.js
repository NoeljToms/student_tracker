import React from "react";
import DatePicker from "react-date-picker";
import { useState, useEffect } from "react";
import StudentTable from "../components/StudentTable";
import { daysOfTheWeek, months } from "../utils.js";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [students, setStudents] = useState(null);

  useEffect(() => {
    const getTodayStudents = async () => {
      if (date) {
        const response = await fetch(
          `http://localhost:4000/api/students/filter/${
            daysOfTheWeek[date.getDay()]
          }`
        );
        const json = await response.json();

        if (response.ok) {
          setStudents(json);
        }
      }
    };

    getTodayStudents();
  }, [date]);

  return (
    <div className=" my-24">
      {/* Title */}
      <h1 className="text-center font-bold text-3xl">
        Welcome to the Home Page
      </h1>
      {/* Date Picker */}
      <div className="my-4 mt-8">
        <span className="font-semibold text-lg mx-4">Choose Date:</span>
        <DatePicker value={date} onChange={(newDate) => setDate(newDate)} />
      </div>
      <div className="my-4 mt-8">
        <p>
          <span className="font-semibold text-lg mx-4">Date:</span>
          {date &&
            daysOfTheWeek[date.getDay()] +
              ", " +
              date.getDate() +
              " " +
              months[date.getMonth()]}
        </p>
      </div>
      {/* Student Table */}
      {students && (
        <StudentTable
          students={students}
          setStudents={setStudents}
          date={date}
        />
      )}
    </div>
  );
};

export default Home;
