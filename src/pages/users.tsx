import { useEffect, useRef, useState } from "react"
import user from "../services/users"
import { AiTwotoneEdit } from "react-icons/ai"
import { IoTrashOutline } from "react-icons/io5"

const Users = () => {
  const deleteRef = useRef<HTMLDialogElement | null>(null)
  const editRef = useRef<HTMLDialogElement | null>(null)
  const makeHRRef = useRef<HTMLDialogElement | null>(null)
  const makeEmployeeRef = useRef<HTMLDialogElement | null>(null)

  const [employees, setEmployees] = useState([])
  const [editedUser, setEditedUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: 0,
  })
  const [HRs, setHRs] = useState([])
  const [makeHRId, setMakeHRId] = useState("")
  const [makeEmployeeId, setMakeEmployeeId] = useState("")
  const [deleteId, setDeleteId] = useState("")
  const fetchEmployees = async () => {
    try {
      const response = await user.getEmployees()
      setEmployees(response.data)
    } catch (error: any) {
      console.log(error.response?.data.message || error.message)
    }
  }

  const fetchHRs = async () => {
    try {
      const response = await user.getHR()
      setHRs(response.data)
    } catch (error: any) {
      console.log(error.response?.data.message || error.message)
    }
  }

  useEffect(() => {
    fetchEmployees()
    fetchHRs()
  }, [])

  const handleDelete = async () => {
    try {
      await user.deleteUser(deleteId)
      fetchEmployees()
      fetchHRs()
    } catch (error: any) {
      console.log(error.response?.data.message || error.message)
    }
  }

  const handleEdit = async () => {
    try {
      await user.updateUser(editedUser)
      fetchEmployees()
      fetchHRs()
    } catch (error: any) {
      console.log(error.response?.data.message || error.message)
    }
  }

  const handleMakeHR = async () => {
    try {
      await user.makeHR(makeHRId)
      fetchEmployees()
      fetchHRs()
    } catch (error: any) {
      console.log(error.response?.data.message || error.message)
    }
  }

  const hendleMakeEmployee = async () => {
    try {
      await user.makeEmployee(makeEmployeeId)
      fetchEmployees()
      fetchHRs()
    } catch (error: any) {
      console.log(error.response?.data.message || error.message)
    }
  }

  return (
    <div className="px-20 py-10 flex flex-col gap-5">
      <dialog ref={editRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit User</h3>
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
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered"
                required
                value={editedUser.firstName}
                onChange={e =>
                  setEditedUser({ ...editedUser, firstName: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered"
                required
                value={editedUser.lastName}
                onChange={e =>
                  setEditedUser({ ...editedUser, lastName: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                required
                value={editedUser.email}
                onChange={e =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="number"
                placeholder="Phone Number"
                className="input input-bordered"
                required
                value={editedUser.phone}
                onChange={e =>
                  setEditedUser({
                    ...editedUser,
                    phone: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <form method="dialog">
                <button className="btn">Cancel</button>
              </form>
            </div>
          </form>
        </div>
      </dialog>
      <dialog
        ref={makeEmployeeRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you Sure you want to make this user an Employee?
          </h3>

          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={() => {
                hendleMakeEmployee()
                if (makeEmployeeRef.current) {
                  makeEmployeeRef.current.close()
                }
              }}
            >
              Yes
            </button>
            <form method="dialog">
              <button className="btn">No</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog ref={makeHRRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you Sure you want to make this user an HR?
          </h3>

          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleMakeHR()
                if (makeHRRef.current) {
                  makeHRRef.current.close()
                }
              }}
            >
              Yes
            </button>
            <form method="dialog">
              <button className="btn">No</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog ref={deleteRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you Sure you want to delete this user?
          </h3>

          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleDelete()
                if (deleteRef.current) {
                  deleteRef.current.close()
                }
              }}
            >
              Yes
            </button>
            <form method="dialog">
              <button className="btn">No</button>
            </form>
          </div>
        </div>
      </dialog>
      <h1 className="text-3xl font-bold text-center">HRs</h1>
      {HRs.length < 1 ? (
        <p className="text-center text-2xl">No HRs found</p>
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
                  <th>Phone Number</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {HRs.map((user: any, index: number) => (
                  <tr tabIndex={index} className="hover">
                    <th>{index + 1}</th>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td className="flex h-full justify-center gap-3 text-lg">
                      <button
                        className="text-green-700"
                        onClick={() => {
                          setEditedUser({
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            phone: user.phone,
                          })
                          if (editRef.current) {
                            editRef.current.showModal()
                          }
                        }}
                      >
                        <AiTwotoneEdit />
                      </button>
                      <button>
                        <IoTrashOutline
                          className="text-red-700"
                          onClick={() => {
                            setDeleteId(user.id)
                            if (deleteRef.current) {
                              deleteRef.current.showModal()
                            }
                          }}
                        />
                      </button>
                      <button
                        onClick={() => {
                          setMakeEmployeeId(user.id)
                          if (makeEmployeeRef.current) {
                            makeEmployeeRef.current.showModal()
                          }
                        }}
                      >
                        <span>Make Employee</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="divider"></div>
      <h1 className="text-3xl font-bold text-center">Employees</h1>
      {employees.length < 1 ? (
        <p className="text-center text-2xl">No Employees found</p>
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
                  <th>Phone Number</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((user: any, index: number) => (
                  <tr tabIndex={index} className="hover">
                    <th>{index + 1}</th>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td className="flex h-full justify-center gap-3 text-lg">
                      <button
                        className="text-green-700"
                        onClick={() => {
                          setEditedUser({
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            phone: user.phone,
                          })
                          if (editRef.current) {
                            editRef.current.showModal()
                          }
                        }}
                      >
                        <AiTwotoneEdit />
                      </button>
                      <button>
                        <IoTrashOutline
                          className="text-red-700"
                          onClick={() => {
                            setDeleteId(user.id)
                            if (deleteRef.current) {
                              deleteRef.current.showModal()
                            }
                          }}
                        />
                      </button>
                      <button
                        onClick={() => {
                          setMakeHRId(user.id)
                          if (makeHRRef.current) {
                            makeHRRef.current.showModal()
                          }
                        }}
                      >
                        <span>Make HR</span>
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

export default Users
