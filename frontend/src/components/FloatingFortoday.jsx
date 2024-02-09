import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const serverUrl = import.meta.env.VITE_API_serverUrl;

const FloatingFortoday = ({
  showfloating,
  setshowfloating,
  settaskslist,
  getalertamount,
}) => {
  const [forTodayList, setForTodayList] = useState([]);
  const [markCompleteAdd, setMarkCompleteAdd] = useState({
    task_detail: "",
    task_completed: 1,
    done_by: "",
  });

  useEffect(() => {
    const getTasks = async () => {
      let backendResult = await fetch(`${serverUrl}/for-today`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      let res = await backendResult.json();

      const serverResponseTasksAmount = await fetch(
        `${serverUrl}/for-today/amount`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const taskAmountResult = await serverResponseTasksAmount.json();
      console.log(taskAmountResult);

      setForTodayList(res);
      taskAmountResult > 0 &&
        setTimeout(() => {
          setshowfloating(true);
        }, 3750);
    };
    getTasks();
  }, []);

  const handleClick = async (eachTomorrow) => {
    const updatedMarkCompleteAdd = {
      ...markCompleteAdd,
      task_detail: eachTomorrow.tomorrow_detail,
      task_completed: 1,
      done_by: eachTomorrow.task_assignee,
    };

    try {
      const addResponse = await fetch(`${serverUrl}/task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMarkCompleteAdd),
      });
      const result = await addResponse.json();
      console.log("srv resp", result);

      // After the fetch is successful, update the state
      setMarkCompleteAdd(updatedMarkCompleteAdd);

      if (addResponse.ok) {
        try {
          const deleteResponse = await fetch(
            `${serverUrl}/tomorrow/${eachTomorrow.tomorrow_id}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
          );

          const deleteResult = await deleteResponse.json();
          console.log("delete resp", deleteResult);

          if (deleteResponse.ok) {
            const getTasks = async () => {
              let fetchResult = await fetch(
                `${serverUrl}/getTasks/${dayjs().format("YYYY-MM-DD")}`,
                {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                }
              );
              let resFetch = await fetchResult.json();
              settaskslist(resFetch);
              setForTodayList(() => deleteResult);
              getalertamount();
            };
            getTasks();
          }
        } catch (error) {
          console.error("Error during fetch:", error);
        }
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  console.log(forTodayList);

  return (
    <div className={`${showfloating ? "visible float_container" : "d-none"}`}>
      <br />
      <div className="floating_heading">
        <h5>Postponed tasks from Yesterday</h5>
        <button
          type="button"
          class="btn-close close_button"
          aria-label="Close"
          onClick={() => setshowfloating(() => false)}
        ></button>
      </div>
      <div className=" ">
        <table className="table table-hover table-bordered">
          <tbody>
            {/* ###  Task Later List ### */}
            {/* <ol className="forToday_list"> */}
            {forTodayList &&
              forTodayList.map((eachTomorrow) => (
                //   <li className="eachTomorrow" key={eachTomorrow.tomorrow_id}>
                // <div className="ll_container">

                <tr>
                  <td>{eachTomorrow.tomorrow_detail}</td>
                  {/* </span> */}
                  {/* <span className="ll_rightSec"> */}
                  <td>
                    <span className="ll_time">
                      {" "}
                      {dayjs(eachTomorrow.completion_time).format("hh:mm a")}
                    </span>
                  </td>
                  <td>
                    <span className="assignee">
                      {eachTomorrow.task_assignee}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleClick(eachTomorrow)}
                      className="ll_btn_mark btn btn-primary floating_btn px-2"
                    >
                      Mark as complete
                    </button>
                  </td>
                  {/* </span> */}
                </tr>
                // </div>
                //   </li>
              ))}
            {/* </ol> */}
          </tbody>
        </table>
        {forTodayList.length === 0 && (
          <div className="d-flex justify-content-center">
            No tasks postponed
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingFortoday;
