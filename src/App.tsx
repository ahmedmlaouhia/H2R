import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Users from "./pages/users"
import Sidebar from "./components/Sidebar"
import ProtectedRoute from "./utils/protectedRoute"
import LeaveRequests from "./pages/LeaveRequests"
import Leaves from "./pages/Leaves"
import Authcontext from "./utils/context"
import { useEffect, useState } from "react"
import Timesheet from "./pages/Timesheet"
import ManageTimesheets from "./pages/ManageTimesheets"
import Profile from "./pages/Profile"
import { Socket, io } from "socket.io-client"
import AdminDashboard from "./pages/Dashboard"
import Home from "./pages/Home"

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

function Main() {
  return (
    <div className="flex h-screen justify-between">
      <Sidebar />
      <Outlet />
    </div>
  )
}

function App() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const userr = localStorage.getItem("user") || "{}"
  const [user, setUser] = useState({
    name: JSON.parse(userr).firstName || "",
    role: JSON.parse(userr).role || "",
    isAuth: localStorage.getItem("token") ? true : false,
  })

  useEffect(() => {
    const s = io("http://localhost:3000")
    setSocket(s)
    s.emit("join", JSON.parse(userr).id)
    return () => {
      s.disconnect()
    }
  }, [])

  const login = (user: any) => {
    setUser({
      name: user.firstName,
      role: user.role,
      isAuth: user.isAuth,
    })
  }

  const logout = () => {
    setUser({
      name: "",
      role: "",
      isAuth: false,
    })
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        {
          path: "/",
          element: (
            <ProtectedRoute allowedRoles={["Admin", "Employee", "HR"]}>
              <Main />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "/home",
              element: (
                <ProtectedRoute allowedRoles={["Employee"]}>
                  <Home />
                </ProtectedRoute>
              ),
            },
            {
              path: "/dashboard",
              element: (
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              ),
            },
            { path: "/hr", element: <div>HR page</div> },
            { path: "/admin", element: <div>admin page</div> },
            {
              path: "/users",
              element: (
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <Users />
                </ProtectedRoute>
              ),
            },
            {
              path: "/timesheet",
              element: (
                <ProtectedRoute allowedRoles={["Employee"]}>
                  <Timesheet />
                </ProtectedRoute>
              ),
            },
            {
              path: "/timesheet/manage",
              element: (
                <ProtectedRoute allowedRoles={["HR", "Admin"]}>
                  <ManageTimesheets />
                </ProtectedRoute>
              ),
            },
            { path: "/me", element: <Profile /> },
            {
              path: "/leaves",
              element: (
                <ProtectedRoute allowedRoles={["Employee"]}>
                  <Leaves />
                </ProtectedRoute>
              ),
            },
            {
              path: "/leaveRequests",
              element: (
                <ProtectedRoute allowedRoles={["Admin", "HR"]}>
                  <LeaveRequests />
                </ProtectedRoute>
              ),
            },
            { path: "/unauthorized", element: <div>Unauthorized</div> },
          ],
        },
        { path: "*", element: <div>Not Found</div> },
      ],
    },
  ])
  return (
    <>
      <Authcontext.Provider value={{ user, login, logout, socket }}>
        <Toaster />
        <RouterProvider router={router} />
      </Authcontext.Provider>
    </>
  )
}

export default App
