import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Later = () => {
  return (
    <div>
      <br />
      <br />
      <br />
      <h1>Tasks to be done later today</h1>
      <form>
        <textarea
          name="task_detail"
          id="task_detail"
          cols="30"
          rows="10"
          placeholder="Task Detail"
        ></textarea>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker />
        </LocalizationProvider>
      </form>
    </div>
  );
};

export default Later;
