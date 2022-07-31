import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import IsLoggedIn from "./components/IsLoggedIn";
import IssueForm from "./components/IssueForm";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import "./index.css";
import Dashbord from "./pages/Dashbord";
import Issues from "./pages/Issues";
import SplitScreen from "./pages/signup/Login";
import UserProfileEdit from "./pages/userProfile/Userprofile";
import { checkUser } from "./redux/auth/action";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUser());
  }, []);
  return (
    <Box w={"100%"} backgroundColor={"#000"}>
      <RequireAuth>
        <Navbar />
      </RequireAuth>
      <Box mt={"64px"}>
        <Routes>
          <Route
            path="/signup"
            element={
              <IsLoggedIn>
                <SplitScreen />
              </IsLoggedIn>
            }
          />
          <Route
            path="/issues"
            element={
              <RequireAuth>
                <Issues />
              </RequireAuth>
            }
          />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashbord />
              </RequireAuth>
            }
          />
          <Route
            path="/create-issue"
            element={
              <RequireAuth>
                <IssueForm />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <UserProfileEdit />
              </RequireAuth>
            }
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
