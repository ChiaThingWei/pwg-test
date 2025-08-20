
import { Card } from '../../components/Card'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import AddPostForm from '../../components/AddPostForm'
import {  useMyPostStore, usePostStore } from '../../lib/store/usePostStore'
import { useAccountStore } from '../../lib/store/useAccountStore'
import { deletePostApi, editPostApi } from '../../lib/api/post'
import EditForm from '../../components/EditForm'
import type { PostPayload } from '../../lib/api/post'
import CardDetail from '../../components/CardDetail'



const AdminHome = () => {

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editPost, setEditPost] = useState<PostPayload | null>(null)
  const { totalAccounts, fetchAccounts } = useAccountStore()
  const [selectedPost, setSelectedPost] = useState<PostPayload | null>(null)

  const navigate = useNavigate();

  const { posts, loading, error, page,totalPost, limit,totalPages, setPage, fetchPosts } = usePostStore()
  const{totalPost:mytotal, fetchPosts:fetchMine} = useMyPostStore()


  useEffect(() => {
    void fetchAccounts()
  }, [fetchAccounts])

  useEffect(() => {
   void fetchPosts(page,limit)
   void fetchMine(page,limit)
  }, [page,limit,fetchPosts,fetchMine])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    toast.success("Logout successful");
    navigate("/login");           
  };

  const handleDelete = async (postId: number) => {
    try {
      await deletePostApi(postId)
      toast.success("Post deleted successfully!")
      void fetchPosts(page, limit) 
    } catch (err) {
      toast.error("Failed to delete post")
      console.error(err)
    }
  }
  
  const handleEdit = async (postId: number, updatedPost: { title?: string; body?: string; tags?: string[] }) => {
    try {
      await editPostApi(postId, updatedPost)
      toast.success("Post updated successfully!")
      void fetchPosts(page, limit) 
    } catch (err) {
      toast.error("Failed to update post")
      console.error(err)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>


  return (
    <div className='bg-bglight min-h-screen w-screen p-6'>

    <div className='flex flex-row justify-between'> 
      <button
          onClick={()=>setIsFormOpen(true)}
          className='bg-accentorange py-1 px-6 rounded-full cursor-pointer hover:text-white transition-colors duration-300'
          >Add new post</button>

          {isFormOpen && (
            <AddPostForm onCancel={() => setIsFormOpen(false)} reRender={()=>void fetchPosts(page,limit)}/>
          )}

          <button 
          onClick={handleLogout}
          className='text-red-500 text-lg cursor-pointer hover:text-black transition-colors duration-300'>
              Logout
          </button>
      </div>

      <div className='w-full'>
       <p className='text-center text-xl font-semibold mt-10'>Post List</p>
          
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-10 mt-4'>
          <div className='bg-accentlight text-center text-black p-6 rounded-lg'> 
            <p className='font-semibold'>Total Account</p>
            <p className='font-semibold text-3xl mt-4'>{totalAccounts}</p>
          </div>
          <div className='bg-accentpink text-center text-black p-6 rounded-lg'> 
            <p className='font-semibold'>Total Post</p>
            <p className='font-semibold text-3xl mt-4'>{totalPost}</p>
          </div>

          <div className='bg-accentlight text-center text-black p-6 rounded-lg'> 
            <p className='font-semibold'>My Post</p>
            <p className='font-semibold text-3xl mt-4'>{mytotal}</p>
          </div>
      </div>

      <div className='grid grid-cols-1 gap-5 lg:gap-10 md:grid-cols-2 lg:grid-cols-3 mt-6'>
          {posts.map((post) => (
          <Card key={post.id} 
            post={post} 
             onDelete={handleDelete} 
             onEdit={()=>setEditPost(post)}
             onView={() => setSelectedPost(post)}
             />

        ))}
        {editPost && (
            <EditForm
              post={editPost}
              onCancel={() => setEditPost(null)}
              onSubmit={(postId, updatedPost) => handleEdit(postId, updatedPost)}
            />
          )}
          {selectedPost && (
        <CardDetail
          post={selectedPost}
          onClose={() => setSelectedPost(null)} 
        />
      )}

      </div>

      <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages ?? 0 }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded cursor-pointer transition-colors duration-300 ${
                page === p
                  ? "bg-accentorange text-white hover:text-black"
                  : "bg-gray-300 text-black hover:bg-gray-400 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      

  </div>
  )
}

export default AdminHome