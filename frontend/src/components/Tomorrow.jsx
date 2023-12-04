import React, { useContext, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";
import { Link, useLocation, useParams } from "react-router-dom";
import { TabsContext } from "../context/TabsContext";
import { OndutyContext } from "../context/OndutyContext";
import { useEffect } from "react";

const serverUrl = import.meta.env.VITE_API_serverUrl;

const Tomorrow = () => {
  const url = useLocation();
  const [aciveTab, setActiveTab] = useContext(TabsContext);
  const [onDutyGlobal] = useContext(OndutyContext);
  // const [timeValue, setTimeValue] = useState(null)
  const [tomorrowForm, setTomorrowForm] = useState({
    taskDetail: "",
    completionTime: dayjs(),
    taskAssignee: onDutyGlobal,
  });
  const [tomorrowList, setTomorrowList] = useState([]);
  const [markCompleteAdd, setMarkCompleteAdd] = useState({
    task_detail: "",
    task_completed: 1,
    done_by: "",
  });

  useEffect(() => {
    // Update the taskadd state when onDutyGlobal changes
    setTomorrowForm((prevTaskadd) => ({
      ...prevTaskadd,
      taskAssignee: onDutyGlobal,
    }));
  }, [onDutyGlobal]);

  const handleChange = (e) => {
    setTomorrowForm({ ...tomorrowForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    tomorrowForm.completionTime = dayjs(tomorrowForm.completionTime.$d);
    console.log(tomorrowForm);
    const serverResponse = await fetch(`${serverUrl}/tomorrow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tomorrowForm),
    });

    const result = await serverResponse.json();
    console.log("srv post resp", result);

    if (serverResponse.ok) {
      // Append the newly added task to the existing list
      setTomorrowList(result);
      setTomorrowForm(() => ({
        taskDetail: "",
        completionTime: dayjs(),
        taskAssignee: onDutyGlobal,
      }));
    }
  };

  useEffect(() => {
    url.pathname === "/tomorrow"
      ? setActiveTab(() => 3)
      : setActiveTab(() => 1);
    const getTmrwTasks = async () => {
      const serverResponse = await fetch(`${serverUrl}/tomorrow`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await serverResponse.json();
      setTomorrowList(() => result);
    };
    getTmrwTasks();
  }, []);

  // console.log(markCompleteAdd);
  return (
    <div className="later_container">
      <br />
      <br />
      <br />
      <div className="later_container_inner">
        <div className="task__header">
          <h1 className="mt-4">Tasks to do tomorrow</h1>
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
                <h3 className="task__sub-head">
                  Tasks Later<sup>11</sup>
                </h3>
              </li>
            </Link>
            <Link onClick={() => setActiveTab(() => 3)} to="/tomorrow">
              <li
                className={
                  aciveTab === 3
                    ? "breadcrumb-item active pb-2 task__sub-head tab"
                    : "breadcrumb-item active pb-2 task__sub-head"
                }
              >
                <h3 className="task__sub-head">
                  Tasks Tomorrow<sup>11</sup>
                </h3>
              </li>
            </Link>
          </ol>
        </div>

        {/* ### Add Task Later Form ### */}
        <form className="later_form" onSubmit={handleSubmit}>
          <span className="textarea">
            <textarea
              className="form-control"
              name="taskDetail"
              id="taskDetail"
              rows="2"
              placeholder="Task Detail"
              required
              value={tomorrowForm.taskDetail}
              onChange={handleChange}
            ></textarea>
          </span>
          <span className="lf_rightSec">
            <span className="lf_completionTime">
              <label htmlFor="completionTime">
                Estimated task completion time:
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                  name="completionTime"
                  id="completionTime"
                  value={tomorrowForm.completionTime}
                  defaultValue={dayjs().format("hh:mm a")}
                  // minTime={dayjs()}
                  onChange={(newTimeValue) =>
                    setTomorrowForm({
                      ...tomorrowForm,
                      completionTime: newTimeValue,
                    })
                  }
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
                value={tomorrowForm.taskAssignee}
                name="taskAssignee"
                size="1"
                className="form-select"
              >
                <option value="Sirak">Sirak</option>
                <option value="Dagmawi">Dagmawi</option>
                <option value="Tsegaye">Tsegaye</option>
              </select>
            </span>
            <span>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </span>
          </span>
        </form>

        {/* ###  Task Later List ### */}
        <ol className="later_list">
          {tomorrowList &&
            tomorrowList.map((eachTomorrow) => (
              <li className="eachTomorrow" key={eachTomorrow.tomorrow_id}>
                <div className="ll_container">
                  <span className="ll_leftSec">
                    {eachTomorrow.tomorrow_detail}
                  </span>
                  <span className="ll_rightSec">
                    <span className="ll_time">
                      {" "}
                      {dayjs(eachTomorrow.completion_time).format("hh:mm a")}
                    </span>
                    <span className="assignee">
                      {eachTomorrow.task_assignee}
                    </span>
                    {/* buttons */}
                  </span>
                </div>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Tomorrow;
