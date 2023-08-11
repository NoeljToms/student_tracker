import React, { useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import BillingTable from "../components/BillingTable";
import BillingAllStudentsTable from "../components/BillingAllStudentsTable";
import { useAuthContext } from "../hooks/useAuthContext";
import { months } from "../utils.js";

const Billing = () => {
  const [studentName, setStudentName] = useState(null);
  const [student, setStudent] = useState(null);
  const [allStudents, setAllStudents] = useState(null);
  const [option, setOption] = useState(false);
  const [billingMonth, setbillingMonth] = useState(
    months[new Date().getMonth()]
  );
  const { user } = useAuthContext();

  useEffect(() => {
    async function getAllStudents() {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/students`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setAllStudents([{ name: "All", family_name: "Students" }, ...json]);
      }
    }

    getAllStudents();
  }, []);

  const generateBill = () => {
    //All students
    if (studentName === "All Students") {
      setOption(true);
      setStudent(allStudents[0]);
    } else {
      setOption(false);
      setStudent(
        allStudents.filter(
          (curr_student) =>
            `${curr_student.name} ${curr_student.family_name}` === studentName
        )[0]
      );
    }
  };

  const totalHours = (student) => {
    let hours = 0;
    student.timetable.forEach((timetable) => {
      timetable.days_present.forEach((day_present) => {
        if (months[new Date(day_present.date).getMonth()] === billingMonth) {
          console.log(months[new Date(day_present.date).getMonth()]);
          hours += timetable.hours;
        }
      });
    });
    return hours;
  };

  return (
    <div className="mt-[120px] h-full mx-2 md:mx-7">
      <h1 className="text-center font-bold text-4xl">Generate Billing</h1>
      {/* Students */}
      {allStudents && (
        <div className="my-6 lg:px-[38%] ">
          <Select
            variant="standard"
            label="Choose a Student"
            value={studentName}
            onChange={(value) => setStudentName(value)}
          >
            {allStudents.map((curr_student) => (
              <Option
                key={curr_student._id}
                value={`${curr_student.name} ${curr_student.family_name}`}
              >
                {curr_student.name} {curr_student.family_name}
              </Option>
            ))}
          </Select>
        </div>
      )}

      {student && (
        <div className="my-3 lg:px-[38%]">
          <Select
            value={billingMonth}
            variant="standard"
            label="Select Month"
            onChange={(value) => setbillingMonth(value)}
          >
            {months.map((month) => (
              <Option value={month}>{month}</Option>
            ))}
          </Select>
        </div>
      )}

      {studentName && (
        <div className=" text-center my-5">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-md px-5 py-2.5 text-center justify-end"
            onClick={() => generateBill()}
          >
            Generate
          </button>
        </div>
      )}

      <div className="lg:px-20">
        {student &&
          (option ? (
            <BillingAllStudentsTable
              students={allStudents.filter(
                (student) =>
                  `${student.name} ${student.family_name}` !== "All Students"
              )}
              totalHours={totalHours}
              month={billingMonth}
            />
          ) : (
            <BillingTable
              student={student}
              totalHours={totalHours}
              month={billingMonth}
            />
          ))}
      </div>
    </div>
  );
};

export default Billing;
