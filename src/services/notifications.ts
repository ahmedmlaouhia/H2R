import client from "../utils/axios"

const Notifications = {
  async getNotifications() {
    try {
      const response = await client().get("/notifications")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async markAsRead(id: string) {
    try {
      const response = await client().put(`/notification/markasread/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default Notifications
