import React, { useState } from "react";
import dayjs from "dayjs";
import EditTaskIII from "./EditTaskIII";

const serverUrl = import.meta.env.VITE_API_serverUrl;

const SingleTaskIII = ({ each, settomorrowlist, getalertamount }) => {
  const [showEditIII, setShowEditIII] = useState(false);

  const handleDelete = async (tid) => {
    try {
      const deleteResponse = await fetch(`${serverUrl}/tomorrow/${tid}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const result = await deleteResponse.json();
      console.log("delete resp", result);
      if (deleteResponse.ok) {
        settomorrowlist(() => result);
        getalertamount();
      }
    } catch (error) {
      console.error("Error during deleting task:", error);
    }
  };

  return (
    <tr key={each.tomorrow_id}>
      {/* <td></td> */}
      <td>{each.tomorrow_detail}</td>
      <td>{dayjs(each.completion_time).format("hh:mm a")}</td>
      <td>{each.task_assignee}</td>

      <td>
        <div className="d-flex justify-space-evenly">
          <button
            onClick={() => setShowEditIII(true)}
            className="ll_btn_mark btn btn-primary px-2"
          >
            Edit
          </button>
          {showEditIII && (
            <EditTaskIII
              each={each}
              setshoweditiii={setShowEditIII}
              show={showEditIII}
              onHide={() => setShowEditIII(false)}
              settomorrowlist={settomorrowlist}
              url="tomorrow"
            />
          )}
          <button
            onClick={() => handleDelete(each.tomorrow_id)}
            className="ll_btn_mark btn btn-primary"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SingleTaskIII;
