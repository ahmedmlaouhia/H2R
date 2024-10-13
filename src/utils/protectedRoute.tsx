import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface ProtectedRouteProps {
  children: JSX.Element
  allowedRoles: string[]
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const navigate = useNavigate()
  const isAuthenticated = !!localStorage.getItem("token")
  const userRole = localStorage.getItem("role")
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
    if (userRole && !allowedRoles.includes(userRole)) {
      navigate("/unauthorized")
    }
  }, [isAuthenticated, navigate])
  return children
}

export default ProtectedRoute
