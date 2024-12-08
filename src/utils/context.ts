import { createContext } from "react"
type User = {
  name: string
  role: string
  isAuth: boolean
}

interface IContext {
  user: User
  login: (user: User) => void
  logout: () => void
  socket: any
}

const Authcontext = createContext<IContext>({
  user: {
    name: "",
    role: "",
    isAuth: false,
  },
  login: () => {},
  logout: () => {},
  socket: null,
})

export default Authcontext
