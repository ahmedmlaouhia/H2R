import axios from "axios"
const client = () =>
  axios.create({
    baseURL: "/api",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
  })

export default client
