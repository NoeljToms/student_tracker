import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NotesPopup from "./NotesPopup";
// import 'reactjs-popup/dist/index.css';

const StudentTable = (props) => {
  const students = props.students;
  const date = props.date;
  date.setHours(0, 0, 0, 0);
  const updateDaysPresent = props.updateDaysPresent;
  const daysOfTheWeek = props.daysOfTheWeek;
  const notes = props.notes;
  const setNotes = props.setNotes;
  const setStudents = props.setStudents;
  const updateNotes = props.updateNotes;

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
              students.map((student, index) => (
                <tr
                  className={
                    index % 2 ? "bg-gray-300 border-b " : "bg-white border-b "
                  }
                  key={student._id}
                >
                  <th className="px-6 py-4 font-medium text-gray-900">{`${student.name} ${student.family_name}`}</th>
                  <td className="px-6 py-4 text-center">
                    {student.timetable.map((curr_timetable) =>
                      curr_timetable.day !== daysOfTheWeek[date.getDay()]
                        ? null
                        : `${curr_timetable.day} ${curr_timetable.start} - ${curr_timetable.end}`
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
                    {student.timetable.filter(
                      (timetable) =>
                        timetable.days_present.filter(
                          (day_present) =>
                            day_present.date === date.toISOString()
                        ).length > 0
                    ).length > 0 ? (
                      <NotesPopup
                        student={student}
                        students={students}
                        date={date}
                        notes={notes}
                        setNotes={setNotes}
                        setStudents={setStudents}
                        updateNotes={updateNotes}
                      />
                    ) : (
                      <p title="Student must be present first">Notes</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      onClick={() => updateDaysPresent(student, students, date)}
                      id="default-checkbox"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                      checked={
                        student.timetable.filter(
                          (timetable) =>
                            timetable.days_present.filter(
                              (day_present) =>
                                day_present.date === date.toISOString()
                            ).length > 0
                        ).length > 0
                      }
                    ></input>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
