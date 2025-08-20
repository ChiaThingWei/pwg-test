import axios from "axios";

const api = axios.create({
  baseURL: "https://api-for-testing-gujp.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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

export type Account = {
  userId: number
  username: string
  email: string
  role: "admin" | "user"
}

export const registerUser = async (data: RegisterUser) => {
const res = await api.post("/account/register", data)
return res.data
}

export const getAllAccountsApi = async (): Promise<Account[]> => {
  const response = await api.get("/accounts") 
  return response.data.accounts
}




export default api;
