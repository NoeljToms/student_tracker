import React, { useState } from "react";
import Popup from "reactjs-popup";
import { updateNotes } from "../utils.js";

const NotesPopup = (props) => {
  const student = props.student;
  const students = props.students;
  const date = props.date;
  const setStudents = props.setStudents;
  const timetable = props.timetable;
  const [notes, setNotes] = useState(null);
  return (
    <Popup
      onOpen={() =>
        setNotes(
          timetable.days_present.filter(
            (day_present) => day_present.date === date.toISOString()
          )[0].notes
        )
      }
      trigger={
        <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
          Notes
        </p>
      }
      modal
      nested
    >
      {(close) => (
        <div className="overlay fixed top-0 left-0 w-screen h-screen bg-[#000000a7] flex items-center justify-center">
          <div className="bg-[#e5e7eb] p-8 rounded-lg text-center">
            <textarea
              className="w-full h-40 p-2 mb-4"
              placeholder="Enter your text here..."
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            ></textarea>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={async () => {
                setStudents(
                  await updateNotes(timetable, student, students, date, notes)
                );
                close();
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default NotesPopup;
