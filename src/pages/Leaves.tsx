import { useEffect, useRef, useState } from "react"
import { GiCancel } from "react-icons/gi"
import { SiTicktick } from "react-icons/si"
import toast from "react-hot-toast"
import Leave from "../services/leave"

const Leaves = () => {
  const [leaveBalance, setLeaveBalance] = useState(0)
  const [leaves, setLeaves] = useState([])
  const cancelRef = useRef<HTMLDialogElement>(null)
  const editRef = useRef<HTMLDialogElement>(null)
  const [selectedLeaveId, setSelectedLeaveId] = useState("")
  const [editedLeave, setEditedLeave] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: 0,
  })

  const fetchLeaves = async () => {
    try {
      const response = await Leave.getMyLeaves()
      setLeaves(response.leaves)
    } catch (error: any) {
      toast.error(error.response?.data.message || error.message)
    }
  }
  useEffect(() => {
    fetchLeaves()
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
      await Leave.updateLeave(selectedLeaveId, editedLeave).then(() => {
        toast.success("Leave request updated")
        fetchLeaves()
      })
    } catch (error: any) {
      toast.error(error.response?.data.message || error.message)
    }
  }

  return (
    <div>
      <dialog ref={editRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg  text-center">Edit Leave</h3>
          <form
            onSubmit={e => {
              e.preventDefault()
              handleEdit()
              if (editRef.current) {
                editRef.current.close()
              }
            }}
          >
            <div className="form-control">
              <label className="label">
                start date
                <input
                  type="text"
                  value={editedLeave.firstName}
                  onChange={e =>
                    setEditedLeave({
                      ...editedLeave,
                      firstName: e.target.value,
                    })
                  }
                  className="input input-bordered"
                />
              </label>
            </div>
            <div className="modal-action flex justify-center">
              <button type="submit" className="btn px-10 btn-primary ">
                Save
              </button>
              <button
                className="btn px-10"
                onClick={() => editRef.current?.close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <dialog ref={cancelRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">
            Are you Sure you want to reject this leave request?
          </h3>
          <div className="flex "></div>
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

      <div className="flex justify-between w-full">
        <div>
          <h1 className="text-3xl font-bold w-fit">Leaves</h1>
          <h3>{leaveBalance}</h3>
        </div>
      </div>
      <div className="divider"></div>

      {leaves.length < 1 ? (
        <p className="text-center text-2xl">No Leave Requests found</p>
      ) : (
        <div className="overflow-x-auto">
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Period</th>
                  <th>Reason</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave: any, index: number) => (
                  <tr tabIndex={index} key={index} className="hover">
                    <th>{index + 1}</th>
                    <td>{leave.period}</td>
                    <td>{leave.reason}</td>
                    <td>{leave.status}</td>
                    <td className="flex h-full justify-center gap-3 text-lg">
                      <SiTicktick
                        className="text-green-700"
                        onClick={() => {
                          setSelectedLeaveId(leave.id)
                          if (approveRef.current) {
                            approveRef.current.showModal()
                          }
                        }}
                      />
                      <button>
                        <GiCancel
                          className="text-red-700"
                          onClick={() => {
                            setSelectedLeaveId(user.id)
                            if (rejectRef.current) {
                              rejectRef.current.showModal()
                            }
                          }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Leaves
