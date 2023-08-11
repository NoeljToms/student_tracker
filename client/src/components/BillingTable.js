import React, { useState } from "react";
import { daysOfTheWeek, formatTime, months } from "../utils.js";

const BillingTable = (props) => {
  const student = props.student;
  const totalHours = props.totalHours;
  const billingMonth = props.month;

  const convertDate = (isoDate, timetable) => {
    const date = new Date(isoDate);
    return `${date.toLocaleDateString()} ${
      daysOfTheWeek[date.getDay()]
    } ${formatTime(timetable.start)} - ${formatTime(timetable.end)}`;
  };

  return (
    <div>
      {/* Header */}
      <table className="rounded-lg w-full text-left text-gray-500 border-collapse">
        <thead className="rounded-lg text-gray-700 uppercase bg-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Lesson
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Fee
            </th>
          </tr>
        </thead>

        <tbody>
          {student &&
            student.timetable.map((timetable) =>
              timetable.days_present.map((day_present) =>
                months[new Date(day_present.date).getMonth()] ===
                  billingMonth &&
                new Date(day_present.date).getFullYear() ===
                  new Date().getFullYear() ? (
                  <tr className={"bg-white border-b "}>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      {convertDate(day_present.date, timetable)}
                    </th>
                    <td className="px-6 py-4 text-center">
                      {day_present.notes}
                    </td>
                    <td className="px-6 py-4 text-center">
                      ${student.fee * timetable.hours}
                    </td>
                  </tr>
                ) : null
              )
            )}
        </tbody>
      </table>
      <p className=" font-semibold text-xl my-5">
        Total: ${totalHours(student) * student.fee}
      </p>
    </div>
  );
};

export default BillingTable;
