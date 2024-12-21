import { useEffect, useState } from "react"
import register from "../services/register"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const useSignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    localStorage.getItem("token") && navigate("/")
  })

  const handleSignup = async (e: any) => {
    e.preventDefault()
    try {
      const response = await register.createUser(
        firstName,
        lastName,
        phone,
        email,
        password
      )
      toast.success(response.message)
      navigate("/login")
    } catch (error: any) {
      toast.error(error.response?.data.message || error.message)
    }
  }
  return {
    email,
    setEmail,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    handleSignup,
  }
}
