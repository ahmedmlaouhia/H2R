import client from "../utils/axios"

const Leave = {
  async getLeaves() {
    try {
      const response = await client().get("http://localhost:3000/leave")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getMyLeaves() {
    try {
      const response = await client().get("http://localhost:3000/leave/my")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getMyLeaveBalance() {
    try {
      const response = await client().get("http://localhost:3000/user/leave/balance")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async createLeave(startDate: string, endDate: string, reason: string) {
    try {
      const response = await client().post("http://localhost:3000/leave/create", {
        startDate,
        endDate,
        reason,
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async cancelLeave(id: string) {
    try {
      const response = await client().put(`http://localhost:3000/leave/cancel/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async updateLeave(data: any) {
    try {
      const response = await client().put(`http://localhost:3000/leave/edit/${data.id}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async approveLeave(id: string) {
    try {
      await client().put(`http://localhost:3000/leave/approve/${id}`)
    } catch (error) {
      throw error
    }
  },

  async rejectLeave(id: string) {
    try {
      const response = await client().put(`http://localhost:3000/leave/reject/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default Leave
