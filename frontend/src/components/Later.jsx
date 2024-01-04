import React, { useEffect, useContext, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";
import { Link, useLocation, useParams } from "react-router-dom";
import { TabsContext } from "../context/TabsContext";
import { OndutyContext } from "../context/OndutyContext";
import { AlertContext } from "../context/AlertContext";
import { ItOfficersContext } from "../context/ItOfficersContext";
import EditTaskII from "./EditTaskII";

const serverUrl = import.meta.env.VITE_API_serverUrl;

const Later = () => {
  const url = useLocation();
  const [aciveTab, setActiveTab] = useContext(TabsContext);
  const [itGuysList] = useContext(ItOfficersContext);
  const [onDutyGlobal] = useContext(OndutyContext);
  const [alertTaskLength, setAlertTaskLength] = useContext(AlertContext);
  const [showEditII, setShowEditII] = useState(false);

  // const [timeValue, setTimeValue] = useState(null)
  const [laterForm, setLaterForm] = useState({
    taskDetail: "",
    completionTime: dayjs(),
    taskAssignee: onDutyGlobal,
  });
  const [laterList, setLaterList] = useState([]);
  const [markCompleteAdd, setMarkCompleteAdd] = useState({
    task_detail: "",
    task_completed: 1,
    done_by: "",
  });

  useEffect(() => {
    // Update the taskadd state when onDutyGlobal changes
    setLaterForm((prevTaskadd) => ({
      ...prevTaskadd,
      taskAssignee: onDutyGlobal,
    }));
  }, [onDutyGlobal]);

  const getAlertAmount = async () => {
    const serverResponse = await fetch(`${serverUrl}/later/amount`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const result = await serverResponse.json();

    setAlertTaskLength(() => ({ ...alertTaskLength, later: result }));
  };

  const handleChange = (e) => {
    setLaterForm({ ...laterForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    laterForm.completionTime = dayjs(laterForm.completionTime.$d);
    // console.log(laterForm);
    const serverResponse = await fetch(`${serverUrl}/later`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(laterForm),
    });

    const result = await serverResponse.json();
    // console.log("srv post resp", result);

    if (serverResponse.ok) {
      // Append the newly added task to the existing list
      setLaterList(result);
      setLaterForm(() => ({
        taskDetail: "",
        completionTime: dayjs(),
        taskAssignee: onDutyGlobal,
      }));
      getAlertAmount();
    }
  };

  useEffect(() => {
    url.pathname === "/later" ? setActiveTab(() => 2) : setActiveTab(() => 1);
    const getTasks = async () => {
      const serverResponse = await fetch(`${serverUrl}/later`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await serverResponse.json();
      setLaterList(() => result);
    };
    getTasks();

    getAlertAmount();
  }, []);

  // console.log("aletr amount", alertTaskLength.later);

  const handleClick = async (eachLater) => {
    const updatedMarkCompleteAdd = {
      ...markCompleteAdd,
      task_detail: eachLater.later_detail,
      task_completed: 1,
      done_by: eachLater.task_assignee,
    };

    try {
      const serverResponse = await fetch(`${serverUrl}/task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMarkCompleteAdd),
      });
      const result = await serverResponse.json();
      console.log("srv resp", result);

      // After the fetch is successful, update the state
      setMarkCompleteAdd(updatedMarkCompleteAdd);

      if (serverResponse.ok) {
        try {
          const deleteResponse = await fetch(
            `${serverUrl}/later/${eachLater.later_id}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
          );
          const result = await deleteResponse.json();
          console.log("delete resp", result);
          if (serverResponse.ok) {
            setLaterList(result);
            getAlertAmount();
          }
        } catch (error) {
          console.error("Error during fetch:", error);
        }
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
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
                <h3 className="task__sub-head">
                  Tasks Later
                  {alertTaskLength.later > 0 && (
                    <sup>{alertTaskLength.later}</sup>
                  )}
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
                  Tasks Tomorrow
                  {alertTaskLength.tomorrow > 0 && (
                    <sup>{alertTaskLength.tomorrow}</sup>
                  )}
                </h3>
              </li>
            </Link>
            <Link onClick={() => setActiveTab(() => 4)} to="/for-today">
              <li
                className={
                  aciveTab === 4
                    ? "breadcrumb-item active pb-2 task__sub-head tab"
                    : "breadcrumb-item active pb-2 task__sub-head"
                }
              >
                <h3 className="task__sub-head">
                  For Today
                  {alertTaskLength.forToday > 0 && (
                    <sup>{alertTaskLength.forToday}</sup>
                  )}
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
              value={laterForm.taskDetail}
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
                  value={laterForm.completionTime}
                  defaultValue={dayjs().format("hh:mm a")}
                  // minTime={dayjs()}
                  onChange={(newTimeValue) =>
                    setLaterForm({ ...laterForm, completionTime: newTimeValue })
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
                value={laterForm.taskAssignee}
                name="taskAssignee"
                size="1"
                className="form-select"
              >
                {itGuysList && itGuysList.map(itguy =>
                  (<option value={itguy.first_name}>{itguy.first_name}</option>)
                )}
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
          {laterList &&
            laterList.map((eachLater) => (
              <li className="eachLater" key={eachLater.later_id}>
                <div className="ll_container">
                  <span className="ll_leftSec">{eachLater.later_detail}</span>
                  <span className="ll_rightSec">
                    <span className="ll_time">
                      {" "}
                      {dayjs(eachLater.completion_time).format("hh:mm a")}
                    </span>
                    <span className="assignee">{eachLater.task_assignee}</span>
                    <button
                      onClick={() => handleClick(eachLater)}
                      className="ll_btn_mark btn btn-primary"
                    >
                      Mark as complete
                    </button>
                    <button
                      onClick={() => setShowEditII(true)}
                      className="ll_btn_mark btn btn-primary"
                    >
                      Edit
                    </button>
                    {showEditII && (
          <EditTaskII
            each={eachLater}
            setshoweditii={setShowEditII}
            show={showEditII}
            onHide={() => setShowEditII(false)}
          />
        )}
                    <button
                      onClick={() => handleClick(eachLater)}
                      className="ll_btn_mark btn btn-primary"
                    >
                      Delete
                    </button>
                  </span>
                </div>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Later;
