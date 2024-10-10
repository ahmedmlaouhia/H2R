import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const userName = localStorage.getItem("username") || "me"
  const navigate = useNavigate()
  const goToProfile = () => {
    navigate("/profile")
  }

  const handleLogout = () => {
    // Handle logout
  }

  return (
    <div className="navbar bg-base-100 shadow-md px-20">
      <div className="flex-1">
        <img src="hrlogo.png" alt="navlogo" className="h-14 w-14" />
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className=" avatar placeholder">
            <div className="bg-neutral text-neutral-content w-10 rounded-full">
              <span> {userName[0] + userName[1]} </span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-white rounded-md z-[1] w-44 shadow-md p-0 mt-3"
          >
            <li>
              <button
                className="btn bg-transparent border-0 !shadow-none py-0 hover:bg-transparent"
                onClick={goToProfile}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                className="btn bg-transparent border-0 !shadow-none py-2 hover:bg-transparent"
                onClick={handleLogout}
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
