import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Components/Pages/Dashboard";
import Taskmgmt from "./Components/Pages/Taskmgmt";
import Header from "./Components/Layouts/Header";
import { useSelector } from "react-redux";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { authActions } from "./Store";
import { useDispatch } from "react-redux";
function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authActions.logout());
  };
  const loggedInUserMenuItems = [
    { title: "Dashboard", url: "/dashboard" },
    { title: "Task Management", url: "/taskmgmt" },
    { title: "Logout", url: "#", logout: logout },
  ];

  const generalMenuItems = [
    { title: "Register", url: "/register" },
    { title: "Login", url: "/login" },
  ];


  return (
    <>
      <Header
        menuItems={isAuthenticated  ? loggedInUserMenuItems : generalMenuItems}
        heading="Management Tool"
      />
      {isAuthenticated ? (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/taskmgmt" element={<Taskmgmt />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
}

export default App;
