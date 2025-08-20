
import { Card } from '../../components/Card'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import AddPostForm from '../../components/AddPostForm'
import { useMyPostStore } from '../../lib/store/usePostStore'
import { deletePostApi, editPostApi } from '../../lib/api/post'
import type { PostPayload } from '../../lib/api/post'
import EditForm from '../../components/EditForm'
import Layout from '../../layout/Layout'
import CardDetail from '../../components/CardDetail'



const Home = () => {

  const [isFormOpen, setIsFormOpen] = useState(false)
  const navigate = useNavigate();
  const [editPost, setEditPost] = useState<PostPayload | null>(null)
  const [selectedPost, setSelectedPost] = useState<PostPayload | null>(null)
  

  const { posts, loading, error, page, limit,totalPages, setPage, fetchPosts } = useMyPostStore()


  useEffect(() => {
   void fetchPosts(page,limit)
   console.log(limit)
  }, [page,limit,fetchPosts])

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
  const handleAddClick = () => setIsFormOpen(true)


  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>


  return (
        <Layout
        onAdd={handleAddClick}
        isFormOpen={isFormOpen}
        AddFormComponent={
          <AddPostForm
            onCancel={() => setIsFormOpen(false)}
            reRender={() => void fetchPosts(page, limit)}
          />
        }
        onLogout={handleLogout}
        >
    

        <div className='w-full'>
            <p className='text-center mt-10'>Post List</p>
            
        </div>

        <div className='grid grid-cols-1 gap-5 lg:gap-10 md:grid-cols-2 lg:grid-cols-3 mt-6'>
            {posts.map((post) => (
            <Card key={post.id} 
            post={post} 
            onView={() => setSelectedPost(post)}
             onDelete={handleDelete} 
             onEdit={()=>setEditPost(post)}
            
             />
          ))}
           {editPost && (
            <EditForm
              post={editPost}
              onCancel={() => setEditPost(null)}
              onSubmit={(postId, updatedPost) => handleEdit(postId, updatedPost)}
            />
          )}
           <CardDetail
          post={selectedPost}
          onClose={() => setSelectedPost(null)} // 关闭弹窗
        />
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
        

    </Layout>
  )
}

export default Home