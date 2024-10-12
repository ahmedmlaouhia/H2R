import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token")
  const userName = JSON.parse(localStorage.getItem("user") || "{}").firstName
  const navigate = useNavigate()
  const goToProfile = () => {
    navigate("/profile")
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <div className="navbar bg-base-100 shadow-md px-20">
      <div className="flex-1">
        <img src="hrlogo.png" alt="navlogo" className="h-14 w-14" />
      </div>
      {isLoggedIn ? (
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
                  className="btn bg-transparent border-0 !shadow-none py-0 hover:bg-transparent"
                  onClick={() => navigate("/users")}
                >
                  Users
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
      ) : (
        <div className="flex-none gap-2">
          <button
            className="btn bg-[#1025a1]  text-white shadow-none hover:bg-[#17236a] hover:text-white !border-none"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="btn bg-transparent hover:bg-transparent !border-none shadow-none"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </div>
      )}
    </div>
  )
}

export default Navbar
