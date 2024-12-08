import React, { useState, useEffect } from "react"
import TimesheetService from "../services/timesheet"
import toast from "react-hot-toast"

const ManageTimesheets: React.FC = () => {
  const [entries, setEntries] = useState([])

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Timesheets</h1>
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
              <td>{entry.employeeName}</td>
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
