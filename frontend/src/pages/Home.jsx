import React from "react";
import Sidebar from "../components/Sidebar";
import Noteexpand from "../components/Noteexpand";

const Home = () => {
  return (
    // <div id="layoutSidenav">
    <div class="task_tracker__home">
      <Sidebar />
      <Noteexpand />
    </div>
    // </div>
  );
};

export default Home;
