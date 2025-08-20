import type{ PostPayload } from "../lib/api/post"

type CardDetailProps = {
  post: PostPayload | null
  onClose: () => void
}

const CardDetail = ({ post, onClose }: CardDetailProps) => {
  if (!post) return null 

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 max-h-[80%] w-2/3 rounded-lg overflow-y-auto flex flex-col">
       
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <button
            onClick={onClose}
            className="text-accentred cursor-pointer hover:text-black transition-colors duration-300 text-lg font-bold"
          >
            ✕
          </button>
        </div>

       
        <p className="my-8">{post.body}</p>

      
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, idx) => (
            <div
              key={idx}
              className="bg-accentlight text-sm px-2 py-1 rounded-full"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardDetail
