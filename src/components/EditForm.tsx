import { useState } from "react"
import type { PostPayload } from "../lib/api/post"

type EditFormProps = {
  post: PostPayload
  onCancel: () => void
  onSubmit: (postId: number, updatedPost: { title?: string; body?: string; tags?: string[] }) => void
}

const TAGS = [
  "history","american","crime","science","fiction","fantasy","space",
  "adventure","nature","environment","philosophy","psychology","health"
]

const EditForm = ({ post, onCancel, onSubmit }: EditFormProps) => {
  const [formData, setFormData] = useState({
    title: post.title,
    body: post.body,
    tags: post.tags || [],
  })
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>(post.tags || [])

  const availableTags = TAGS.filter(tag => !selectedTags.includes(tag))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => [...prev, tag])
    setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }))
  }

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag))
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!post.id) return
    onSubmit(post.id, formData)
    onCancel()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 max-h-[80%] w-2/3 lg:w-1/3 rounded-lg overflow-y-auto flex flex-col">
        <h2 className="text-xl font-bold mb-4">Edit Post</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={post.title}
              className="border rounded-full px-2 py-1 w-full border-accentorange"
            />
          </div>

          <div>
            <label className="block mb-1">Body</label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder={post.body}
              className="border rounded-lg px-2 py-1 w-full border-accentorange min-h-[100px]"
            />
          </div>

          <div>
            <label className="block mb-1">Tags</label>
            <div
              onClick={() => setIsSelectOpen(!isSelectOpen)}
              className="border border-accentorange rounded-full px-2 py-1 flex flex-wrap gap-2 min-h-[40px] items-center cursor-pointer"
            >
              {selectedTags.length === 0 && <span className="text-gray-400">Click to select tags</span>}
              {selectedTags.map(tag => (
                <span key={tag} className="bg-accentorange text-white px-2 py-1 rounded-full flex items-center gap-1">
                  {tag}
                  <button type="button" className="text-xs" onClick={e => { e.stopPropagation(); handleRemoveTag(tag) }}>✕</button>
                </span>
              ))}
            </div>

            {isSelectOpen && availableTags.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    className="border border-accentorange rounded-full px-2 py-1 hover:bg-accentorange hover:text-white transition-colors"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-evenly mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 hover:text-white cursor-pointer transition-colors duration-300 px-4 py-1 rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-accentorange hover:text-black cursor-pointer transition-colors duration-300 px-4 py-1 rounded-full text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditForm
