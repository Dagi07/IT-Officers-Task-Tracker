import React, { useContext, useEffect, useState } from "react";
import { TabsContext } from "../context/TabsContext";
import { AlertContext } from "../context/AlertContext";
import { Link, useLocation } from "react-router-dom";
import dayjs from "dayjs";

const serverUrl = import.meta.env.VITE_API_serverUrl;

const ForToday = () => {
  const url = useLocation();
  const [aciveTab, setActiveTab] = useContext(TabsContext);
  const [alertTaskLength, setAlertTaskLength] = useContext(AlertContext);
  const [forTodayList, setForTodayList] = useState([]);

  const getAlertAmount = async () => {
    const serverResponseLater = await fetch(`${serverUrl}/later/amount`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const serverResponseTomorrow = await fetch(`${serverUrl}/tomorrow/amount`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const serverResponseForToday = await fetch(
      `${serverUrl}/for-today/amount`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const forTodayResult = await serverResponseForToday.json();

    const tomorrowResult = await serverResponseTomorrow.json();

    const laterResult = await serverResponseLater.json();

    setAlertTaskLength(() => ({
      ...alertTaskLength,
      later: laterResult,
      tomorrow: tomorrowResult,
      forToday: forTodayResult,
    }));
  };

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
      console.log(forTodayList);
      setForTodayList(res);
    };
    getTasks();
    getAlertAmount();
  }, []);

  return (
    <div className="later_container forToday_wrapper">
      <br />
      <br />
      <br />
      <div className="later_container_inner forToday_inner">
        <div className="task__header">
          <h1 className="mt-4">Tasks to do Today</h1>
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
                  Tasks Later
                  {alertTaskLength.later > 0 && (
                    <sup>{alertTaskLength.later}</sup>
                  )}
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
                  Tasks Tomorrow{" "}
                  {alertTaskLength.tomorrow > 0 && (
                    <sup>{alertTaskLength.tomorrow}</sup>
                  )}
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
                  For Today{" "}
                  {alertTaskLength.forToday > 0 && (
                    <sup>{alertTaskLength.forToday}</sup>
                  )}
                </h3>
              </li>
            </Link>
          </ol>
        </div>

        {/* ###  Task Later List ### */}
        <ol className="later_list forToday_list">
          {forTodayList &&
            forTodayList.map((eachTomorrow) => (
              <li className="eachTomorrow" key={eachTomorrow.tomorrow_id}>
                <div className="ll_container">
                  <span className="ll_leftSec">
                    {eachTomorrow.tomorrow_detail}
                  </span>
                  <span className="ll_rightSec">
                    <span className="ll_time">
                      {" "}
                      {dayjs(eachTomorrow.completion_time).format("hh:mm a")}
                    </span>
                    <span className="assignee">
                      {eachTomorrow.task_assignee}
                    </span>
                    {/* buttons */}
                  </span>
                </div>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default ForToday;
