import axios from "axios";

const api = axios.create({
  baseURL: "https://api-for-testing-gujp.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: number
  username: string
  token: string
  message: string
  role?: string   
}

export const loginApi = (data: LoginParams) =>
  api.post<LoginResponse>("/account/login", data).then(res => res.data);


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



export default api;
