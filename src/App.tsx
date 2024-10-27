import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Users from "./pages/users"
import Sidebar from "./components/Sidebar"
import ProtectedRoute from "./utils/protectedRoute"
import LeaveRequests from "./pages/LeaveRequests"
import Leaves from "./pages/Leaves"
import Authcontext from "./utils/context"
import { useState } from "react"

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

type User = {
  name: string
  role: string
  isAuth: boolean
}

function App() {
  const [user, setUser] = useState({
    name: "",
    role: "",
    isAuth: false,
  })

  const login = (user: User) => {
    setUser({
      name: user.name,
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
            <ProtectedRoute allowedRoles={["none"]}>
              <Main />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "/",
              element: <Home />,
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
            { path: "/me", element: <div>User Detail</div> },
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
      <Authcontext.Provider value={{ user, login, logout }}>
        <Toaster />
        <RouterProvider router={router} />
      </Authcontext.Provider>
    </>
  )
}

export default App
