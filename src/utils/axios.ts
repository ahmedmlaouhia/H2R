import axios from "axios"
import "dotenv/config"
const client = axios.create({
  baseURL: process.env.VITE_APP_API,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
})

export default client
