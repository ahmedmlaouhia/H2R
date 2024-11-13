import { useEffect, useRef, useState } from "react"
import { GiCancel } from "react-icons/gi"
import { AiTwotoneEdit } from "react-icons/ai"

import toast from "react-hot-toast"
import Leave from "../services/leave"
import moment from "moment"

const Leaves = () => {
  const [leaveBalance, setLeaveBalance] = useState(0)
  const [leaves, setLeaves] = useState([])
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
                <input
                  type="text"
                  value={leaveRequest.reason}
                  onChange={e =>
                    setLeaveRequest({
                      ...leaveRequest,
                      reason: e.target.value,
                    })
                  }
                  className="input input-bordered"
                />
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
                <input
                  type="text"
                  value={editedLeave.reason}
                  onChange={e =>
                    setEditedLeave({
                      ...editedLeave,
                      reason: e.target.value,
                    })
                  }
                  className="input input-bordered"
                />
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

      <div className="flex justify-between w-full items-center">
        <div className="flex items-end gap-5">
          <h1 className="text-3xl font-bold w-fit">Leave Balance:</h1>
          <h3 className="text-2xl font-semibold">{leaveBalance}</h3>
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
      <div className="border-b-[1px] my-6"></div>
      <h1 className="text-3xl font-bold text-center mb-10">Leaves</h1>

      {leaves.length < 1 ? (
        <p className="text-center text-2xl">No Leave Requests found</p>
      ) : (
        <table className="table table-zebra w-full">
          <thead className="bg-primary-content text-primary">
            <tr>
              <th></th>
              <th>startDate</th>
              <th>endDate</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave: any, index: number) => (
              <tr tabIndex={index} key={index} className="hover ">
                <th>{index + 1}</th>
                <td>{moment(leave.startDate).format("DD/MM/YYYY")}</td>
                <td>{moment(leave.endDate).format("DD/MM/YYYY")}</td>
                <td>{leave.reason}</td>
                <td className="font-semibold">
                  {leave.status === "Approved" ? (
                    <span className="text-green-600">Approved</span>
                  ) : leave.status === "Rejected" ? (
                    <span className="text-red-600">Rejected</span>
                  ) : leave.status === "Canceled" ? (
                    <span className="!text-orange-500 ">Canceled</span>
                  ) : (
                    <span className="!text-blue-700 ">Pending</span>
                  )}
                </td>
                <td className="flex h-full justify-center gap-3 text-lg">
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
