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
import { SidebarProvider } from "./context/SidebarContext";
import Tomorrow from "./components/Tomorrow";

function App() {
  return (
    <BrowserRouter>
      <OndutyProvider>
        <TabsProvider>
          {" "}
          <SidebarProvider>
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
                <Route
                  path="/tomorrow"
                  element={
                    <>
                      <Header />
                      <Sidebar />
                      <Tomorrow />
                    </>
                  }
                />
              </Routes>
            </div>
          </SidebarProvider>
        </TabsProvider>
      </OndutyProvider>
    </BrowserRouter>
  );
}

export default App;
