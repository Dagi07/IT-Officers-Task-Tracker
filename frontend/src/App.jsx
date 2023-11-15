import "./App.css";
import "./assets/styles/styles.css";
import "./assets/styles/custom.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OndutyProvider } from "./context/OndutyContext";
import Later from "./components/Later";

function App() {
  return (
    <BrowserRouter>
      <OndutyProvider>
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
                  <Later />
                </>
              }
            />
          </Routes>
        </div>
      </OndutyProvider>
    </BrowserRouter>
  );
}

export default App;
