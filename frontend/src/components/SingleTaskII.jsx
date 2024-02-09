import React, { useState } from "react";
import EditTaskII from "./EditTaskII";
import dayjs from "dayjs";

const serverUrl = import.meta.env.VITE_API_serverUrl;

const SingleTaskII = (props) => {
  const [showEditII, setShowEditII] = useState(false);
  const [markCompleteAdd, setMarkCompleteAdd] = useState({
    task_detail: "",
    task_completed: 1,
    done_by: "",
  });

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
            props.setlaterlist(result);
            props.getalertamount();
          }
        } catch (error) {
          console.error("Error during fetch:", error);
        }
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const handleDelete = async (e) => {
    try {
      const serverResponse = await fetch(`${serverUrl}/later/${e.later_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const result = await serverResponse.json();

      if (serverResponse.ok) {
        const getTasks = async () => {
          const serverResponse = await fetch(`${serverUrl}/later`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          const result = await serverResponse.json();
          props.setlaterlist(() => result);
        };
        getTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <li className="eachLater" key={props.eachlater.later_id}>
        <div className="ll_container">
          <span className="ll_leftSec">{props.eachlater.later_detail}</span>
          <span className="ll_rightSec">
            <span className="ll_time">
              {" "}
              {dayjs(props.eachlater.completion_time).format("hh:mm a")}
            </span>
            <span className="assignee">{props.eachlater.task_assignee}</span>
            <div className="d-flex justify-space-evenly">
              <button
                onClick={() => handleClick(props.eachlater)}
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
                  each={props.eachlater}
                  setshoweditii={setShowEditII}
                  show={showEditII}
                  onHide={() => setShowEditII(false)}
                  setlaterlist={props.setlaterlist}
                  url="later"
                />
              )}
              <button
                onClick={() => handleDelete(props.eachlater)}
                className="ll_btn_mark btn btn-primary"
              >
                Delete
              </button>
            </div>
          </span>
        </div>
        <hr />
      </li>
    </div>
  );
};

export default SingleTaskII;
