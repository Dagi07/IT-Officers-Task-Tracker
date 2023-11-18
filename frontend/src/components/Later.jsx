import React, { useContext, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { TabsContext } from "../context/TabsContext";
import { OndutyContext } from "../context/OndutyContext";
import { useEffect } from "react";

const serverUrl = import.meta.env.VITE_API_serverUrl;

const Later = () => {
  const [aciveTab, setActiveTab] = useContext(TabsContext);
  const [onDutyGlobal] = useContext(OndutyContext);
  const [laterForm, setLaterForm] = useState({
    taskDetail: "",
    completionTime: dayjs(),
    taskAssignee: onDutyGlobal,
  });
  useEffect(() => {
    // Update the taskadd state when onDutyGlobal changes
    setLaterForm((prevTaskadd) => ({
      ...prevTaskadd,
      taskAssignee: onDutyGlobal,
    }));
  }, [onDutyGlobal]);

  const handleChange = (e) => {
    console.log(onDutyGlobal);
    setLaterForm({ ...laterForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(laterForm.completionTime.$d);
    const serverResponse = await fetch(`${serverUrl}/later`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(laterForm),
    });

    const result = await serverResponse.json();
    console.log("srv resp", result);
  };
  return (
    <div className="later_container">
      <br />
      <br />
      <br />
      <div className="later_container_inner">
        <div className="task__header">
          <h1 className="mt-4">Tasks to be done later today</h1>
          <ol className="breadcrumb mb-4 tabs">
            <Link onClick={() => setActiveTab(() => 1)} to="/">
              <li
                className={
                  aciveTab === 1
                    ? "breadcrumb-item active pb-2 task__sub-head tab"
                    : "breadcrumb-item active pb-2 task__sub-head"
                }
              >
                <h3 className="task__sub-head">
                  Tasks {dayjs().calendar().split(" at")[0]}
                </h3>
              </li>
            </Link>
            <Link onClick={() => setActiveTab(() => 2)} to="/later">
              <li
                className={
                  aciveTab === 2
                    ? "breadcrumb-item active pb-2 task__sub-head tab"
                    : "breadcrumb-item active pb-2 task__sub-head"
                }
              >
                <h3 className="task__sub-head">Tasks Later</h3>
              </li>
            </Link>
          </ol>
        </div>

        <form className="later_form" onSubmit={handleSubmit}>
          <textarea
            className="form-control"
            name="taskDetail"
            id="taskDetail"
            rows="2"
            placeholder="Task Detail"
            required
            value={laterForm.taskDetail}
            onChange={handleChange}
          ></textarea>
          <span>
            <p htmlFor="completionTime">Estimated task completion time:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                name="completionTime"
                id="completionTime"
                value={laterForm.completionTime}
                onChange={() => handleChange}
              />
            </LocalizationProvider>
          </span>
          <span>
            <label htmlFor="taskAssignee" className="form-label">
              Task assignee:
            </label>
            <select
              id="taskAssignee"
              onChange={handleChange}
              value={laterForm.taskAssignee}
              name="taskAssignee"
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
