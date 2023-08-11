import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Students = () => {
  const [students, setStudents] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/students`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setStudents(json);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className=" mt-[120px] px-4">
      <div className="relative overflow-x-auto rounded-lg md:mx-[35px] md:my-10">
        {/* Header */}
        <table className="rounded-lg w-full text-left text-gray-500 border-collapse">
          <thead className="rounded-lg text-gray-700 uppercase bg-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Student name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Grade
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                More Info
              </th>
            </tr>
          </thead>
          <tbody>
            {students &&
              students.map((student, index) => {
                return (
                  <tr
                    className={
                      index % 2
                        ? "bg-gray-300 border-b shadow-lg"
                        : "bg-white border-b shadow-lg"
                    }
                    key={student._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {`${student.name} ${student.family_name}`}
                    </th>
                    <td className="px-6 py-4 text-center">{student.grade}</td>
                    <td className="px-6 py-4 text-center">
                      <Link to={`/students/${student._id}`}>
                        <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                          View
                        </p>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {/* Button */}
        <div className=" text-right py-4">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-md px-5 py-2.5 text-center justify-end"
          >
            <Link to="/newstudent">New Student</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Students;
