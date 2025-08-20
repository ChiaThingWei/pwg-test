
import api from "./account"

export type RegisterUser = {
    username: string
    email: string
    password: string
    role: string
  }

export const registerUser = async (data: RegisterUser) => {
  const res = await api.post("/account/register", data)
  return res.data
}

  

  