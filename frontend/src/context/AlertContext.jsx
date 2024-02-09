import { useState, createContext } from "react";

export const AlertContext = createContext();

export const AlertProvider = (props) => {
  const [alertTaskLength, setAlertTaskLength] = useState({
    later: 0,
    tomorrow: 0,
    forToday: 0,
  });

  return (
    <AlertContext.Provider value={[alertTaskLength, setAlertTaskLength]}>
      {props.children}
    </AlertContext.Provider>
  );
};
