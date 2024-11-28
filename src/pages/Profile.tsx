import { useState, useEffect } from "react"
import User from "../services/users"
import toast from "react-hot-toast"

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    role: "",
    phone: "",
    email: "",
  })

  const [editedUser, setEditedUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  })

  const [isEditing, setIsEditing] = useState(false)

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const fetchUserData = async () => {
    try {
      const userData = await User.getMe()
      setUser({
        firstName: userData.data.firstName,
        lastName: userData.data.lastName,
        phone: userData.data.phone,
        email: userData.data.email,
        role: userData.data.role,
      })
    } catch (error: any) {
      toast.error("Failed to load user data.")
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const handleUpdate = async () => {
    try {
      console.log(editedUser)
      await User.updateUser(editedUser)
      toast.success("Profile updated successfully!")
      setUser(prev => ({ ...prev, ...editedUser }))
      setIsEditing(false)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwords
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required.")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.")
      return
    }

    try {
      await User.changePassword({ oldPassword, newPassword })
      toast.success("Password changed successfully!")
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" })
      setIsChangingPassword(false)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className=" w-full">
      <h1 className="text-3xl font-bold text-center my-10">My Profile</h1>
      <div className="flex flex-col items-center lg:items-start lg:flex-row justify-evenly">
        <div className="xl:w-1/3 lg:w-2/5 md:w-4/5 w-full flex flex-col p-5 gap-5">
          {isEditing && (
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
          )}
          <div className="flex w-full items-center justify-between">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={editedUser.firstName}
                onChange={e =>
                  setEditedUser({ ...editedUser, firstName: e.target.value })
                }
                className="input input-bordered"
              />
            ) : (
              <p className="font-bold">{user.firstName}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={editedUser.lastName}
                onChange={e =>
                  setEditedUser({ ...editedUser, lastName: e.target.value })
                }
                className="input input-bordered"
              />
            ) : (
              <p className="font-bold">{user.lastName}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={editedUser.phone}
                onChange={e =>
                  setEditedUser({ ...editedUser, phone: e.target.value })
                }
                className="input input-bordered"
              />
            ) : (
              <p className="font-bold">{user.phone}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={e =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
                className="input input-bordered"
              />
            ) : (
              <p className="font-bold">{user.email}</p>
            )}
          </div>

          <div className="flex w-full items-center justify-between">
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <p className="font-bold">{user.role}</p>
          </div>
          <div className="w-full flex justify-center gap-10">
            {!isEditing ? (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsEditing(true)
                  setEditedUser({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                    email: user.email,
                  })
                }}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  className="btn btn-secondary mr-4"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleUpdate}>
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>
        <div className="xl:w-1/3 lg:w-2/5 md:w-4/5 w-full p-5 flex justify-center">
          {isChangingPassword ? (
            <div>
              <h2 className="text-xl font-bold mb-4">Change Password</h2>
              <div className="form-control mb-4">
                <label className="label">Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={e =>
                    setPasswords({ ...passwords, oldPassword: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={e =>
                    setPasswords({ ...passwords, newPassword: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={e =>
                    setPasswords({
                      ...passwords,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex justify-center gap-10">
                <button
                  className="btn btn-secondary mr-4"
                  onClick={() => setIsChangingPassword(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleChangePassword}
                >
                  Change Password
                </button>
              </div>
            </div>
          ) : (
            <button
              className="btn btn-primary "
              onClick={() => setIsChangingPassword(true)}
            >
              Change Password
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
