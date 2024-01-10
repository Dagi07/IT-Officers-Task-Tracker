import React, { useState } from "react";
import EditTaskII from "./EditTaskII";
import dayjs from "dayjs";

const SingleTaskII = ({ eachlater, setlaterlist }) => {
  const [showEditII, setShowEditII] = useState(false);
  return (
    <div>
      <li className="eachLater" key={eachlater.later_id}>
        <div className="ll_container">
          <span className="ll_leftSec">{eachlater.later_detail}</span>
          <span className="ll_rightSec">
            <span className="ll_time">
              {" "}
              {dayjs(eachlater.completion_time).format("hh:mm a")}
            </span>
            <span className="assignee">{eachlater.task_assignee}</span>
            <div className="d-flex justify-space-evenly">
              <button
                onClick={() => handleClick(eachlater)}
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
                  each={eachlater}
                  setshoweditii={setShowEditII}
                  show={showEditII}
                  onHide={() => setShowEditII(false)}
                  setlaterlist={setlaterlist}
                  url="later"
                />
              )}
              <button
                onClick={() => handleDelete(eachlater)}
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
