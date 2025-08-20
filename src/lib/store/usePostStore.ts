import { create } from "zustand"
import { getAllPostApi, getMyPostApi } from "../api/post"
import type { PostPayload } from "../api/post"

// 定义 Zustand store
type PostState = {
  posts: PostPayload[]
  loading: boolean
  error: string | null
  totalPost: number
  page: number
  limit: number
  totalPages: number | null
  setPage: (page: number) => void
  fetchPosts: (page: number, limit: number) => Promise<void>
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  loading: false,
  error: null,
  totalPost:0,
  page: 1,
  limit: 10,
  totalPages: null,
  setPage: (page: number) => set({ page }),

  fetchPosts: async (page: number, limit: number) => {
    set({ loading: true, error: null })
    try {
      const data = await getAllPostApi({ page, limit})
      set({ posts: data.data,
        totalPages:data.totalPages, 
        loading: false,
        totalPost: data.totalPosts,
    })
      console.log(data)
    } catch (err) {
        if (err instanceof Error) {
          set({ error: err.message, loading: false })
        } else {
          set({ error: "Unknown error", loading: false })
        }
      }
  },
}))

export const useMyPostStore = create<PostState>((set) => ({
    posts: [],
    loading: false,
    error: null,
    page: 1,
  limit: 10,
  totalPost:0,
  totalPages: null,
  setPage: (page: number) => set({ page }),
  
    fetchPosts: async (page: number, limit: number) => {
      set({ loading: true, error: null })
      try {
        const data = await getMyPostApi({ page, limit})
        console.log(data.totalPosts)
        set({ posts: data.data,
            totalPost:data.totalPosts,
            totalPages: data.totalPages, loading: false })
        console.log(data)
      } catch (err) {
          if (err instanceof Error) {
            set({ error: err.message, loading: false })
          } else {
            set({ error: "Unknown error", loading: false })
          }
        }
    },
  }))

