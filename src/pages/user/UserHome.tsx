
import Card from '../../components/Card'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'


const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // 清掉登录 token
    toast.success("Logout successful"); // 显示成功提示
    navigate("/login");               // 跳转登录页
  };

  return (
    <div className='bg-bglight min-h-screen w-screen p-6'>

      <div className='flex flex-row justify-between'> 
        <button
            className='bg-accentorange py-1 px-6 rounded-full'
            >Add new post</button>

            <button 
            onClick={handleLogout}
            className='text-red-500 text-lg cursor-pointer'>
                Logout
            </button>
        </div>

        <div className='w-full'>
            <p className='text-center mt-10'>Post List</p>
            
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 mt-6'>
          <Card
            addedDate='2023-10-01'
            title='Sample Post Title'
            body='This is a sample post body. It contains some text to demonstrate the card layout
            and styling.'
            tags={['tag1', 'tag2', 'tag3']}
          />
        </div>

        

    </div>
  )
}

export default Home