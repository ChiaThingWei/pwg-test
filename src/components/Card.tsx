import type { PostPayload } from "../lib/api/post";


type PostCardProps = {
  post: PostPayload
  onView?: (postId: number) => void
  onEdit?: (postId: number) => void
  onDelete?: (postId: number) => void
}

export const Card = ({ post, onView, onEdit, onDelete }: PostCardProps) => {
  return (
    <div className="bg-whitepure p-6 my-2 h-[300px] w-full flex flex-col justify-between rounded shadow-sm">
      <h3 className="font-semibold text-xl">{post.title}</h3>
      <p className="line-clamp-4">{post.body}</p>
      <div className="flex flex-wrap gap-2 mt-3">
      {post.tags.map((tag, index)=>(
        <div key={index} className="bg-accentlight mb-1 text-center py-1 px-3 rounded-full">{tag}</div>
      ))}
      </div>
      <div className="flex flex-row">
        <button
        onClick={()=>onEdit?.(post.id!)}
        className="py-1 px-3 bg-accentlight rounded-full  lg:px-5 cursor-pointer hover:text-white transition-colors duration-300"
        >Edit</button>

        <button
        onClick={()=>onView?.(post.id!)}
        className="py-1 px-3 bg-accentorange ml-1  lg:px-5 rounded-full cursor-pointer hover:text-white transition-colors duration-300"
        >View</button>

        <button
         onClick={() => onDelete?.(post.id!)}
        className="py-1 px-3 bg-accentred rounded-full ml-1  cursor-pointer lg:px-5 hover:text-white transition-colors duration-300"
        >Delete</button>

      </div>
    </div>
  )
}