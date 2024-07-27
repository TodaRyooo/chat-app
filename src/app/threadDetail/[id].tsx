"use client"

import { PostType, ThreadType } from "@/types/ThreadType"
import { postJson } from "@/utils/postJson"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { v4 } from "uuid"

const DetailPage = () => {
  const router = useRouter()
  const id = useSearchParams().get("id")?.toString()
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
  //   console.log(id.get("params"))

  const handleClick = () => {
    const newDate = new Date()
    // const localeDate = newDate.toLocaleString().replace(/\//g, "").replace(/:/g, "").replace(" ", "_")
    const newPost: PostType = {
      postId: v4(),
      author: "no-name",
      content: content,
      createdAt: newDate.toISOString(),
    }
    postJson(newPost, id!)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/thread/${id}?id=${id}`)
        if (!response.ok) {
          throw new Error("Thread not found")
        }
        const data = await response.json()
        setThread(data)
      } catch (error) {
        console.error(error)
      }
    }

    const interval = setInterval(fetchData, 500) // 5秒ごとにフェッチ
    return () => clearInterval(interval)
  }, [id])

  return (
    <>
      <div>{thread.title ? thread.title : "Now Fetching.."}</div>
      <div onClick={() => router.back()}>Back</div>
      <div onClick={() => window.location.reload()}>reload</div>
      <div style={{ display: "flex" }}>
        <div style={{ cursor: "pointer" }} onClick={handleClick}>
          送信
        </div>
        <input onChange={(e) => setContent(e.target.value)} />
      </div>
      {thread.posts.length !== 0 ? thread.posts.map((item) => <div key={item.postId}>{item.content}</div>) : "Now Fetching.."}
    </>
  )
}

export default DetailPage
