import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTasksContext } from "../hooks/useTasksContext";
import moment from "moment/moment";
import dayjs from "dayjs";
import SingleTask from "./SingleTask";
import Today from "./Today";
import Noteexpand from "./Noteexpand";
import { dayCalc } from "./SingleDayOnSidebar";
import { saveAs } from "file-saver";

const serverUrl = import.meta.env.VITE_API_serverUrl;

const EachDayTasks = () => {
  const { doneDay } = useParams();
  const { tasks, dispatch } = useTasksContext();
  const [status, setStatus] = useState("Generate Report");

  const [tasksList, setTasksList] = useState(null);

  useEffect(() => {
    const getTasks = async () => {
      let backendResult = await fetch(`${serverUrl}/getTasks/${doneDay}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      let res = await backendResult.json();
      setTasksList(res);
    };
    getTasks();
  }, [doneDay]);

  const handleClick = () => {
    const getReport = async () => {
      setStatus("generating report for this day...");
      try {
        const response = await fetch(`${serverUrl}/get-report/${doneDay}`, {
          method: "GET",
          responseType: "blob",
        });

        if (response.ok) {
          const pdfBlob = await response.blob();
          saveAs(pdfBlob, `${dayjs(doneDay).format("DD-MM-YYYY")}_report.pdf`);
          setStatus("Generate Report");
        } else {
          setStatus("Failed to fetch report");
        }
      } catch (error) {
        console.error(error);
        setStatus("Failed to fetch report");
      }
    };

    getReport();
  };

  return (
    <>
      <div className="task">
        {dayjs().format("YYYY-MM-DD") === doneDay || !doneDay ? (
          <Today />
        ) : (
          <>
            <div className="task__header">
              <div className="generate_report">
                <h1 className="mt-4">Task Tracker</h1>
                <button
                  className="btn btn-primary generate_report_btn"
                  onClick={handleClick}
                >
                  {status}
                </button>
              </div>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active pb-2 task__sub-head">
                  <h3 className="task__sub-head"> Tasks {dayCalc(doneDay)}</h3>
                </li>
              </ol>
            </div>
            <div className="task__body">
              <ol>
                {tasksList ? (
                  tasksList.map((specificTask) => {
                    return (
                      <li
                        className={
                          specificTask.task_completed === 0 && "not_yet"
                        }
                        key={specificTask.task_id}
                      >
                        <SingleTask
                          specificTask={specificTask}
                          taskslist={tasksList}
                          settaskslist={setTasksList}
                          doneday={doneDay}
                        />
                      </li>
                    );
                  })
                ) : (
                  <p>loading...</p>
                )}
              </ol>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EachDayTasks;

// ### My Version ###
// {tasks ? (
//   tasks
//     .filter((filtred) => {
//       return (
//         moment(new Date(Date.parse(filtred.done_date))).format(
//           "YYYY-MM-DD"
//         ) === doneDay
//       );
//     })

//     .map((eachTask) => (
//       // <div className="single_task__parent">
//       <li key={eachTask.task_id}>
//         <SingleTask key={eachTask.task_id} eachTask={eachTask} />
//       </li>
//       //{" "}
//       // </div>
//     ))
// ) : (
//   <p>loading...</p>
// )}
