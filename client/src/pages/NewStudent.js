import React, { useEffect } from "react";
import {
  Select,
  Option,
  Input,
  Checkbox,
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import TimePicker from "react-time-picker";
import { useState } from "react";
import { formatDate } from "../utils.js";
import { useNavigate } from "react-router-dom";

import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const NewStudent = () => {
  const [day, setDay] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timetables, setTimetables] = useState([]);
  const [isValid, setValid] = useState(false);
  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [studentPhone, setStudentPhone] = useState(null);
  const [studentEmail, setStudentEmail] = useState(null);
  const [school, setSchool] = useState(null);
  const [fee, setFee] = useState(null);
  const [address, setAddress] = useState(null);
  const [grade, setGrade] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [father, setFather] = useState(null);
  const [fatherPhone, setFatherPhone] = useState(null);
  const [fatherEmail, setFatherEmail] = useState(null);
  const [mother, setMother] = useState(null);
  const [motherPhone, setMotherPhone] = useState(null);
  const [motherEmail, setMotherEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (startTime !== null && endTime !== null && day !== null) {
      if (!isValid) {
        setValid(true);
      }
    } else {
      setValid(false);
    }
  }, [startTime, endTime, day]);

  const addTimetable = (newTimetable) => {
    //Calculate hours
    const start = new Date(`2023-07-22T${newTimetable.start}:00`);
    const end = new Date(`2023-07-22T${newTimetable.end}:00`);
    const totalMilliseconds = end - start;
    const totalHours = totalMilliseconds / (1000 * 60 * 60);

    setTimetables((prevTimetables) => [
      ...prevTimetables,
      { ...newTimetable, hours: totalHours.toFixed(2), days_present: [] },
    ]);
    // const hours = Math.floor(totalHours);
    // const minutes = Math.round((totalHours - hours) * 60);
    //Reset values
    setValid(false);
    setDay(null);
    setStartTime(null);
    setEndTime(null);
  };

  const handleSubmit = async (e) => {
    const father_details = {
      name: father,
      phone: fatherPhone,
      mail: fatherEmail,
    };
    const mother_details = {
      name: mother,
      phone: motherPhone,
      mail: motherEmail,
    };
    const parent_details = { father: father_details, mother: mother_details };
    const days_present = [];
    const student = {
      name: fname,
      family_name: lname,
      phone: studentPhone,
      mail: studentEmail,
      grade: grade,
      school: school,
      subjects: subjects,
      timetable: timetables,
      fee: fee,
      days_present: days_present,
      address: address,
      parent_details: parent_details,
    };

    setIsLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API}/api/students`, {
      method: "POST",
      body: JSON.stringify(student),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    } else {
      console.log("Created new student");
      setIsLoading(false);
      navigate("/students");
    }
  };

  const deleteTimetable = (timetable) => {
    setTimetables((prevTimetables) =>
      prevTimetables.filter((prevTimetable) => prevTimetable !== timetable)
    );
  };

  const handleCheckboxChange = (subject) => {
    if (subjects.includes(subject)) {
      setSubjects((prevSubjects) =>
        prevSubjects.filter((prevSubject) => prevSubject !== subject)
      );
    } else {
      setSubjects((prevSubjects) => [...prevSubjects, subject]);
    }
  };

  return (
    <div className="flex flex-col w-full mt-[120px] px-4">
      <form>
        <h1 className="text-center font-bold text-3xl"> Student Info </h1>
        {/* Personal Info */}
        <div className="my-3">
          <Input
            value={fname}
            variant="standard"
            label="First Name"
            onChange={(e) => {
              setFname(e.target.value);
            }}
            required
          ></Input>
        </div>
        <div className="my-3">
          <Input
            value={lname}
            variant="standard"
            label="Last Name"
            onChange={(e) => {
              setLname(e.target.value);
            }}
            required
          ></Input>
        </div>
        <div className="my-3">
          <Input
            value={studentPhone}
            type="number"
            variant="standard"
            label="Phone Number"
            onChange={(e) => {
              setStudentPhone(e.target.value);
            }}
            required
          ></Input>
        </div>
        <div className="my-3">
          <Input
            value={studentEmail}
            variant="standard"
            label="E-mail"
            onChange={(e) => {
              setStudentEmail(e.target.value);
            }}
            required
          ></Input>
        </div>
        <div className="my-3">
          <Input
            value={address}
            variant="standard"
            label="Address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required
          ></Input>
        </div>
        <div className="my-3">
          <Input
            value={school}
            variant="standard"
            label="High School"
            onChange={(e) => {
              setSchool(e.target.value);
            }}
          ></Input>
        </div>
        <div className="my-3">
          <Input
            value={fee}
            type="number"
            variant="standard"
            label="Fee"
            onChange={(e) => {
              setFee(e.target.value);
            }}
          ></Input>
          <Typography
            variant="small"
            color="gray"
            className="flex items-center gap-1 font-normal mt-2"
          >
            <span className=" font-semibold">Math:</span> 8,9,10 ($12.50/hr), 11
            & 12 ($15/hr) <span className=" font-semibold">Physics:</span> 11,12
            ($15/hr)
          </Typography>
        </div>

        {/* Grade */}
        <div className="my-3">
          <Select
            value={grade}
            variant="standard"
            label="Select Grade"
            onChange={(value) => setGrade(value)}
          >
            <Option value="8">8</Option>
            <Option value="9">9</Option>
            <Option value="10">10</Option>
            <Option value="11">11</Option>
            <Option value="12">12</Option>
          </Select>
        </div>

        {/* Subjects */}
        <div className="flex flex-row justify-center">
          <Checkbox
            label="Mathematics"
            onChange={() => handleCheckboxChange("Mathematics")}
          />
          <Checkbox
            label="Physics"
            onChange={() => handleCheckboxChange("Physics")}
          />
        </div>

        <h1 className="text-center font-bold text-3xl mt-5"> TimeTable </h1>

        {/* TimeTable */}
        <div className="my-3">
          <Select
            value={day}
            variant="standard"
            label="Select Day"
            onChange={(value) => setDay(value)}
          >
            <Option value="Sunday">Sunday</Option>
            <Option value="Monday">Monday</Option>
            <Option value="Tuesday">Tuesday</Option>
            <Option value="Wednesday">Wednesday</Option>
            <Option value="Thursday">Thursday</Option>
            <Option value="Friday">Friday</Option>
            <Option value="Saturday">Saturday</Option>
          </Select>
        </div>
        <div className="flex flex-row justify-center w-full my-3">
          <div className="flex flex-col w-full">
            <p className="">Start Time</p>
            <TimePicker
              onChange={setStartTime}
              value={startTime}
              className={"rounded-lg"}
            />
          </div>

          <div className="flex flex-col w-full">
            <p className="">End Time</p>
            <TimePicker onChange={setEndTime} value={endTime} />
          </div>
        </div>

        <p
          onClick={() => {
            isValid &&
              addTimetable({ day: day, start: startTime, end: endTime });
          }}
          className={`${
            isValid
              ? "bg-green-600 hover:bg-green-700 cursor-pointer"
              : "bg-gray-700"
          } text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
        >
          Add to Timetable
        </p>

        <div className="w-full my-4">
          <Card>
            {timetables.length > 0 && (
              <List className="bg-[#e5e7eb90] shadow-lg rounded-lg">
                {timetables.map((timetable) => (
                  <ListItem ripple={false} className="py-1 pr-1 pl-4">
                    {formatDate(timetable.day, timetable.start, timetable.end)}
                    <ListItemSuffix>
                      <IconButton variant="text" color="blue-gray">
                        <TrashIcon
                          className="h-5 w-5"
                          onClick={() => deleteTimetable(timetable)}
                        />
                      </IconButton>
                    </ListItemSuffix>
                  </ListItem>
                ))}
              </List>
            )}
          </Card>
        </div>

        {/* Parent Info */}

        <h1 className="text-center font-bold text-3xl">Parent Info </h1>

        <div>
          <div className="my-3">
            <Input
              value={father}
              onChange={(e) => setFather(e.target.value)}
              variant="standard"
              label="Father Full Name"
              required
            ></Input>
          </div>
          <div className="my-3">
            <Input
              value={fatherPhone}
              onChange={(e) => setFatherPhone(e.target.value)}
              type="number"
              variant="standard"
              label="Phone Number"
              required
            ></Input>
          </div>
          <div className="my-3">
            <Input
              value={fatherEmail}
              onChange={(e) => setFatherEmail(e.target.value)}
              variant="standard"
              label="E-mail"
              required
            ></Input>
          </div>
          <div className="my-3">
            <Input
              value={mother}
              onChange={(e) => setMother(e.target.value)}
              variant="standard"
              label="Mother Full Name"
              required
            ></Input>
          </div>
          <div className="my-3">
            <Input
              value={motherPhone}
              onChange={(e) => setMotherPhone(e.target.value)}
              variant="standard"
              label="Phone Number"
              required
            ></Input>
          </div>
          <div className="my-3">
            <Input
              value={motherEmail}
              onChange={(e) => setMotherEmail(e.target.value)}
              variant="standard"
              label="E-mail"
              required
            ></Input>
          </div>
        </div>

        <button
          onClick={() => handleSubmit()}
          type="submit"
          disabled={isLoading}
          className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewStudent;
