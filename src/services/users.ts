import client from "../utils/axios"

const User = {
  async getEmployees() {
    try {
      const response = await client.get("/user/employees")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getHR() {
    try {
      const response = await client.get("/user/hr")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getUserById(id: string) {
    try {
      const response = await client.get(`/user/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async createUser(
    firstName: string,
    lastName: string,
    phone: Number,
    email: string,
    password: string
  ) {
    try {
      const response = await client.post("/user/create", {
        firstName,
        lastName,
        phone,
        email,
        password,
      })
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default User
