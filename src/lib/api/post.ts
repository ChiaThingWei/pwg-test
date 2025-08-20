import api from "./account.ts"

export type PostPayload  = {
    id?:number,
    title: string
    body: string
    tags: string[]
  }

  export type PaginatedPosts = {
    page: number
    limit: number
    totalPages: number
    totalPosts: number
    data: PostPayload[]
  }

  type GetAllPostParams = {
    page: number
    limit: number}
  

  export const createPostApi = async (post: PostPayload, token: string) => {

    const response = await api.post("/posts/create", post, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
    return response.data
  }

  export const getAllPostApi = async(
    {
        page,
        limit,
      }: GetAllPostParams
  ): Promise<PaginatedPosts>=>{

    const response = await api.get("/posts",{params: { page, limit }})
    return response.data
  }

  export const getMyPostApi = async (
    { page, limit }: GetAllPostParams
  ): Promise<PaginatedPosts> => {
    const response = await api.post("/posts/mypost", { page, limit }) 
    return response.data
  }

  export const getPostByIdApi = async (postId: number): Promise<PostPayload> => {
    const response = await api.get(`/posts/view/${postId}`)
    return response.data
  }

  export const deletePostApi = async (postId: number): Promise<{ message: string }> => {
    const response = await api.delete(`/posts/delete/${postId}`)
    return response.data
  }
  export const editPostApi = async (
    postId: number,
    updatedPost: Partial<PostPayload>
  ): Promise<PostPayload> => {
    const response = await api.put(`/posts/edit/${postId}`, updatedPost)
    return response.data
  }