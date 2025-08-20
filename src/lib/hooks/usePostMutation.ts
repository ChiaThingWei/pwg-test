import { useMutation } from "@tanstack/react-query";
import { createPostApi } from "../api/post";
import type { PostPayload } from "../api/post";
import toast from "react-hot-toast";

export const useCreatePostMutation = () => {
    return useMutation({
      mutationFn: async (post: PostPayload) => {
        const token = localStorage.getItem("accessToken") || ""
        return await createPostApi(post, token)
      },
      onSuccess: (data) => {
        console.log(data)
        toast.success('successfully creating')
      },
      onError: (error) => {
        console.error("❌ Failed to create post:", error)
        toast.error('fail createing')
      },
    })
  }