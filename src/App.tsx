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
            { path: "/users", element: <Users /> },
            { path: "/me", element: <div>User Detail</div> },
            { path: "/leaves", element: <div>Leave</div> },
            { path: "/leaveRequests", element: <LeaveRequests /> },
            { path: "/unauthorized", element: <div>Unauthorized</div> },
          ],
        },
        { path: "*", element: <div>Not Found</div> },
      ],
    },
  ])
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}

export default App
