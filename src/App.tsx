
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/auth/Login'
import Register from "./pages/auth/Register";
import Home from "./pages/user/UserHome";
import AdminHome from "./pages/admin/AdminHome";
import { Toaster } from "react-hot-toast";


function App() {
 
  return (
    <>
     <Toaster position="top-right" reverseOrder={false} />
     <BrowserRouter>
      <Routes>
       
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home/>} />
        <Route path='/admin' element={<AdminHome/>} />
        
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
