import React, { useContext, useEffect, useState } from "react";
import SingleDayOnSidebar from "./SingleDayOnSidebar";
import { SidebarContext } from "../context/SidebarContext";

const serverUrl = import.meta.env.VITE_API_serverUrl;

const Sidebar = () => {
  const [daysList, setDaysList] = useState(null);
  const [sidebarTaskLength, setSidebarTaskLength] = useContext(SidebarContext);

  const getDays = async () => {
    let backendResult = await fetch(`${serverUrl}/getDays`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    let res = await backendResult.json();
    setDaysList(res);
    setSidebarTaskLength(res);
  };

  useEffect(() => {
    getDays();
  }, []);

  if (sidebarTaskLength) {
    let dayKeys = Object.keys(sidebarTaskLength);

    return (
      <div className="hide">
        <div className="days_list" id="layoutSidenav_nav">
          {/* <div className="days_list_body"> */}
          <div className="scrollbox">
            <div className="scrollbox-inner">
              {dayKeys &&
                dayKeys.map((day_key) => (
                  <SingleDayOnSidebar
                    key={day_key}
                    day_key={day_key}
                    day_key_value={sidebarTaskLength[day_key]}
                  />
                ))}
              {/* </div>
              </div>
            </nav> */}
            </div>
          </div>

          {/* </div> */}
        </div>
      </div>
    );
  }
};

export default Sidebar;

// // ### My verrsion ###
// const { tasks } = useTasksContext();
//   const [listDays, setListDays] = useState([]);
//   let dayCollector = [];
//   let showableDayCollector = [];

//   let doneDay = "";

//   tasks &&
//     tasks.map((eachTask, index) => {
//       doneDay = moment(new Date(Date.parse(eachTask.done_date))).format(
//         "MM-DD-YYYY"
//       );
//       console.log(moment(doneDay).subtract(7, "days"));
//       let relativeDays = moment(doneDay).calendar();

//       let x = moment(doneDay).calendar().split(" at")[0];
//       let y = moment("10-31-2023").calendar().split("Last ")[0];
//       // console.log(moment("10-30-2022").calendar());
//       if (!dayCollector.includes(doneDay)) {
//         let temp_day = relativeDays.toString();
//         if (temp_day.startsWith("Last")) {
//           temp_day = temp_day.split("Last ")[1];
//           temp_day = temp_day.split(" at")[0];
//           showableDayCollector.push(temp_day);
//         } else {
//           temp_day = temp_day.split(" at")[0];
//           showableDayCollector.push(temp_day);
//         }

//         dayCollector.push(doneDay);
//       }
//     });
//   // .format("ddd[,] MMM DD")

{
  /* <nav class="sb-sidenav accordion sb-sidenav" id="sidenavAccordion">
              <div class="sb-sidenav-menu">
                <div class="nav"> */
}
{
  /* {dayCollector.map((doneDay, index) => (
              <SingleDayOnSidebar key={index} doneDay={doneDay} />
            ))} */
}

// <div id="layoutSidenav_nav">
//   <nav class="sb-sidenav accordion sb-sidenav" id="sidenavAccordion">
//     <div class="sb-sidenav-menu">
//       {/* <div class="nav"> */}
//       {hourCollector.map((singleHour, index) => (
//         <SingleDayOnSidebar singleHour={singleHour} />
//       ))}
//       {/* </div> */}
//     </div>
//     <div class="sb-sidenav-footer">
//       <div class="small">Logged in as:</div>
//       Start Bootstrap
//     </div>
//   </nav>
// </div>
