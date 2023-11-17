import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";

const Later = () => {
  return (
    <div className="later_container">
      <br />
      <br />
      <br />
      <div className="later_container_inner">
        <div className="task__header">
          <h1 className="mt-4">Tasks to be done later today</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active pb-2 task__sub-head">
              <h3 className="task__sub-head">
                Tasks {dayjs().calendar().split(" at")[0]}
              </h3>
            </li>
          </ol>
        </div>

        <form className="later_form">
          <textarea
            className="form-control"
            name="task_detail"
            id="task_detail"
            rows="2"
            placeholder="Task Detail"
          ></textarea>
          <span>
            <p>Estimated task completion time:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker defaultValue={dayjs()} />
            </LocalizationProvider>
          </span>
          <span>
            <label htmlFor="done_by" className="form-label">
              Task assignee:
            </label>
            <select
              id="done_by"
              // onChange={handleChange}
              // value={taskadd.done_by}
              name="done_by"
              size="1"
              className="form-select"
            >
              <option value="Sirak">Sirak</option>
              <option value="Dagmawi">Dagmawi</option>
              <option value="Tsegaye">Tsegaye</option>
            </select>
          </span>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Later;
