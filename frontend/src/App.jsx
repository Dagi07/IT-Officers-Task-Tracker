import "./App.css";
import "./assets/styles/styles.css";
import "./assets/styles/custom.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OndutyProvider } from "./context/OndutyContext";
import { TabsProvider } from "./context/TabsContext";
import Later from "./components/Later";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <OndutyProvider>
        <TabsProvider>
          <div className="app">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Header />
                    <Home />
                  </>
                }
              />
              <Route
                path="/eachdaytask/:doneDay"
                element={
                  <>
                    <Header />
                    <Home />
                  </>
                }
              />
              <Route
                path="/later"
                element={
                  <>
                    <Header />
                    <Sidebar />
                    <Later />
                  </>
                }
              />
            </Routes>
          </div>
        </TabsProvider>
      </OndutyProvider>
    </BrowserRouter>
  );
}

export default App;
