import React, { useContext, useEffect } from "react";
import { useTasksContext } from "../hooks/useTasksContext";

import Today from "./Today";
import { useParams } from "react-router-dom";
import EachDayTasks from "./EachDayTasks";
import moment from "moment";
import { dayCalc } from "./SingleDayOnSidebar";

const Noteexpand = () => {
  // const [dayExpand, setDayExpand] = useState([]);
  const { tasks, dispatch } = useTasksContext();
  const { doneDay } = useParams();

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     const serverResponse = await fetch(`http://localhost:6800/task`, {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     const result = await serverResponse.json();
  //     // setDayExpand(() => result);
  //     if (serverResponse.ok) {
  //       // console.log("noteexp srvresp", result);
  //       dispatch({ type: "SET_TASKS", payload: result });
  //     }
  //   };
  //   fetchTasks();
  // }, [dispatch]);

  return (
    <div className="task">
      <div className="task__header">
        <h1 className="mt-4">Task Tracker</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active pb-2 task__sub-head">
            <h3 className="task__sub-head"> Tasks {dayCalc(doneDay)}</h3>
          </li>
        </ol>
      </div>
      {/* {!doneDay || doneDay === moment(Date.now()).format("MM-DD-YYYY") ? (
        <Today />
      ) : (
        <EachDayTasks />
      )} */}
    </div>
  );
};

export default Noteexpand;
