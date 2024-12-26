import client from "../utils/axios"

const TimesheetService = {
  async getTimesheets() {
    try {
      const response = await client().get("http://localhost:3000/timesheets")
      return response.data.timesheets
    } catch (error) {
      throw error
    }
  },

  async getMyTimesheets() {
    try {
      const response = await client().get("http://localhost:3000/timesheets/my")
      return response.data.timesheets
    } catch (error) {
      throw error
    }
  },

  async createTimesheetEntry(date: string, hours: number) {
    try {
      const response = await client().post("http://localhost:3000/timesheets/create", {
        date,
        hours,
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async updateTimesheetEntry(
    id: string,
    data: { date: string; hours: number }
  ) {
    try {
      const response = await client().put(`http://localhost:3000/timesheets/edit/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async validateTimesheetEntry(id: string) {
    try {
      const response = await client().put(`http://localhost:3000/timesheets/validate/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default TimesheetService
