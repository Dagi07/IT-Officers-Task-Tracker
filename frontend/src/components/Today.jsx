import React, { useEffect, useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import SingleTask from "./SingleTask";
import AddTask from "./AddTask";
import dayjs from "dayjs";

const serverUrl = import.meta.env.VITE_API_serverUrl;

const Today = () => {
  const [tasksList, setTasksList] = useState(null);
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
    };
    getTasks();
  }, []);

  return (
    <>
      <div className="task__body">
        <ol>
          {tasksList ? (
            tasksList.map((specificTask) => {
              return (
                <li key={specificTask.task_id}>
                  <SingleTask specificTask={specificTask} />
                </li>
              );
            })
          ) : (
            <p>loading...</p>
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
