import { useEffect, useRef, useState } from "react"
import { GiCancel } from "react-icons/gi"
import { SiTicktick } from "react-icons/si"
import Leave from "../services/leave"
import toast from "react-hot-toast"

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([])
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
      await Leave.approveLeave(selectedLeaveId)
      toast.success("Leave request approved")
      fetchLeaves()
    } catch (error: any) {
      toast.error(error.response?.data.message || error.message)
    }
  }

  const handleReject = async () => {}

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

      <h1 className="text-3xl font-bold text-center">Leave Requests</h1>
      <div className="divider"></div>

      {leaveRequests.length < 1 ? (
        <p className="text-center text-2xl">No Leave Requests found</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Period</th>
              <th>Reason</th>
              <th>Leave Balance</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((leaveRequest: any, index: number) => (
              <tr tabIndex={index} key={index} className="hover">
                <th>{index + 1}</th>
                <td>{leaveRequest.user.firstName}</td>
                <td>{leaveRequest.user.lastName}</td>
                <td>{leaveRequest.user.email}</td>
                <td>
                  <div className="flex gap-2">
                    <span>From</span>
                    <span>
                      {new Date(leaveRequest.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span>To </span>
                    <span>
                      {new Date(leaveRequest.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </td>
                <td>{leaveRequest.reason}</td>
                <td>{leaveRequest.user.leaveBalance}</td>
                <td className="flex h-full items-center justify-center gap-3 text-lg">
                  {leaveRequest.status === "pending" ? (
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
                  ) : (
                    <span>{leaveRequest.status}</span>
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
