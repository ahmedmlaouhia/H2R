import { useEffect, useState } from "react"
import user from "../services/users"

const Users = () => {
  const [employees, setEmployees] = useState([])
  const fetchEmployees = async () => {
    try {
      const response = await user.getEmployees()
      setEmployees(response.data)
    } catch (error: any) {
      console.log(error.response?.data.message || error.message)
    }
  }
  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <div className="overflow-x-auto">
        {employees.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Leave balance</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((user: any, index: number) => (
                <tr tabIndex={index} className="hover">
                  <th>{index}</th>
                  <td>{user.firstName + user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.leaveBalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Users
