import { useEffect, useRef, useState } from "react"
import user from "../services/users"
import { AiTwotoneEdit } from "react-icons/ai"
import { IoTrashOutline } from "react-icons/io5"
import toast from "react-hot-toast"
const Users = () => {
  const deleteRef = useRef<HTMLDialogElement>(null)
  const editRef = useRef<HTMLDialogElement>(null)
  const makeHRRef = useRef<HTMLDialogElement>(null)
  const makeEmployeeRef = useRef<HTMLDialogElement>(null)
  const [employees, setEmployees] = useState([])
  const [HRs, setHRs] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [filteredHRs, setFilteredHRs] = useState([])
  const [editedUser, setEditedUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: 0,
  })
  const [makeHRId, setMakeHRId] = useState("")
  const [makeEmployeeId, setMakeEmployeeId] = useState("")
  const [deleteId, setDeleteId] = useState("")
  const fetchEmployees = async () => {
    try {
      const response = await user.getEmployees()
      setEmployees(response.data)
      setFilteredEmployees(response.data)
    } catch (error: any) {
      console.log(error.response?.data.message || error.message)
    }
  }

  const fetchHRs = async () => {
    try {
      const response = await user.getHR()
      setHRs(response.data)
      setFilteredHRs(response.data)
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
      toast.success("User deleted successfully")
      fetchEmployees()
      fetchHRs()
    } catch (error: any) {
      toast.error(error.response?.data.message || error.message)
    }
  }

  const handleEdit = async () => {
    try {
      await user.updateUser(editedUser)
      toast.success("User updated successfully")
      fetchEmployees()
      fetchHRs()
    } catch (error: any) {
      toast.error(error.response?.data.message || error.message)
    }
  }

  const handleMakeHR = async () => {
    try {
      await user.makeHR(makeHRId)
      toast.success("User made HR successfully")
      fetchEmployees()
      fetchHRs()
    } catch (error: any) {
      toast.error(error.response?.data.message || error.message)
    }
  }

  const hendleMakeEmployee = async () => {
    try {
      await user.makeEmployee(makeEmployeeId)
      toast.success("User made Employee successfully")
      fetchEmployees()
      fetchHRs()
    } catch (error: any) {
      toast.error(error.response?.data.message || error.message)
    }
  }
  const [filterData, setFilterData] = useState({
    stringFilter: "",
    phoneFilter: "",
  })

  const handleFilter = () => {
    const { stringFilter, phoneFilter } = filterData
    const filterUsers = (list: any) =>
      list.filter(
        (user: any) =>
          (stringFilter === "" ||
            [user.firstName, user.lastName, user.email].some(field =>
              field.includes(stringFilter)
            )) &&
          (phoneFilter === "" || user.phone.includes(phoneFilter))
      )
    setFilteredEmployees(filterUsers(employees))
    setFilteredHRs(filterUsers(HRs))
  }

  useEffect(() => {
    handleFilter()
  }, [filterData, employees, HRs])

  return (
    <div className="px-10 py-10 h-full w-full flex flex-col gap-5">
      <dialog ref={editRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg  text-center">Edit User</h3>
          <div>
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
            <div className="modal-action flex justify-center">
              <button
                onClick={e => {
                  e.preventDefault()
                  handleEdit()
                  if (editRef.current) {
                    editRef.current.close()
                  }
                }}
                type="submit"
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
      <dialog
        ref={makeEmployeeRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">
            Are you Sure you want to make this user an Employee?
          </h3>

          <div className="modal-action flex justify-center">
            <button
              className="btn btn-primary px-10"
              onClick={() => {
                hendleMakeEmployee()
                if (makeEmployeeRef.current) {
                  makeEmployeeRef.current.close()
                }
              }}
            >
              Yes
            </button>
            <button
              className="btn px-10"
              onClick={() => makeEmployeeRef.current?.close()}
            >
              No
            </button>
          </div>
        </div>
      </dialog>
      <dialog ref={makeHRRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">
            Are you Sure you want to make this user an HR?
          </h3>

          <div className="modal-action flex justify-center">
            <button
              className="btn px-10 btn-primary"
              onClick={() => {
                handleMakeHR()
                if (makeHRRef.current) {
                  makeHRRef.current.close()
                }
              }}
            >
              Yes
            </button>
            <button
              className="btn px-10"
              onClick={() => makeHRRef.current?.close()}
            >
              No
            </button>
          </div>
        </div>
      </dialog>
      <dialog ref={deleteRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">
            Are you Sure you want to delete this user?
          </h3>

          <div className="modal-action flex justify-center gap-5">
            <button
              className="btn px-10 btn-primary"
              onClick={() => {
                handleDelete()
                if (deleteRef.current) {
                  deleteRef.current.close()
                }
              }}
            >
              Yes
            </button>
            <button
              className="btn
              px-10"
              onClick={() => deleteRef.current?.close()}
            >
              No
            </button>
          </div>
        </div>
      </dialog>
      <div className="flex items-center gap-5">
        name, email
        <input
          type="text"
          value={filterData.stringFilter}
          onChange={e =>
            setFilterData({
              ...filterData,
              stringFilter: e.target.value,
            })
          }
          className="input input-bordered"
        />
        phone
        <input
          value={filterData.phoneFilter}
          onChange={e =>
            setFilterData({
              ...filterData,
              phoneFilter: e.target.value,
            })
          }
          className="input input-bordered"
        />
        <button
          className="btn btn-ghost px-10"
          onClick={() =>
            setFilterData({
              stringFilter: "",
              phoneFilter: "",
            })
          }
        >
          Reset
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-10 text-center">HRs</h1>
      {HRs.length < 1 ? (
        <p className="text-center text-2xl">No HRs found</p>
      ) : (
        <table className="table table-zebra">
          <thead className="bg-primary-content text-primary">
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
            {(filteredHRs.length < 1 ? filteredHRs : HRs).map(
              (user: any, index: number) => (
                <tr tabIndex={index} key={index} className="hover">
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
              )
            )}
          </tbody>
        </table>
      )}
      <div className="border-b-[1px] my-6"></div>
      <h1 className="text-3xl mb-10 font-bold text-center">Employees</h1>
      {employees.length < 1 ? (
        <p className="text-center text-2xl">No Employees found</p>
      ) : (
        <table className="table table-zebra">
          <thead className="bg-primary-content text-primary">
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
            {filteredEmployees.map((user: any, index: number) => (
              <tr tabIndex={index} key={index} className="hover">
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
      )}
    </div>
  )
}

export default Users
