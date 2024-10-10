import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Users from "./pages/users"

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/Employees", element: <Users /> },
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
