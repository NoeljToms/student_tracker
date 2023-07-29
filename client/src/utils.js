const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatTime = (time) => {
  const [hour, minute] = time.split(":");
  return `${
    hour < 12
      ? hour + ":" + minute + " am"
      : hour !== "12"
      ? hour - 12 + ":" + minute + " pm"
      : hour + ":" + minute + " pm"
  }`;
};

const formatDate = (day, startTime, endTime) => {
  return `${day}: ${formatTime(startTime)} - ${formatTime(endTime)}`;
};

const updateDaysPresent = async (timetable, student, students, date) => {
  let updatedTimetable = [];
  console.log(timetable);
  const updated_students = students.map((oldStudent) => {
    if (oldStudent._id === student._id) {
      //Manage days_present
      oldStudent.timetable.forEach((oldTimetable) => {
        if (oldTimetable._id === timetable._id) {
          const index = oldTimetable.days_present.findIndex(
            (day_present) => day_present.date === date.toISOString()
          );
          if (index !== -1) {
            oldTimetable.days_present.splice(index, 1);
          } else {
            oldTimetable.days_present.push({
              date: date.toISOString(),
              notes: null,
            });
          }
        }
        updatedTimetable.push(oldTimetable);
      });
      return {
        ...oldStudent,
        timetable: updatedTimetable,
      };
    }
    return oldStudent;
  });

  console.log(updated_students);

  const response = await fetch(
    `http://localhost:4000/api/students/${student._id}`,
    {
      method: "PATCH",
      body: JSON.stringify({ timetable: updatedTimetable }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = response.json();

  if (!response.ok) {
    console.log(json.error);
  } else {
    console.log("Created new student");
  }
  return updated_students;
};

const updateNotes = async (timetable, student, students, date, notes) => {
  let updatedTimetable = [];
  const updated_students = students.map((oldStudent) => {
    if (oldStudent._id === student._id) {
      oldStudent.timetable.forEach((oldTimetable) => {
        if (oldTimetable._id === timetable._id) {
          oldTimetable.days_present.forEach((day_present) => {
            if (day_present.date === date.toISOString()) {
              day_present.notes = notes;
            }
          });
        }
        updatedTimetable.push(oldTimetable);
      });
    }
    return oldStudent;
  });
  console.log(updatedTimetable, notes);
  console.log(updated_students);

  const response = await fetch(
    `http://localhost:4000/api/students/${student._id}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        timetable: updatedTimetable,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = response.json();

  if (!response.ok) {
    console.log(json.error);
  } else {
    console.log("Updated student notes");
  }
  return updated_students;
};

export {
  daysOfTheWeek,
  months,
  updateDaysPresent,
  updateNotes,
  formatDate,
  formatTime,
};
