import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { daysOfTheWeek, updateDaysPresent, formatDate } from "../utils.js";

import NotesPopup from "./NotesPopup";
// import 'reactjs-popup/dist/index.css';

const StudentTable = (props) => {
  const students = props.students;
  const date = props.date;
  const user = props.user;
  if (date !== null) date.setHours(0, 0, 0, 0);
  const setStudents = props.setStudents;

  return (
    <div>
      {/* Students Table */}
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-left text-gray-500">
          <thead className="text-gray-700 uppercase bg-gray-400">
            <tr>
              <th className="px-6 py-3">Student Name</th>
              <th className="px-6 py-3 text-center">Time</th>
              <th className="px-6 py-3 text-center">Grade</th>
              <th className="px-6 py-3 text-center">More Info</th>
              <th className="px-6 py-3 text-center">Notes</th>
              <th className="px-6 py-3 text-center">Present</th>
            </tr>
          </thead>
          <tbody>
            {students &&
              date &&
              students.map((student) =>
                student.timetable.map((timetable, index) =>
                  timetable.day === daysOfTheWeek[date.getDay()] ? (
                    <tr
                      className={
                        index % 2
                          ? "bg-gray-300 border-b "
                          : "bg-white border-b "
                      }
                    >
                      <th className="px-6 py-4 font-medium text-gray-900">{`${student.name} ${student.family_name}`}</th>
                      <td className="px-6 py-4 text-center">
                        {formatDate(
                          timetable.day,
                          timetable.start,
                          timetable.end
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">{student.grade}</td>
                      <td className="px-6 py-4 text-center">
                        <Link to={`/students/${student._id}`}>
                          <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                            View
                          </p>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {timetable.days_present.filter(
                          (day_present) =>
                            day_present.date === date.toISOString()
                        ).length > 0 ? (
                          <NotesPopup
                            student={student}
                            students={students}
                            date={date}
                            setStudents={setStudents}
                            timetable={timetable}
                            user={user}
                          />
                        ) : (
                          <p title="Student must be present first">Notes</p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          onClick={async () =>
                            setStudents(
                              await updateDaysPresent(
                                timetable,
                                student,
                                students,
                                date,
                                user
                              )
                            )
                          }
                          id="default-checkbox"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                          checked={
                            timetable.days_present.filter(
                              (day_present) =>
                                day_present.date === date.toISOString()
                            ).length > 0
                          }
                        ></input>
                      </td>
                    </tr>
                  ) : null
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
