import React, { useContext, useEffect, useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import SingleTask from "./SingleTask";
import AddTask from "./AddTask";
import dayjs from "dayjs";
import { Link, useLocation, useParams } from "react-router-dom";
import Later from "./Later";
import { TabsContext } from "../context/TabsContext";

const serverUrl = import.meta.env.VITE_API_serverUrl;

const Today = () => {
  const [tasksList, setTasksList] = useState(null);
  const url = useLocation();
  const [aciveTab, setActiveTab] = useContext(TabsContext);

  useEffect(() => {
    const getTasks = async () => {
      let backendResult = await fetch(
        `${serverUrl}/getTasks/${dayjs().format("YYYY-MM-DD")}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      let res = await backendResult.json();
      setTasksList(res);
      if (url.pathname !== "/later") {
        setActiveTab(() => 1);
      }
    };
    getTasks();
  }, []);

  console.log(url.pathname);

  return (
    <>
      <div className="task__header">
        <h1 className="mt-4">Task Tracker</h1>
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
      <div className="task__body">
        <ol>
          {tasksList ? (
            tasksList.map((specificTask) => {
              return (
                <li
                  key={specificTask.task_id}
                  className={specificTask.task_completed === 0 && "not_yet"}
                >
                  <SingleTask specificTask={specificTask} />
                </li>
              );
            })
          ) : (
            <p className="loading">loading...</p>
          )}
        </ol>
      </div>
      <div className="bg-white add_task">
        <AddTask />
      </div>
    </>
  );
};

export default Today;

// ### My Version ###
{
  /* <div className="task__body">
        <ol>
          {tasks &&
            tasks
              .filter((filtred) => {
                return (
                  moment(new Date(Date.parse(filtred.done_date))).format(
                    "MM-DD-YYYY"
                  ) === moment(Date.now()).format("MM-DD-YYYY")
                );
              })

              .map((eachTask) => (
                <li className="single_task__parent" key={eachTask.task_id}>
                  <SingleTask key={eachTask.task_id} eachTask={eachTask} />
                </li>
              ))}
        </ol>
      </div> */
}
