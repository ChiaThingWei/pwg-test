import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getAllPostApi, getMyPostApi, getPostByIdApi } from "../api/post" 

type UseGetAllPostsParams = {
    page: number
    limit: number
  }

export const useGetAllPosts = ({ page, limit }: UseGetAllPostsParams) => {
  return useQuery({
    queryKey: ["posts",page,limit],  
    queryFn: () => getAllPostApi({ page, limit }),
    placeholderData: keepPreviousData
  })
}

export const useGetMyPosts = ({ page, limit }: UseGetAllPostsParams) => {
    return useQuery({
      queryKey: ["posts",page,limit],  
      queryFn: () => getMyPostApi({ page, limit }),
      placeholderData: keepPreviousData
    })
  }
  
  export const usePostById = (postId: number) => {
    return useQuery({
      queryKey: ["post", postId],
      queryFn: () => getPostByIdApi(postId),
      enabled: !!postId, // 确保 postId 有值才调用
    })
  }