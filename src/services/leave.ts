import client from "../utils/axios"

const Leave = {
  async getLeaves() {
    try {
      const response = await client().get("/leave")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getMyLeaves() {
    try {
      const response = await client().get("/leave/my")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getMyLeaveBalance() {
    try {
      const response = await client().get("user/leave/balance")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async createLeave(startDate: string, endDate: string, reason: string) {
    try {
      const response = await client().post("/leave/create", {
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
      const response = await client().delete(`/leave/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async updateLeave(id: string, data: any) {
    try {
      const response = await client().put(`/leave/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async approveLeave(id: string) {
    try {
      await client().put(`/leave/approve/${id}`)
    } catch (error) {
      throw error
    }
  },

  async rejectLeave(id: string) {
    try {
      const response = await client().put(`/leave/reject/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default Leave
