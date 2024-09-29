import { useState } from "react"
import { toast } from "react-hot-toast"
import auth from "../services/auth"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      const response = await auth.login(email, password)
      toast.success(response.message)
    } catch (error: any) {
      toast.error(error.response?.data.message || error.message)
    }
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex flex-col items-center text-center w-full lg:w-1/2">
          <img src="hrlogo.png" alt="logo" className="h-72 w-72" />
          <p className="py-6 text-2xl">
            From personal data to performance reviews, manage everything you
            need whether you're an employee or managing HR operations
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
          <form className="card-body !gap-0" onSubmit={handleLogin}>
            <h2 className="text-3xl text-center font-bold mb-6">Sign up</h2>
            <div className="form-control">
              <label className="label !pb-[0.25rem]">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label !pb-[0.25rem]">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <label className="label !pb-[0.25rem]">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
