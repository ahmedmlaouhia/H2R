import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="flex flex-col min-w-72 gap-10 h-full px-10 py-20 bg-base-200 shadow-md text-base-200-content ">
      <Link to="/users" className="btn w-full px-10 shadow-none">
        Users
      </Link>
      <Link to="/leaves" className="btn w-full px-10 shadow-none">
        Leaves
      </Link>
      <Link to="/leaveRequests" className="btn w-full px-10 shadow-none">
        Leave Requests
      </Link>
    </div>
  )
}

export default Sidebar
