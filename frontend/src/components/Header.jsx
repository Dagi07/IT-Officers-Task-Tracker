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
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark header">
      <a class="navbar-brand ps-3" href="index.html">
        Tasks
      </a>

      <button
        class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        href="#!"
      >
        <i class="fas fa-bars"></i>
      </button>

      <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        {/* <div class="input-group">
          <input
            class="form-control"
            type="text"
            placeholder="Search for..."
            aria-label="Search for..."
            aria-describedby="btnNavbarSearch"
          />
          <button class="btn btn-primary" id="btnNavbarSearch" type="button">
            <i class="fas fa-search"></i>
          </button>
        </div> */}
      </form>
      {/* <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          > */}
      <div>
        <i class=" manIcon fas fa-user fa-fw"></i>
        <strong>
          <span className="on-duty">On-Duty: {onDutyGlobal}</span>
        </strong>
      </div>
      {/* </a> */}
      {/* <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <a class="dropdown-item" href="#!">
                Settings
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#!">
                Activity Log
              </a>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <a class="dropdown-item" href="#!">
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
