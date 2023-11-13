import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTasksContext } from "../hooks/useTasksContext";
import moment from "moment/moment";
import SingleTask from "./SingleTask";

const EachDayTasks = () => {
  const { doneDay } = useParams();
  const { tasks } = useTasksContext();
  return (
    <>
      <div className="task__body">
        <ol>
          {tasks ? (
            tasks
              .filter((filtred) => {
                return (
                  moment(new Date(Date.parse(filtred.done_date))).format(
                    "YYYY-MM-DD"
                  ) === doneDay
                );
              })

              .map((eachTask) => (
                // <div className="single_task__parent">
                <li key={eachTask.task_id}>
                  <SingleTask key={eachTask.task_id} eachTask={eachTask} />
                </li>
                //{" "}
                // </div>
              ))
          ) : (
            <p>loading...</p>
          )}
        </ol>
      </div>
    </>
  );
};

export default EachDayTasks;
