import client from "../utils/axios"

const TimesheetService = {
  async getTimesheets() {
    try {
      const response = await client().get("/timesheets")
      return response.data.timesheets
    } catch (error) {
      throw error
    }
  },

  async getMyTimesheets() {
    try {
      const response = await client().get("/timesheets/my")
      return response.data.timesheets
    } catch (error) {
      throw error
    }
  },

  async createTimesheetEntry(date: string, hours: number) {
    try {
      const response = await client().post("/timesheets/create", {
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
      const response = await client().put(`/timesheets/edit/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async validateTimesheetEntry(id: string) {
    try {
      const response = await client().put(`/timesheets/validate/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default TimesheetService
