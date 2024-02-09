import React from "react";
import Sidebar from "../components/Sidebar";
import Noteexpand from "../components/Noteexpand";
import EachDayTasks from "../components/EachDayTasks";

const Home = () => {
  return (
    // <div id="layoutSidenav">
    <div className="task_tracker__home">
      <Sidebar />
      {/* <Noteexpand /> */}
      <EachDayTasks />
    </div>
    // </div>
  );
};

export default Home;
