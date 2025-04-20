import axios from "axios"

export interface Post {
  id?: number | string,
  title: string,
  content: string,
  opened?: boolean
}

export const getPosts = async () => {
  const data = await axios.get<Post[]>("http://localhost:3000/posts")
  return data.data
}

export const createPost = async (data: Post) => {
  await axios.post("http://localhost:3000/posts", data)
}

export const editPost = async (data: Post) => {
  await axios.put(`http://localhost:3000/posts/${data.id}`, data)
}

export const deletePost = async (id: number | string) => {
  await axios.delete(`http://localhost:3000/posts/${id}`)
}
