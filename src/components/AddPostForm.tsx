import {  useState } from 'react'
import { useCreatePostMutation } from '../lib/hooks/usePostMutation'

type AddPostFormProps = {
    onCancel: () => void
    reRender: () => void
  }


const TAGS = [
  "history","american","crime","science","fiction","fantasy","space",
  "adventure","nature","environment","philosophy","psychology","health"
]


const AddPostForm = ({ onCancel, reRender }: AddPostFormProps) => {

    const [isSelectOpen, setIsSelectOpen] = useState(false)
    const { mutate: createPost } = useCreatePostMutation()
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const availableTags = TAGS.filter((tag) => !selectedTags.includes(tag))
  
  

    const [formData, setFormData] = useState({
        title: "",
        body: "",
        tags: [] as string[],
      })
    
      const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
      }
    
      const handleTagClick = (tag: string) => {
        setSelectedTags((prev) => [...prev, tag])
      
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tag], 
        }))
      }
      
      const handleRemoveTag = (tag: string) => {
        setSelectedTags((prev) => prev.filter((t) => t !== tag))
      
        setFormData((prev) => ({
          ...prev,
          tags: prev.tags.filter((t: string) => t !== tag),
        }))
      }
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault() 
    
        createPost(formData, {
          onSuccess: () => {
            console.log("✅ Post created successfully")
            setFormData({ title: "", body: "" ,tags: []}) 
            setSelectedTags([])
            setIsSelectOpen(false)
            onCancel?.()
            reRender?.()
          },
          onError: (error) => {
            console.error("❌ Error creating post", error)
          },
        })
      }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-whitepure max-h-[80%] flex flex-col justify-center p-10 rounded-lg overflow-y-auto shadow-lg w-2/3 lg:w-1/3 text-center">
       <p>Add A Post</p>

       <form 
       onSubmit={handleSubmit}
       className='flex flex-col text-start'>
       <label>Title</label>
         <input 
         name='title'
         value={formData.title}
         onChange={handleChange}
         className='border rounded-full px-2 border-accentorange py-1 mb-4'
        />

         <label>Content</label>
         <textarea 
         name='body'
         value={formData.body}
         onChange={handleChange}
         className='border rounded-lg px-2 rows min-h-[100px] border-accentorange py-1 mb-4'
         />

      
           
               <label>Tags</label>
               <div
                   onClick={() => setIsSelectOpen(!isSelectOpen)}
                   className="border border-accentorange rounded-full px-2 py-1 flex flex-wrap gap-2 min-h-[40px] items-center cursor-pointer"
                 >
                   {selectedTags.length === 0 && (
                     <span className="text-gray-400">Click to select tags</span>
                   )}
                   {selectedTags.map((tag) => (
                     <span
                       key={tag}
                       className="bg-accentorange text-white px-2 py-1 rounded-full text-sm flex items-center gap-1"
                     >
                       {tag}
                       <button
                         type="button"
                         className=" text-xs"
                         onClick={(e) => {
                           e.stopPropagation()
                           handleRemoveTag(tag)
                         }}
                       >
                         ✕
                       </button>
                     </span>
                   ))}
                 </div>

                 {isSelectOpen && availableTags.length > 0 && (
                   <div className=" rounded px-2 py-1 mt-4 grid grid-cols-2 gap-3">
                     {availableTags.map((tag) => (
                       <button
                         key={tag}
                         className="border-accentorange rounded-full hover:bg-accentorange hover:text-white duration-300 transition-colors text-center cursor-pointer border px-2 py-1"
                         onClick={() => handleTagClick(tag)}
                       >
                         {tag}
                       </button>
                     ))}
                   </div>
                 )}
             
             <div className='flex flex-row justify-evenly w-full mt-4'>
               <button 
               type='button'
               onClick={onCancel}
               className='bg-accentlight hover:text-white transition-colors duration-300  w-1/3 py-1 rounded-full cursor-pointer'>
                 Cancel
               </button>

               <button 
               type='submit'
               className='bg-accentorange hover:text-white transition-colors duration-300 cursor-pointer w-1/3 py-1 rounded-full'>
                 Add
               </button>
             </div>

       </form>

</div>
</div>
  )
}

export default AddPostForm