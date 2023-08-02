import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatDate } from "../utils.js";
import { useAuthContext } from "../hooks/useAuthContext";

const StudentInfo = () => {
  const [student, setStudent] = useState(null);
  const { id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    console.log(id);
    const getStudent = async () => {
      const response = await fetch(`https://tutor-app-k5e2.onrender.com/api/students/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        setStudent(json);
      }
    };

    getStudent();
  }, [id]);

  return (
    <div className="mt-[120px] w-full h-full">
      <h1 className="text-center font-bold text-4xl">Student Info</h1>

      {student && (
        <div className="bg-white border rounded-lg shadow-lg px-6 py-3 m-4 mt-8">
          <ul className="flex flex-col mt-2 text-gray-700">
            <li className="border-b py-2">
              <span className="font-bold">Name:</span> {student.name}
            </li>
            <li className="border-y py-2">
              <span className="font-bold">Family Name:</span>{" "}
              {student.family_name}
            </li>
            <li className="border-y py-2">
              <span className="font-bold">Phone:</span> {student.phone}
            </li>
            <li className="border-y py-2">
              <span className="font-bold">E-mail:</span> {student.mail}
            </li>
            <li className="border-y py-2">
              <span className="font-bold">Grade:</span> {student.grade}
            </li>
            <li className="border-y py-2">
              <span className="font-bold">School:</span> {student.school}
            </li>
            <li className="border-y py-2">
              <span className="font-bold">Subjects:</span>{" "}
              {student.subjects.map((subject, index) =>
                !index ? `${subject}` : `, ${subject}`
              )}
            </li>
            <li className="border-y py-2">
              <span className="font-bold">Timetable:</span>{" "}
              {student.timetable.map((timetable, index) =>
                !index
                  ? `${formatDate(
                      timetable.day,
                      timetable.start,
                      timetable.end
                    )}`
                  : `, ${formatDate(
                      timetable.day,
                      timetable.start,
                      timetable.end
                    )}`
              )}
            </li>
            <li className="border-y py-2">
              <span className="font-bold">Fee:</span> ${student.fee}
            </li>
            <li className="border-t py-2">
              <span className="font-bold">Address:</span> {student.address}
            </li>
          </ul>
        </div>
      )}

      <h1 className="text-center font-bold text-4xl mt-6">Parent Info</h1>

      {student && (
        <div className="bg-white border rounded-lg shadow-lg px-6 py-3 m-4 mt-8 mb-20">
          <ul>
            <li className="border-b py-2">
              <span className="font-bold">Name:</span>{" "}
              {student.parent_details.father.name} (Father)
            </li>
            <li className="border-y py-2">
              <span className="font-bold">Phone:</span>{" "}
              {student.parent_details.father.phone}
            </li>
            <li className="border-y py-2">
              <span className="font-bold">E-mail:</span>{" "}
              {student.parent_details.father.mail}
            </li>
            <li className="border-y py-4"></li>
            <li className="border-y py-2">
              <span className="font-bold">Name:</span>{" "}
              {student.parent_details.mother.name} (Mother)
            </li>
            <li className="border-y py-2">
              <span className="font-bold">Phone:</span>{" "}
              {student.parent_details.mother.phone}
            </li>
            <li className="border-t py-2">
              <span className="font-bold">E-mail:</span>{" "}
              {student.parent_details.mother.mail}
            </li>
          </ul>
        </div>
      )}
      {/* Button */}
      {/* <div className=" text-right">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-md px-5 py-2.5 text-center justify-end"
        >
          {student && (
            <Link to={`/editstudent/${student._id}`}>Edit Student</Link>
          )}
        </button>
      </div> */}
    </div>
  );
};

export default StudentInfo;
