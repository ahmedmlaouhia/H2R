import { Toaster } from "react-hot-toast"
// import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ])
  return (
    <>
      <Toaster />
      <Navbar />
      <RouterProvider router={router} />
      {/* <Footer /> */}
    </>
  )
}

export default App
