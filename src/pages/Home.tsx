import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    localStorage.getItem("token") || navigate("/login")
  })
  return <div className="px-20 py-10">home</div>
}

export default Home
