import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: String,
  family_name: String,
  phone: String,
  mail: String,
  grade: Number,
  school: String,
  subjects: [String],
  timetable: [
    {
      day: String,
      start: String,
      end: String,
      hours: Number,
      days_present: [
        {
          date: Date,
          notes: String,
        },
      ],
    },
  ],
  fee: Number,
  address: String,
  parent_details: {
    father: {
      name: String,
      phone: String,
      mail: String,
    },
    mother: {
      name: String,
      phone: String,
      mail: String,
    },
  },
});

export const Student = mongoose.model("students", StudentSchema);
