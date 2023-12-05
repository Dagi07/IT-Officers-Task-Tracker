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
      url.pathname === "/for-today"
        ? setActiveTab(() => 4)
        : setActiveTab(() => 1);
      let backendResult = await fetch(`${serverUrl}/for-today`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      let res = await backendResult.json();
      setTasksList(res);
    };
    getTasks();
  }, []);

  return (
    <>
      <div className="for_today">
        <div className="task__header">
          <h1 className="mt-4">Task for Today</h1>
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
            <Link onClick={() => setActiveTab(() => 4)} to="/for-today">
              <li
                className={
                  aciveTab === 4
                    ? "breadcrumb-item active pb-2 task__sub-head tab"
                    : "breadcrumb-item active pb-2 task__sub-head"
                }
              >
                <h3 className="task__sub-head">
                  For Today<sup>7</sup>
                </h3>
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
      </div>
    </>
  );
};

export default Today;
