import { useState } from 'react'
import { useRegisterMutation } from '../lib/hooks/useAccountMutation'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import toast from 'react-hot-toast'


const RegisterForm = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: ""
  })

    const [showPopup, setShowPopup] = useState(false)
    const registerMutation = useRegisterMutation({
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        setShowPopup(true);
          
        setTimeout(() => {
            setShowPopup(false);
            navigate("/");
          }, 1500);
      },
      onError: (error) => {
        toast.error('Registration failed: ' + error.response?.data?.message || 'An error occurred')
      },
    })

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
    }
  
    const handleRegister = (e: React.FormEvent) => {
      e.preventDefault()
      registerMutation.mutate(formData) // 这里把 formData 传给 API
    }

    const handleNavigate = () => {
      navigate("/login")
    }

  return (
    <div className='w-2/3 lg:w-1/3 bg-whitepure rounded-lg p-10 flex flex-col'>
        <p className="text-xl text-black text-center">
            Register User
        </p>

        <form 
        onSubmit={handleRegister}
        className="flex flex-col mt-4">

            <label>Username</label>
            <input 
            type="text" 
            name='username'
            value={formData.username}
            className='border rounded-full px-2 border-accentorange py-1 mb-4'
            onChange={handleChange}/>

            <label>Email</label>
            <input 
            type="email"
            name='email'
            value={formData.email}
             className='border rounded-full px-2 border-accentorange py-1 mb-4' 
             onChange={handleChange} />

            <label>Password</label>
            <input 
            type="password" 
            name='password'
            value={formData.password}
            className='border border-accentorange rounded-full  py-1 mb-4' 
            onChange={handleChange} />

            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border border-accentorange rounded-full py-1 mb-4 px-2"
            >
              <option value="">-- Select Role --</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit" className='bg-accentorange hover:text-white transition-colors duration-300 cursor-pointer text-black rounded-full py-1  mt-4'>
              Register</button>

        </form>

        <button 
        onClick={handleNavigate}
        className="mt-6 text-accentorange cursor-pointer text-xl">Back to Login Page</button>
        
        
    {showPopup && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-whitepure flex flex-col justify-center p-6 rounded-lg shadow-lg w-2/3 lg:w-1/3 text-center">
        <div className="bg-green-400 mx-auto p-1 rounded-full w-10 h-10 flex items-center justify-center">
          <Check className="text-white" />
        </div>
        <h2 className="text-xl font-semibold my-4 text-black">
         Account registered successfully
        </h2>
      </div>
      </div>
    )}
   
            
          
     
     

    </div>
  )
}

export default RegisterForm