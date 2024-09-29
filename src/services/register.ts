import client from "../utils/axios"

const register = {
  async createUser(
    firstName: string,
    lastName: string,
    phone: Number,
    email: string,
    password: string
  ) {
    try {
      const response = await client.post("/register", {
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
