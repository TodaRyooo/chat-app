"use client"

import { ThreadType } from "@/types/ThreadType"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const ThreadDetailPage = () => {
  const router = useRouter()

  const [threads, setThreads] = useState<ThreadType[]>([])

  useEffect(() => {
    fetch("/api/threads")
      .then((response) => response.json())
      .then((data) => setThreads(data))
      .catch((error) => console.error("Error fetching threads:", error))
  }, [])

  return (
    <>
      <div>スレッド詳細</div>
      <div style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
        Home
      </div>
      <div onClick={() => window.location.reload()}>reload</div>
      {threads.map((item, index) => (
        <div
          key={index}
          onClick={() =>
            router.push(`/details/${item.threadId}`)
          }
        >
          {item.title}
        </div>
      ))}
    </>
  )
}

export default ThreadDetailPage
