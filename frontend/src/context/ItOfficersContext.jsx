import { useState, createContext, useEffect } from "react";

export const ItOfficersContext = createContext();

export const ItOfficersProvider = (props) => {
    const [itGuysList, setItGuysList] = useState("");
  return (
    <ItOfficersContext.Provider value={[itGuysList, setItGuysList]}>
      {props.children}
    </ItOfficersContext.Provider>
  );
};