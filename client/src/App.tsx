import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
import Home from "./scenes/Home";
import Topbar from "./scenes/global/Topbar";
import Series from "./scenes/Series";
import Movies from "./scenes/Movies";
import Top100 from "./scenes/Top100";
import Genres from "./scenes/Genres";
import Footer from "./scenes/global/Footer";
import Anime from "./scenes/Anime";
import Login from "./scenes/Login";
import SignUp from "./scenes/SignUp";
import Account from "./scenes/Account";
import AccountSettings from "./scenes/AccountSettings.tsx";
import Error from "./components/error.tsx";

import { StateProvider } from "./state/stateContext.tsx";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StateProvider>
          <Topbar />
          <div
            className="App"
            style={{
              minHeight: "90vh",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:id" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/account/:id" element={<Account />} />
              <Route
                path="/account/:id/settings"
                element={<AccountSettings />}
              />
              <Route path="/anime/:id" element={<Anime />} />
              <Route path="/series/:id" element={<Series />} />
              <Route path="/movies/:id" element={<Movies />} />
              <Route path="/top-100/:id" element={<Top100 />} />
              <Route path="/genres/:genre/:page" element={<Genres />} />
              <Route
                path="*"
                element={<Error message="This page wasn't found" />}
              />
            </Routes>
          </div>
          <Footer />
        </StateProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
