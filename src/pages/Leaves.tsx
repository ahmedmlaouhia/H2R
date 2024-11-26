import { useEffect, useRef, useState } from "react"
import { GiCancel } from "react-icons/gi"
import { AiTwotoneEdit } from "react-icons/ai"

import toast from "react-hot-toast"
import Leave from "../services/leave"
import moment from "moment"

const Leaves = () => {
  const [leaveBalance, setLeaveBalance] = useState(0)
  const [leaves, setLeaves] = useState([])
  const [filteredLeaves, setFilteredLeaves] = useState(leaves)
  const cancelRef = useRef<HTMLDialogElement>(null)
  const editRef = useRef<HTMLDialogElement>(null)
  const addRef = useRef<HTMLDialogElement>(null)
  const [selectedLeaveId, setSelectedLeaveId] = useState("")
  const [editedLeave, setEditedLeave] = useState({
    id: "",
    startDate: "",
    endDate: "",
    reason: "",
  })
  const [leaveRequest, setLeaveRequest] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  })

  const fetchLeaves = async () => {
    try {
      const response = await Leave.getMyLeaves()
      setLeaves(response.leaves)
    } catch (error: any) {
      toast.error(error.response?.data.message || error.message)
    }
  }
  const fetchLeaveBalance = async () => {
    try {
      const response = await Leave.getMyLeaveBalance()
      setLeaveBalance(response.leaveBalance)
    } catch (error: any) {
      toast.error(error.response?.data.message || error.message)
    }
  }

  useEffect(() => {
    fetchLeaves()
    fetchLeaveBalance()
  }, [])

  const handleCancel = async () => {
    try {
      await Leave.cancelLeave(selectedLeaveId).then(() => {
        toast.success("Leave request canceled")
        fetchLeaves()
      })
    } catch (error: any) {
      toast.error(error.response?.data.message || error.message)
    }
  }

  const handleEdit = async () => {
    try {
      await Leave.updateLeave(editedLeave).then(() => {
        toast.success("Leave request updated")
        fetchLeaves()
      })
    } catch (error: any) {
      toast.error(error.response?.data.message || error.message)
    }
  }

  const handleAdd = async () => {
    try {
      await Leave.createLeave(
        leaveRequest.startDate,
        leaveRequest.endDate,
        leaveRequest.reason
      ).then(() => {
        toast.success("Leave request created")
        setLeaveRequest({
          startDate: "",
          endDate: "",
          reason: "",
        })
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
    const filtered = leaves.filter((leave: any) => {
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
  }, [filter, leaves])

  return (
    <div className="w-full p-10">
      <dialog ref={addRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Request Leave</h3>
          <div>
            <div className="form-control">
              <label className="label">
                start date
                <input
                  type="date"
                  value={leaveRequest.startDate}
                  onChange={e =>
                    setLeaveRequest({
                      ...leaveRequest,
                      startDate: e.target.value,
                    })
                  }
                  className="input input-bordered"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                end date
                <input
                  type="date"
                  value={leaveRequest.endDate}
                  onChange={e =>
                    setLeaveRequest({
                      ...leaveRequest,
                      endDate: e.target.value,
                    })
                  }
                  className="input input-bordered"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                Reason
                <select
                  value={leaveRequest.reason}
                  onChange={e =>
                    setLeaveRequest({
                      ...leaveRequest,
                      reason: e.target.value,
                    })
                  }
                  className="select select-bordered"
                >
                  <option value="" disabled>
                    Select a reason
                  </option>
                  {reasons.map(reason => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="modal-action flex justify-center">
              <button
                onClick={() => {
                  handleAdd()
                  if (addRef.current) {
                    addRef.current.close()
                  }
                }}
                className="btn px-10 btn-primary "
              >
                Request
              </button>
              <button
                className="btn px-10"
                onClick={() => {
                  setLeaveRequest({
                    startDate: "",
                    endDate: "",
                    reason: "",
                  })
                  addRef.current?.close()
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <dialog ref={editRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg  text-center">Edit Leave</h3>
          <div>
            <div className="form-control">
              <label className="label">
                start date
                <input
                  type="date"
                  value={moment(editedLeave.startDate).format("YYYY-MM-DD")}
                  onChange={e =>
                    setEditedLeave({
                      ...editedLeave,
                      startDate: e.target.value,
                    })
                  }
                  className="input input-bordered"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                end date
                <input
                  type="date"
                  value={moment(editedLeave.endDate).format("YYYY-MM-DD")}
                  onChange={e =>
                    setEditedLeave({
                      ...editedLeave,
                      endDate: e.target.value,
                    })
                  }
                  className="input input-bordered"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                Reason
                <select
                  value={leaveRequest.reason}
                  onChange={e =>
                    setEditedLeave({
                      ...editedLeave,
                      reason: e.target.value,
                    })
                  }
                  className="select select-bordered"
                >
                  <option value="" disabled>
                    Select a reason
                  </option>
                  {reasons.map(reason => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="modal-action flex justify-center">
              <button
                onClick={() => {
                  handleEdit()
                  if (editRef.current) {
                    editRef.current.close()
                  }
                }}
                className="btn px-10 btn-primary "
              >
                Save
              </button>
              <button
                className="btn px-10"
                onClick={() => editRef.current?.close()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <dialog ref={cancelRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">
            Are you Sure you want to cancel this leave request?
          </h3>
          <div className="modal-action flex justify-center">
            <button
              className="btn btn-primary px-10"
              onClick={() => {
                handleCancel()
                if (cancelRef.current) {
                  cancelRef.current.close()
                }
              }}
            >
              Yes
            </button>
            <button
              className="btn px-10"
              onClick={() => cancelRef.current?.close()}
            >
              No
            </button>
          </div>
        </div>
      </dialog>
      <div className="flex items-end gap-5">
        <h1 className="text-3xl font-bold w-fit">Leave Balance:</h1>
        <h3 className="text-2xl font-semibold">{leaveBalance}</h3>
      </div>
      <div className="border-b-[1px] my-6"></div>
      <h1 className="text-3xl font-bold text-center mb-10">Leaves</h1>
      <div className="flex justify-between w-full mb-5">
        <div className="flex gap-5">
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

        <button
          className="btn btn-primary"
          onClick={() => {
            if (addRef.current) {
              addRef.current.showModal()
            }
          }}
        >
          Request Leave
        </button>
      </div>

      {filteredLeaves.length < 1 ? (
        <p className="text-center text-2xl">No Leave Requests found</p>
      ) : (
        <table className="table table-zebra w-full">
          <thead className="bg-primary-content text-primary">
            <tr>
              <th></th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Length (Days)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave: any, index: number) => (
              <tr tabIndex={index} key={index} className="hover">
                <th>{index + 1}</th>
                <td>{moment(leave.startDate).format("DD/MM/YYYY")}</td>
                <td>{moment(leave.endDate).format("DD/MM/YYYY")}</td>
                <td>{leave.reason}</td>
                <td>
                  {moment(leave.endDate).diff(moment(leave.startDate), "days") +
                    1}
                </td>
                <td className="font-semibold">
                  {leave.status === "Approved" ? (
                    <span className="text-green-600">Approved</span>
                  ) : leave.status === "Rejected" ? (
                    <span className="text-red-600">Rejected</span>
                  ) : leave.status === "Canceled" ? (
                    <span className="!text-orange-500">Canceled</span>
                  ) : (
                    <span className="!text-blue-700">Pending</span>
                  )}
                </td>
                <td>
                  {leave.status === "Pending" && (
                    <div className="flex h-full gap-3 text-lg">
                      <button className="tooltip" data-tip="Edit">
                        <AiTwotoneEdit
                          className="text-green-700"
                          onClick={() => {
                            setEditedLeave({
                              id: leave.id,
                              startDate: leave.startDate,
                              endDate: leave.endDate,
                              reason: leave.reason,
                            })

                            if (editRef.current) {
                              editRef.current.showModal()
                            }
                          }}
                        />
                      </button>
                      <button className="tooltip" data-tip="Cancel">
                        <GiCancel
                          className="!text-orange-500"
                          onClick={() => {
                            setSelectedLeaveId(leave.id)
                            if (cancelRef.current) {
                              cancelRef.current.showModal()
                            }
                          }}
                        />
                      </button>
                    </div>
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

export default Leaves
