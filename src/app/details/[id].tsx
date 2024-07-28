"use client"

import { PostType, ThreadType } from "@/types/ThreadType"
import { postJson } from "@/utils/postJson"
import { useRouter } from "next/router"
import { /*useRouter,*/ useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { v4 } from "uuid"

const DetailPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  // const id = searchParams.get("id")?.toString()
  const { id } = router.query
  console.log(id)
  const [sendPost, setSendPost] = useState<PostType>({
    postId: "",
    author: "no-name",
    content: "",
    createdAt: "",
  })
  const [posts, setPosts] = useState<PostType[]>([])
  const [content, setContent] = useState("")
  const [thread, setThread] = useState<ThreadType>({
    threadId: "",
    title: "",
    createdAt: "",
    closedAt: undefined,
    posts: posts,
  })

  const handleClick = () => {
    const newDate = new Date()
    const newPost: PostType = {
      postId: v4(),
      author: "no-name",
      content: content,
      createdAt: newDate.toISOString(),
    }
    postJson(newPost, id!.toString())
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/thread/${id}`) // NOTE: API エンドポイントを修正
        if (!response.ok) {
          throw new Error("Thread not found")
        }
        const data = await response.json()
        setThread(data)
      } catch (error) {
        console.error(error)
      }
    }

    if (id) {
      // NOTE: idが存在する場合のみfetchDataを呼び出すように修正
      fetchData()
    }
  }, [id])

  return (
    <>
      <div>{thread.title ? thread.title : "Now Fetching.."}</div>
      {thread && (
        <>
          <div onClick={() => router.back()}>Back</div>
          <div onClick={() => window.location.reload()}>reload</div>
          <div style={{ display: "flex" }}>
            <div style={{ cursor: "pointer" }} onClick={handleClick}>
              送信
            </div>
            <input onChange={(e) => setContent(e.target.value)} />
          </div>
          {thread.posts.length !== 0
            ? thread.posts.map((item) => (
                <div key={item.postId}>{item.content}</div>
              ))
            : "Now Fetching.."}
        </>
      )}
    </>
  )
}

export default DetailPage
