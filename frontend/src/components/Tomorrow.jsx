import React, { useContext, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";
import { Link, useLocation, useParams } from "react-router-dom";
import { TabsContext } from "../context/TabsContext";
import { OndutyContext } from "../context/OndutyContext";
import { useEffect } from "react";
import { AlertContext } from "../context/AlertContext";
import EditTaskII from "./EditTaskII";
import { ItOfficersContext } from "../context/ItOfficersContext";

const serverUrl = import.meta.env.VITE_API_serverUrl;

const Tomorrow = () => {
  const url = useLocation();
  const [aciveTab, setActiveTab] = useContext(TabsContext);
  const [itGuysList] = useContext(ItOfficersContext);
  const [onDutyGlobal] = useContext(OndutyContext);
  // const [timeValue, setTimeValue] = useState(null)
  const [alertTaskLength, setAlertTaskLength] = useContext(AlertContext);
  const [showEditII, setShowEditII] = useState(false);

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
    tomorrowForm.completionTime = dayjs(tomorrowForm.completionTime.$d).format(
      "YYYY-MM-DD hh:mm:ss"
    );
    console.log(tomorrowForm.completionTime.$d);
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
      getAlertAmount();
    }
  };

  const getAlertAmount = async () => {
    const serverResponseLater = await fetch(`${serverUrl}/later/amount`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const serverResponseTomorrow = await fetch(`${serverUrl}/tomorrow/amount`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const serverResponseForToday = await fetch(
      `${serverUrl}/for-today/amount`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const forTodayResult = await serverResponseForToday.json();

    const tomorrowResult = await serverResponseTomorrow.json();

    const laterResult = await serverResponseLater.json();

    setAlertTaskLength(() => ({
      ...alertTaskLength,
      later: laterResult,
      tomorrow: tomorrowResult,
      forToday: forTodayResult,
    }));
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
    getAlertAmount();
  }, []);

  // const handleClick = async (eachLater) => {
  //   const updatedMarkCompleteAdd = {
  //     ...markCompleteAdd,
  //     task_detail: eachLater.later_detail,
  //     task_completed: 1,
  //     done_by: eachLater.task_assignee,
  //   };

  //   try {
  //     const serverResponse = await fetch(`${serverUrl}/task`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(updatedMarkCompleteAdd),
  //     });
  //     const result = await serverResponse.json();
  //     console.log("srv resp", result);

  //     // After the fetch is successful, update the state
  //     setMarkCompleteAdd(updatedMarkCompleteAdd);

  //     if (serverResponse.ok) {
  //       try {
  //         const deleteResponse = await fetch(
  //           `${serverUrl}/later/${eachLater.later_id}`,
  //           {
  //             method: "DELETE",
  //             headers: { "Content-Type": "application/json" },
  //           }
  //         );
  //         const result = await deleteResponse.json();
  //         console.log("delete resp", result);
  //         if (serverResponse.ok) {
  //           setLaterList(result);
  //           getAlertAmount();
  //         }
  //       } catch (error) {
  //         console.error("Error during fetch:", error);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error during fetch:", error);
  //   }
  // };

  const handleDelete = async (eachLater) => {
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
      if (deleteResponse.ok) {
        setLaterList(() => result);
        getAlertAmount();
      }
    } catch (error) {
      console.error("Error during deleting task:", error);
    }
  };

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
                  Tasks Tomorrow{" "}
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

        <ol className="later_list">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                {/* <th scope="col">No.</th> */}
                <th scope="col">Task Detail</th>
                <th scope="col">Completion Time</th>
                <th scope="col">Task Assignee</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {tomorrowList &&
                tomorrowList.map((eachTomorrow) => (
                  <tr key={eachTomorrow.tomorrow_id}>
                    {/* <td></td> */}
                    <td>{eachTomorrow.tomorrow_detail}</td>
                    <td>
                      {dayjs(eachTomorrow.completion_time).format("hh:mm a")}
                    </td>
                    <td>{eachTomorrow.task_assignee}</td>

                    <td>
                      <div className="d-flex justify-space-evenly">
                        <button
                          onClick={() => setShowEditII(true)}
                          className="ll_btn_mark btn btn-primary px-2"
                        >
                          Edit
                        </button>
                        {showEditII && (
                          <EditTaskII
                          // each={eachTomorrow}
                          // setshoweditii={setShowEditII}
                          // show={showEditII}
                          // onHide={() => setShowEditII(false)}
                          // // setlaterlist={setTomorrowList}
                          // url="tomorrow"
                          />
                        )}
                        <button
                          onClick={() => handleDelete(eachTomorrow.tomorrow_id)}
                          className="ll_btn_mark btn btn-primary"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              {/* { (tbody.insertAdjacentHTML('beforeend', row))} */}
            </tbody>
          </table>

          {/* ###  Task Later List ### */}
        </ol>
      </div>
    </div>
  );
};

export default Tomorrow;

// {tomorrowList &&
//   tomorrowList.map((eachTomorrow) => (
//     <div className="ll_container">
//       <span className="ll_leftSec">
//         {eachTomorrow.tomorrow_detail}
//       </span>
//       <span className="ll_rightSec">
//         <span className="ll_time">
//           {" "}
//           {dayjs(eachTomorrow.completion_time).format("hh:mm a")}
//         </span>
//         <span className="assignee">{eachTomorrow.task_assignee}</span>
//         <div className="d-flex justify-space-evenly">
//           <button
//             onClick={() => setShowEditII(true)}
//             className="ll_btn_mark btn btn-primary px-2"
//           >
//             Edit
//           </button>
//           {showEditII && (
//             <EditTaskII
//               each={eachTomorrow}
//               setshoweditii={setShowEditII}
//               show={showEditII}
//               onHide={() => setShowEditII(false)}
//               setlaterlist={setLaterList}
//             />
//           )}
//           <button
//             onClick={() => handleDelete(eachLater)}
//             className="ll_btn_mark btn btn-primary"
//           >
//             Delete
//           </button>
//         </div>
//       </span>
//     </div>
//   ))}
