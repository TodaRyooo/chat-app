"use client"

import { PostType, ThreadType } from "@/types/ThreadType"
import { generateJson } from "@/utils/generateJson"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { v4 } from "uuid"

const CreateThreadPage = () => {
  console.log(process.cwd())

  const router = useRouter()
  const [post, setPost] = useState<PostType>({
    postId: "",
    author: "no-name",
    content: "",
    createdAt: "",
  })
  const [thread, setThread] = useState<ThreadType>({
    threadId: "",
    title: "",
    createdAt: "",
    closedAt: "",
    posts: [post],
  })

  useEffect(() => {
    fetch("/api/threads")
      .then((response) => response.json())
      .then((data) => setThread(data))
      .catch((error) => console.error("Error fetching threads:", error))
  }, [])

  const handleClick = () => {
    const postUuid = v4()
    const threadUuid = v4()
    const newDate = new Date()
    const localeDate = newDate
      .toLocaleString()
      .replace(/\//g, "")
      .replace(/:/g, "")
      .replace(" ", "_")
    const newPost: PostType = {
      ...post,
      postId: v4(),
      createdAt: newDate.toISOString(),
    }
    const newThread: ThreadType = {
      ...thread,
      threadId: threadUuid,
      createdAt: newDate.toISOString(),
      posts: [newPost],
    }
    generateJson(newThread, threadUuid)
    console.log(newThread)
  }

  return (
    <>
      <div>スレッド作成</div>
      <div onClick={() => router.push("/")}>Home</div>
      <input
        onChange={(e) =>
          setThread((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
        placeholder="スレッドタイトル"
      />
      <input
        onChange={(e) =>
          setPost((prev) => ({
            ...prev,
            content: e.target.value,
          }))
        }
        placeholder="イニシャルポスト"
      />
      <div onClick={handleClick}>作成</div>
    </>
  )
}

export default CreateThreadPage
