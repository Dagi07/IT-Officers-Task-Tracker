import { useState, createContext } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = (props) => {
  const [sidebarTaskLength, setSidebarTaskLength] = useState("");

  return (
    <SidebarContext.Provider value={[sidebarTaskLength, setSidebarTaskLength]}>
      {props.children}
    </SidebarContext.Provider>
  );
};
