import React, { useState, useEffect, useContext } from "react"
import TimesheetService from "../services/timesheet"
import toast from "react-hot-toast"
import Authcontext from "../utils/context"

const ManageTimesheets: React.FC = () => {
  const [entries, setEntries] = useState([])
  const context = useContext(Authcontext)
  const socket = context.socket

  const fetchEntries = async () => {
    try {
      const data = await TimesheetService.getTimesheets()
      setEntries(data)
    } catch (error) {
      toast.error("Failed to load timesheets")
    }
  }

  const handleValidate = async (id: string) => {
    try {
      await TimesheetService.validateTimesheetEntry(id)
      toast.success("Entry validated!")
      socket.emit("timesheet", id)
      fetchEntries()
    } catch (error) {
      toast.error("Failed to validate entry")
    }
  }

  const handleCorrect = async (id: string, hoursperDate: any) => {
    try {
      await TimesheetService.updateTimesheetEntry(id, hoursperDate)
      toast.success("Entry corrected!")
      fetchEntries()
    } catch (error) {
      toast.error("Failed to correct entry")
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  return (
    <div className="p-4 w-full">
      <h1 className="text-3xl mx-auto w-fit font-bold my-10">
        Manage Timesheets
      </h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Hours Worked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry: any) => (
            <tr key={entry.id}>
              <td>
                {entry.user.firstName} {entry.user.lastName}
              </td>
              <td>{entry.date}</td>
              <td>{entry.hours}</td>
              <td className="flex gap-2">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageTimesheets
