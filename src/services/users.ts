import client from "../utils/axios"

const User = {
  async getEmployees() {
    try {
      const response = await client().get("http://localhost:3000/user/employees")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getHR() {
    try {
      const response = await client().get("http://localhost:3000/user/hr")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async makeHR(id: string) {
    try {
      const response = await client().put(`http://localhost:3000/user/makehr/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async makeEmployee(id: string) {
    try {
      const response = await client().put(`http://localhost:3000/user/makeEmployee/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getMe() {
    try {
      const response = await client().get(`http://localhost:3000/user/me`)
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
      const response = await client().post("http://localhost:3000/user/create", {
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

  async updateUser(user: any) {
    try {
      const response = await client().put(`http://localhost:3000/user/updateProfile`, user)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async changePassword(passwords: any) {
    try {
      const response = await client().put(`http://localhost:3000/user/updatePassword`, passwords)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async deleteUser(id: string) {
    try {
      const response = await client().delete(`http://localhost:3000/user/delete/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default User
