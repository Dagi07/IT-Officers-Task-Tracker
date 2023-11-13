import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { OndutyContext } from "../context/OndutyContext";

const Header = () => {
  // const [onDuty, setOnDuty] = useState("");
  const [onDutyGlobal, setOnDutyGlobal] = useContext(OndutyContext);

  useEffect(() => {
    const onDutyChanger = () => {
      const currentTime = moment(); // Get the current time using moment
      const startTimeMorningShift = moment("07:00", "HH:mm");
      const endTimeMorningShift = moment("15:00", "HH:mm");
      const startTimeAfternoonShift = moment("15:00", "HH:mm");
      const endTimeAfternoonShift = moment("17:30", "HH:mm");

      if (currentTime.isBetween(startTimeMorningShift, endTimeMorningShift)) {
        setOnDutyGlobal("Sirak");
      } else if (
        currentTime.isBetween(startTimeAfternoonShift, endTimeAfternoonShift)
      ) {
        setOnDutyGlobal("Dagmawi");
      } else {
        setOnDutyGlobal("Tsegaye");
      }
    };

    onDutyChanger();

    // Set up an interval to check and update every minute (adjust as needed)
    const intervalId = setInterval(onDutyChanger, 60000);
    // setOnDutyGlobal(() => onDuty);
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark header">
      <a className="navbar-brand ps-3" href="index.html">
        Tasks
      </a>

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
      <div>
        <i className=" manIcon fas fa-user fa-fw"></i>
        <strong>
          <span className="on-duty">On-Duty: {onDutyGlobal}</span>
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
