import { useState, useEffect } from "react"
import TimesheetService from "../services/timesheet"
import toast from "react-hot-toast"
import { AiTwotoneEdit } from "react-icons/ai"

const Timesheet = () => {
  const [entries, setEntries] = useState([])
  const [form, setForm] = useState({ date: "", hours: "", id: null }) // Unified form state

  const fetchEntries = async () => {
    try {
      const data = await TimesheetService.getMyTimesheets()
      setEntries(data)
    } catch (error) {
      toast.error("Failed to load timesheets")
    }
  }

  const resetForm = () => {
    setForm({ date: "", hours: "", id: null })
  }

  const handleFormSubmit = async () => {
    try {
      if (form.id) {
        await TimesheetService.updateTimesheetEntry(form.id, {
          date: form.date,
          hours: Number(form.hours),
        })
        toast.success("Timesheet entry updated!")
      } else {
        await TimesheetService.createTimesheetEntry(
          form.date,
          Number(form.hours)
        )
        toast.success("Timesheet entry added!")
      }
      resetForm()
      fetchEntries()
    } catch (error) {
      toast.error("Failed to save timesheet entry")
    }
  }

  const handleEdit = (entry: any) => {
    setForm({ date: entry.date, hours: entry.hours, id: entry.id })
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">My Timesheet</h1>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex gap-4 items-center">
          <input
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            className="input input-bordered"
          />
          <input
            type="number"
            placeholder="Hours worked"
            value={form.hours}
            onChange={e => setForm({ ...form, hours: e.target.value })}
            className="input input-bordered"
          />
          <button
            onClick={handleFormSubmit}
            className="btn btn-primary"
            disabled={!form.date || !form.hours}
          >
            {form.id ? "Update Entry" : "Add Entry"}
          </button>
          {form.id && (
            <button onClick={resetForm} className="btn btn-secondary">
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      {entries.length < 1 ? (
        <p className="text-center text-2xl">No Entries Found</p>
      ) : (
        <table className="table table-zebra w-full">
          <thead className="bg-primary-content text-primary">
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Hours Worked</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry: any, index: number) => (
              <tr key={entry.id} className="hover">
                <th>{index + 1}</th>
                <td>{entry.date}</td>
                <td>{entry.hours}</td>
                <td className="flex justify-center gap-3 text-lg">
                  <button
                    className="tooltip"
                    data-tip="Edit"
                    onClick={() => handleEdit(entry)}
                  >
                    <AiTwotoneEdit className="text-green-700" />
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

export default Timesheet
