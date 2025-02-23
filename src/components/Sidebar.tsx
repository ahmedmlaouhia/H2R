import { useContext } from "react"
import { NavLink } from "react-router-dom"
import Authcontext from "../utils/context"

const Sidebar = () => {
  const context = useContext(Authcontext)
  const role = context.user.role
  return (
    <div className="flex flex-col min-w-52 gap-10 h-full px-7 py-20 border-r-[1px] border-base-300">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive
            ? "btn bg-primary text-primary-content shadow-none hover:bg-primary !border-none"
            : "btn bg-transparent hover:text-primary-content hover:bg-primary shadow-none !border-none"
        }
      >
        Dashboard
      </NavLink>

      {role === "Admin" && (
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive
              ? "btn bg-primary text-primary-content shadow-none hover:bg-primary !border-none"
              : "btn bg-transparent hover:text-primary-content hover:bg-primary shadow-none !border-none"
          }
        >
          Users
        </NavLink>
      )}

      {role === "Employee" && (
        <NavLink
          to="/leaves"
          className={({ isActive }) =>
            isActive
              ? "btn bg-primary text-primary-content shadow-none hover:bg-primary !border-none"
              : "btn bg-transparent hover:text-primary-content hover:bg-primary shadow-none !border-none"
          }
        >
          Leaves
        </NavLink>
      )}

      {(role === "Admin" || role === "HR") && (
        <NavLink
          to="/leaveRequests"
          className={({ isActive }) =>
            isActive
              ? "btn bg-primary text-primary-content shadow-none hover:bg-primary !border-none"
              : "btn bg-transparent hover:text-primary-content hover:bg-primary shadow-none !border-none"
          }
        >
          Leave Requests
        </NavLink>
      )}

      {/* Add Timesheet link for Employees */}
      {role === "Employee" && (
        <NavLink
          to="/timesheet"
          className={({ isActive }) =>
            isActive
              ? "btn bg-primary text-primary-content shadow-none hover:bg-primary !border-none"
              : "btn bg-transparent hover:text-primary-content hover:bg-primary shadow-none !border-none"
          }
        >
          Timesheet
        </NavLink>
      )}

      {/* Add Manage Timesheets link for Admin and HR */}
      {(role === "Admin" || role === "HR") && (
        <NavLink
          to="timesheet/manage"
          className={({ isActive }) =>
            isActive
              ? "btn bg-primary text-primary-content shadow-none hover:bg-primary !border-none"
              : "btn bg-transparent hover:text-primary-content hover:bg-primary shadow-none !border-none"
          }
        >
          Manage Timesheets
        </NavLink>
      )}
    </div>
  )
}

export default Sidebar
