import { useState, createContext } from "react";

export const TabsContext = createContext();

export const TabsProvider = (props) => {
  const [aciveTab, setActiveTab] = useState();

  return (
    <TabsContext.Provider value={[aciveTab, setActiveTab]}>
      {props.children}
    </TabsContext.Provider>
  );
};
