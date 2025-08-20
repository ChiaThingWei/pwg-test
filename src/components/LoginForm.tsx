import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../lib/hooks/useAccountMutation";
import type { LoginResponse } from "../lib/api/Account";
import type { AxiosError } from "axios";
import { Check } from "lucide-react";
import { CircleX } from "lucide-react";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  username: string
  email: string
  userId: number
  role: "admin" | "user"
}

interface ErrorResponse {
    message: string;
  }

  

const LoginForm = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState<"success" | "error" | null>(null)
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const mutation = useLoginMutation({
        onSuccess: (data: LoginResponse) => {
          localStorage.setItem("token", data.token);
          setShowPopup(true);
        setPopupType("success");
        console.log( data);

       
        const payload = jwtDecode<TokenPayload>(data.token)
        console.log(payload.role)
          
        setTimeout(() => {
            setShowPopup(false);
            
            if (payload.role === "admin") {
              navigate("/admin")
            } else {
              navigate("/")
            }
          }, 1500);

        },
        onError: (error: AxiosError<ErrorResponse>) => {
            console.log(error.response?.data?.message);
            console.log('log in fail')
            setShowPopup(true);
            setPopupType("error");
        },
      });

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!formData.email || !formData.password) {
          alert("All fields are required");
          return;
        }
        if (formData.password.length < 6) {
          alert("Password must be at least 6 characters");
          return;
        }
    
        mutation.mutate(formData);
      }

    const  handleNavigate =() => {
        navigate("/register");  
    }

  return (
    <div className='w-2/3 md:w-1/3 bg-whitepure rounded-lg p-10 flex flex-col'>
        <p className='text-3xl  text-center text-black'>Login Page</p>

        <form 
        onSubmit={handleSubmit}
        className='flex flex-col mt-4'>
            <label>Email</label>
            <input 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className='border rounded-full px-2 border-accentorange py-1 mb-4' placeholder='' />

            <label>Password</label>
            <input type="password" 
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className='border px-2 border-accentorange rounded-full py-1 mb-4' placeholder='' />

            <button type="submit" className='bg-accentorange text-black rounded-full py-1 hover:text-white transition-colors duration-300 cursor-pointer'>Login</button>
        </form>

        <button
        onClick={handleNavigate}
        className='text-accentorange text-lg mt-4 cursor-pointer hover:text-black transition-colors duration-300'
        >Create an account</button>


    {/* {'popup window'} */}
    {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-whitepure flex flex-col justify-center p-6 rounded-lg shadow-lg w-2/3 lg:w-1/3 text-center">
            {popupType === "success" ? (
              <>
              <div className="bg-green-400 mx-auto p-1 rounded-full w-10 h-10 flex items-center justify-center">
                    <Check className="text-white" />
                    </div>
                <h2 className="text-xl font-semibold my-4 text-black">
                Successfully login
                </h2>
              </>
            ) : (
              <>
                 <div className=" text-red-500 mx-auto rounded-full  flex items-center justify-center">
                <CircleX className="size-10"/>
               </div>
                <p className="text-black my-6">Invalid credentials</p>
                <button
              onClick={() => setShowPopup(false)}
              className="bg-accentorange text-black w-1/2 mx-auto rounded-full py-2 px-4 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Ok
            </button>
              </>
            )}

            
          </div>
        </div>
      )}

    </div>
  )
}

export default LoginForm