import React from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import SingleTask from "./SingleTask";
import AddTask from "./AddTask";
import moment from "moment";

const Today = () => {
  const { tasks } = useTasksContext();
  return (
    <>
      <div className="task__body">
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
      </div>
      <div className="bg-white add_task">
        <AddTask />
      </div>
    </>
  );
};

export default Today;
