import React, { useState, useEffect } from "react"
import TimesheetService from "../services/timesheet"
import toast from "react-hot-toast"

const ManageTimesheets: React.FC = () => {
  const [entries, setEntries] = useState([])
  const [filteredEntries, setFilteredEntries] = useState([])
  const [filter, setFilter] = useState({
    user: "",
    month: "",
    status: "",
  })
  const [users, setUsers] = useState([])

  const fetchEntries = async () => {
    try {
      const data = await TimesheetService.getTimesheets()
      setEntries(data)
      setUsers(data.map((entry: any) => entry.user))
    } catch (error) {
      toast.error("Failed to load timesheets")
    }
  }

  const handleValidate = async (id: string) => {
    try {
      await TimesheetService.validateTimesheetEntry(id)
      toast.success("Entry validated!")
      fetchEntries()
    } catch (error) {
      toast.error("Failed to validate entry")
    }
  }

  const handleCorrect = async (id: string, hoursPerDate: any) => {
    try {
      await TimesheetService.updateTimesheetEntry(id, hoursPerDate)
      toast.success("Entry corrected!")
      fetchEntries()
    } catch (error) {
      toast.error("Failed to correct entry")
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  const applyFilters = () => {
    const { user, month, status } = filter
    const filtered = entries.filter((entry: any) => {
      const entryMonth = new Date(entry.date).getMonth() + 1 // Convert date to month (0-indexed)
      const matchesUser = user ? entry.user.id === user : true
      const matchesMonth = month ? entryMonth === parseInt(month) : true
      const matchesStatus = status ? entry.status === status : true

      return matchesUser && matchesMonth && matchesStatus
    })
    setFilteredEntries(filtered)
  }

  useEffect(() => {
    applyFilters()
  }, [filter, entries])

  return (
    <div className="p-4 w-full">
      <h1 className="text-3xl text-center font-bold my-10">
        Manage Timesheets
      </h1>

      {/* Filter Section */}
      <div className="flex justify-between w-full mb-5">
        <div className="flex gap-5">
          <label className="label">User</label>
          <select
            className="select select-bordered"
            value={filter.user}
            onChange={e => setFilter({ ...filter, user: e.target.value })}
          >
            <option value="">All</option>
            {users.map((user: any) => (
              <option key={user.id} value={user.id}>
                {user.firstName + " " + user.lastName}
              </option>
            ))}
          </select>

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
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
          </select>

          <button
            className="btn btn-ghost px-10"
            onClick={() => setFilter({ user: "", month: "", status: "" })}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Timesheet Table */}
      {filteredEntries.length < 1 ? (
        <p className="text-center text-2xl">No Timesheet Entries found</p>
      ) : (
        <table className="table table-zebra w-full">
          <thead className="bg-primary-content text-primary">
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Hours Worked</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry: any) => (
              <tr key={entry.id}>
                <td>{entry.user.firstName + " " + entry.user.lastName}</td>
                <td>{entry.date}</td>
                <td>{entry.hours}</td>
                <td className="font-semibold">
                  {entry.status === "Approved" ? (
                    <span className="text-green-600">Approved</span>
                  ) : (
                    <span className="!text-blue-700">Pending</span>
                  )}
                </td>
                {entry.status === "Pending" && (
                  <td className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleValidate(entry.id)}
                      className="btn btn-sm btn-success"
                    >
                      Validate
                    </button>
                    <button
                      onClick={() => {
                        const correctedHours = prompt(
                          "Enter correct hours:",
                          entry.hours
                        )
                        if (correctedHours) {
                          handleCorrect(entry.id, {
                            date: entry.date,
                            hours: correctedHours,
                          })
                        }
                      }}
                      className="btn btn-sm btn-warning"
                    >
                      Correct
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ManageTimesheets
