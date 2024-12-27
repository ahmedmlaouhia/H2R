import toast from "react-hot-toast"
import { NavLink, useNavigate } from "react-router-dom"
import { RxAvatar } from "react-icons/rx"
import { RxHamburgerMenu } from "react-icons/rx"
import { useContext, useState } from "react"
import Authcontext from "../utils/context"
import { MdNotificationsNone } from "react-icons/md"
import Notifications from "../services/notifications"

type Notification = {
  _id: string
  title: string
  message: string
  isRead: boolean
}

const Navbar = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const isLoggedIn = localStorage.getItem("token")
  const context = useContext(Authcontext)
  const [isThereNotification, setIsThereNotification] = useState(false)
  const user = context.user
  const socket = context.socket
  const fetchNotifications = async () => {
    const data = await Notifications.getNotifications()
    setNotifications(data.notifications)
  }
  socket?.on("leaveApproved", () => {
    setIsThereNotification(true)
    toast.success("A leave request has been approved!")
  })

  socket?.on("leaveRejected", () => {
    setIsThereNotification(true)
    toast.error("A leave request has been rejected!")
  })

  socket?.on("timesheetApproved", () => {
    setIsThereNotification(true)
    toast.success("A timesheet entry has been approved!")
  })

  socket?.on("timesheetRejected", () => {
    setIsThereNotification(true)
    toast.error("A timesheet entry has been rejected!")
  })

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    context.logout()
    toast.success("Logged out successfully")
    navigate("/login")
  }

  const handleNotification = () => {
    setIsThereNotification(false)
    fetchNotifications()
  }

  return (
    <nav className="navbar bg-base-100 border-b-[1px] border-base-300 justify-between !py-0 !h-fit px-20">
      <img
        onClick={() => navigate("/")}
        src="hrlogo.png"
        alt="navlogo"
        className="h-10 cursor-pointer"
      />
      <div>
        {isLoggedIn ? (
          <div className="!h-full flex items-center">
            <div
              className="indicator dropdown dropdown-end !h-full mr-5"
              role="button"
              tabIndex={0}
            >
              {isThereNotification && (
                <span className="indicator-item bg-warning p-[5px]  rounded-full"></span>
              )}
              <MdNotificationsNone
                className="text-3xl"
                onClick={handleNotification}
              />
              <ul className="menu dropdown-content z-[1] w-64 mt-12 shadow-md p-0 rounded-lg">
                {notifications.length ? (
                  notifications.map((notification: Notification) => (
                    <li key={notification._id}>
                      {notification.isRead ? (
                        <div className="flex gap-3 p-2 hover:bg-base-300">
                          <RxAvatar className="h-10 w-10" />

                          <div className="flex flex-col">
                            <div className="font-bold">
                              {notification.title}
                            </div>
                            <div className="text-xs ">
                              {notification.message}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-3 p-2 hover:bg-base-300 text-white">
                          <RxAvatar className="h-10 w-10" />

                          <div className="flex flex-col">
                            <div className="font-bold">
                              {notification.title}
                            </div>
                            <div className="text-xs ">
                              {notification.message}
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  ))
                ) : (
                  <li>
                    <div className="flex gap-3 p-2">
                      <div className="flex flex-col">
                        <div className="font-bold">No notifications</div>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            <div className="dropdown dropdown-end w-44 !h-full">
              <div
                className="flex gap-3 hover:text-base-content py-3 hover:bg-base-300 !h-full justify-center items-center"
                role="button"
                tabIndex={0}
              >
                <RxAvatar className="h-10 w-10" />
                <div className="flex flex-col">
                  <div className="font-bold">{user.name}</div>
                  <div className="text-xs ">{user.role}</div>
                </div>
                <RxHamburgerMenu className="text-2xl" />
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] w-44 shadow-md p-0 "
              >
                <li>
                  <NavLink
                    to="/me"
                    className="btn rounded-none border-0 !shadow-none py-0 "
                  >
                    Profile
                  </NavLink>
                </li>

                <li>
                  <button
                    className="btn rounded-none border-0 !shadow-none py-2 "
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "btn bg-primary text-primary-content shadow-none hover:bg-primary !border-none"
                  : "btn bg-transparent hover:text-primary-content hover:bg-primary shadow-none !border-none"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "btn bg-primary text-primary-content shadow-none hover:bg-primary !border-none"
                  : "btn bg-transparent hover:text-primary-content hover:bg-primary shadow-none !border-none"
              }
            >
              Sign up
            </NavLink>
          </div>
        )}
        <label className="swap swap-rotate ml-10">
          <input type="checkbox" className="theme-controller" value="light" />
          <svg
            className="swap-on h-7 w-7 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg
            className="swap-off h-7 w-7 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
    </nav>
  )
}

export default Navbar
