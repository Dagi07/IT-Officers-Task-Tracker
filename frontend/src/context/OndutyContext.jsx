import { useState, createContext, useEffect } from "react";

export const OndutyContext = createContext();

export const OndutyProvider = (props) => {
  const [onDutyGlobal, setOnDutyGlobal] = useState([]);
  return (
    <OndutyContext.Provider value={[onDutyGlobal, setOnDutyGlobal]}>
      {props.children}
    </OndutyContext.Provider>
  );
};
