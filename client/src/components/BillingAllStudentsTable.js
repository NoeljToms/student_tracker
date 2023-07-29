import React from "react";

const BillingAllStudentsTable = (props) => {
  const students = props.students;
  const totalHours = props.totalHours;
  return (
    <div>
      {/* Header */}
      <table className="rounded-lg w-full text-left text-gray-500 border-collapse">
        <thead className="rounded-lg text-gray-700 uppercase bg-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Hours
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Amount
            </th>
          </tr>
        </thead>

        <tbody>
          {students &&
            students.map((student, index) => (
              <tr
                className={
                  index % 2 ? "bg-gray-300 border-b " : "bg-white border-b "
                }
              >
                <th className="px-6 py-4 font-medium text-gray-900">
                  {student.name} {student.family_name}
                </th>
                <td className="px-6 py-4 text-center">{totalHours(student)}</td>
                <td className="px-6 py-4 text-center">
                  ${student.fee * totalHours(student)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingAllStudentsTable;
