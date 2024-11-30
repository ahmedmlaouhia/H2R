import { useContext, useEffect, useRef, useState } from "react"
import { GiCancel } from "react-icons/gi"
import { SiTicktick } from "react-icons/si"
import Leave from "../services/leave"
import toast from "react-hot-toast"
import moment from "moment"
import Authcontext from "../utils/context"

const LeaveRequests = () => {
  const context = useContext(Authcontext)
  const socket = context.socket
  const [leaveRequests, setLeaveRequests] = useState([])
  const [filteredLeaves, setFilteredLeaves] = useState(leaveRequests)
  const approveRef = useRef<HTMLDialogElement>(null)
  const rejectRef = useRef<HTMLDialogElement>(null)
  const [selectedLeaveId, setSelectedLeaveId] = useState("")
  const fetchLeaves = async () => {
    try {
      const response = await Leave.getLeaves()
      setLeaveRequests(response.leaves)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchLeaves()
  }, [])

  const handleApprove = async () => {
    try {
      await Leave.approveLeave(selectedLeaveId).then(() => {
        toast.success("Leave request approved")
        socket.emit("leaveApproved", selectedLeaveId)
        fetchLeaves()
      })
    } catch (error: any) {
      toast.error(error.response?.data.message || error.message)
    }
  }

  const handleReject = async () => {
    try {
      await Leave.rejectLeave(selectedLeaveId).then(() => {
        toast.success("Leave request rejected")
        socket.emit("leaveRejected", selectedLeaveId)
        fetchLeaves()
      })
    } catch (error: any) {
      toast.error(error.response?.data.message || error.message)
    }
  }

  const reasons = [
    "Sick Leave",
    "Maternity Leave",
    "Paternity Leave",
    "Bereavement Leave",
    "Vacation Leave",
    "Unpaid Leave",
    "Study Leave",
    "Family Leave",
    "Mental Health Day",
    "Marriage Leave",
    "Childcare Responsibilities",
    "Public Holidays",
    "Religious Observance",
    "Medical Leave",
    "Family Leave",
    "Jury Duty",
    "Court Appearance",
    "Relocation Leave",
    "Compassionate Leave",
    "Work-related Travel",
    "Other",
  ]

  const [filter, setFilter] = useState({
    month: "",
    status: "",
    reason: "",
  })

  const applyFilter = () => {
    const { month, status, reason } = filter

    const filtered = leaveRequests.filter((leave: any) => {
      const leaveMonth = new Date(leave.startDate).getMonth() + 1 // Get month (0-indexed)
      const matchesMonth = month ? leaveMonth === parseInt(month) : true
      const matchesStatus = status ? leave.status === status : true
      const matchesReason = reason ? leave.reason === reason : true

      return matchesMonth && matchesStatus && matchesReason
    })

    setFilteredLeaves(filtered)
  }

  useEffect(() => {
    applyFilter()
  }, [filter, leaveRequests])

  return (
    <div className="px-10 py-10 h-full w-full flex flex-col">
      <dialog ref={rejectRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">
            Are you Sure you want to reject this leave request?
          </h3>
          <div className="flex "></div>
          <div className="modal-action flex justify-center">
            <button
              className="btn btn-primary px-10"
              onClick={() => {
                handleReject()
                if (rejectRef.current) {
                  rejectRef.current.close()
                }
              }}
            >
              Yes
            </button>
            <button
              className="btn px-10"
              onClick={() => rejectRef.current?.close()}
            >
              No
            </button>
          </div>
        </div>
      </dialog>
      <dialog ref={approveRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">
            Are you Sure you want to approve this leave request?
          </h3>

          <div className="modal-action flex justify-center">
            <button
              className="btn btn-primary px-10"
              onClick={() => {
                handleApprove()
                if (approveRef.current) {
                  approveRef.current.close()
                }
              }}
            >
              Yes
            </button>
            <button
              className="btn px-10"
              onClick={() => approveRef.current?.close()}
            >
              No
            </button>
          </div>
        </div>
      </dialog>

      <h1 className="text-3xl font-bold mb-10 text-center">Leave Requests</h1>
      <div className="flex gap-5 mb-5">
        <label className="label">Month</label>
        <select
          className="select select-bordered"
          value={filter.month}
          onChange={e => setFilter({ ...filter, month: e.target.value })}
        >
          <option value="">All</option>
          {[...Array(12).keys()].map(m => (
            <option key={m + 1} value={m + 1}>
              {new Date(0, m).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <label className="label">Status</label>
        <select
          className="select select-bordered"
          value={filter.status}
          onChange={e => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Canceled">Canceled</option>
        </select>

        <label className="label">Reason</label>
        <select
          className="select select-bordered"
          value={filter.reason}
          onChange={e => setFilter({ ...filter, reason: e.target.value })}
        >
          <option value="">All</option>
          {reasons.map((r, idx) => (
            <option key={idx} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button
          className="btn btn-ghost  px-10"
          onClick={() => {
            setFilter({ month: "", status: "", reason: "" })
          }}
        >
          Reset
        </button>
      </div>
      {filteredLeaves.length < 1 ? (
        <p className="text-center text-2xl">No Leave Requests found</p>
      ) : (
        <table className="table table-zebra">
          <thead className="bg-primary-content text-primary">
            <tr>
              <th></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Period</th>
              <th>Reason</th>
              <th>Length (Days)</th>
              <th>Leave Balance</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leaveRequest: any, index: number) => (
              <tr tabIndex={index} key={index} className="hover">
                <th>{index + 1}</th>
                <td>{leaveRequest.user.firstName}</td>
                <td>{leaveRequest.user.lastName}</td>
                <td>{leaveRequest.user.email}</td>
                <td className="flex gap-1">
                  <span>
                    {moment(leaveRequest.startDate).format("DD/MM/YYYY")}
                  </span>
                  -{moment(leaveRequest.endDate).format("DD/MM/YYYY")}
                </td>
                <td>{leaveRequest.reason}</td>
                <td>
                  {moment(leaveRequest.endDate).diff(
                    moment(leaveRequest.startDate),
                    "days"
                  ) + 1}
                </td>
                <td>{leaveRequest.user.leaveBalance}</td>
                <td className="flex h-full items-center justify-center gap-3 font-bold">
                  {leaveRequest.status === "Pending" ? (
                    <>
                      <button className="tooltip" data-tip="Approve">
                        <SiTicktick
                          className="text-green-700"
                          onClick={() => {
                            setSelectedLeaveId(leaveRequest.id)
                            if (approveRef.current) {
                              approveRef.current.showModal()
                            }
                          }}
                        />
                      </button>
                      <button className="tooltip" data-tip="Reject">
                        <GiCancel
                          className="text-red-700"
                          onClick={() => {
                            setSelectedLeaveId(leaveRequest.id)
                            if (rejectRef.current) {
                              rejectRef.current.showModal()
                            }
                          }}
                        />
                      </button>
                    </>
                  ) : leaveRequest.status === "Approved" ? (
                    <span className="text-green-700">Approved</span>
                  ) : leaveRequest.status === "Rejected" ? (
                    <span className="text-red-700">Rejected</span>
                  ) : (
                    <span className="!text-orange-500">Canceled</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default LeaveRequests
