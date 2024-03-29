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
import SingleTaskII from "./SingleTaskII";

const serverUrl = import.meta.env.VITE_API_serverUrl;

const Later = () => {
  const url = useLocation();
  const [aciveTab, setActiveTab] = useContext(TabsContext);
  const [itGuysList] = useContext(ItOfficersContext);
  const [onDutyGlobal] = useContext(OndutyContext);
  const [alertTaskLength, setAlertTaskLength] = useContext(AlertContext);

  const [laterForm, setLaterForm] = useState({
    taskDetail: "",
    completionTime: dayjs(),
    taskAssignee: onDutyGlobal,
  });
  const [laterList, setLaterList] = useState([]);

  useEffect(() => {
    // Update the taskadd state when onDutyGlobal changes
    setLaterForm((prevTaskadd) => ({
      ...prevTaskadd,
      taskAssignee: onDutyGlobal,
    }));
  }, [onDutyGlobal]);

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

  const getAlertAmount = async () => {
    const serverResponseLater = await fetch(`${serverUrl}/later/amount`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const serverResponseTomorrow = await fetch(`${serverUrl}/tomorrow/amount`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // const serverResponseForToday = await fetch(
    //   `${serverUrl}/for-today/amount`,
    //   {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );

    // const forTodayResult = await serverResponseForToday.json();

    const tomorrowResult = await serverResponseTomorrow.json();

    const laterResult = await serverResponseLater.json();

    setAlertTaskLength(() => ({
      ...alertTaskLength,
      later: laterResult,
      tomorrow: tomorrowResult,
      // forToday: forTodayResult,
    }));
  };

  const handleChange = (e) => {
    setLaterForm({ ...laterForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    laterForm.completionTime = dayjs(laterForm.completionTime.$d).format(
      "YYYY-MM-DD hh:mm:ss a"
    );
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

  // console.log("aletr amount", alertTaskLength.later);

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
            {/* <Link onClick={() => setActiveTab(() => 4)} to="/for-today">
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
            </Link> */}
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
                {itGuysList &&
                  itGuysList.map((itguy) => (
                    <option value={itguy.first_name}>{itguy.first_name}</option>
                  ))}
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
            laterList.map((eachLater) => {
              return (
                <SingleTaskII
                  eachlater={eachLater}
                  setlaterlist={setLaterList}
                  getalertamount={getAlertAmount}
                />
              );
            })}
        </ol>
      </div>
    </div>
  );
};

export default Later;
