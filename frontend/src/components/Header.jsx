import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { OndutyContext } from "../context/OndutyContext";
import { Link } from "react-router-dom";
import { ItOfficersContext } from "../context/ItOfficersContext";

const serverUrl = import.meta.env.VITE_API_serverUrl;

const Header = () => {
  // const [onDuty, setOnDuty] = useState("");
  const [itGuysList, setItGuysList] = useContext(ItOfficersContext);
  const [onDutyGlobal, setOnDutyGlobal] = useContext(OndutyContext);

  useEffect(() => {
    const fetchItGuys = async () => {
      try {
        const backendResponse = await fetch(`${serverUrl}/fetch-itofficer`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const result = await backendResponse.json();
        setItGuysList(() => result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItGuys();
  }, []);

  useEffect(() => {
    if (itGuysList) {
      const onDutyChanger = () => {
        const currentTime = moment(); // Get the current time using moment
        const startTimeMorningShift = moment("07:00", "HH:mm");
        const endTimeMorningShift = moment("15:00", "HH:mm");
        const startTimeAfternoonShift = moment("15:00", "HH:mm");
        const endTimeAfternoonShift = moment("17:30", "HH:mm");
        if (currentTime.isBetween(startTimeMorningShift, endTimeMorningShift)) {
          setOnDutyGlobal(itGuysList[0].first_name);
        } else if (
          currentTime.isBetween(startTimeAfternoonShift, endTimeAfternoonShift)
        ) {
          setOnDutyGlobal(itGuysList[1].first_name);
        } else {
          setOnDutyGlobal(
            itGuysList.length > 2
              ? itGuysList[2].first_name
              : itGuysList[1].first_name
          );
        }
      };

      onDutyChanger();

      // Set up an interval to check and update every minute (adjust as needed)
      const intervalId = setInterval(onDutyChanger, 6000000);
      // setOnDutyGlobal(() => onDuty);
      // Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [itGuysList]);

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark header">
      <Link className="navbar-brand ps-3" to="/">
        Tasks
      </Link>

      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        href="#!"
      >
        <i className="fas fa-bars"></i>
      </button>

      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        {/* <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search for..."
            aria-label="Search for..."
            aria-describedby="btnNavbarSearch"
          />
          <button className="btn btn-primary" id="btnNavbarSearch" type="button">
            <i className="fas fa-search"></i>
          </button>
        </div> */}
      </form>
      {/* <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          > */}
      <div className="onduty-wrapper">
        <Link to="/itofficer">
          <i className=" manIcon fas fa-user fa-fw"></i>
        </Link>

        <strong>
          <span className="on-duty">
            On-Duty:
            <select
              id="done_by"
              onChange={(e) => setOnDutyGlobal(() => e.target.value)}
              value={onDutyGlobal}
              name="done_by"
              size="1"
              className=" onDuty_selector bg-dark"
            >
              {itGuysList &&
                itGuysList.map((itguy) => (
                  <option value={itguy.first_name}>{itguy.first_name}</option>
                ))}
            </select>
          </span>
        </strong>
      </div>

      {/* </a> */}
      {/* <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <a className="dropdown-item" href="#!">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#!">
                Activity Log
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#!">
                Logout
              </a>
            </li>
          </ul> */}
      {/* </li>
      </ul> */}
    </nav>
  );
};

export default Header;
