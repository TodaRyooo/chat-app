import { PostType } from "@/types/ThreadType"

export const postJson = async (data: PostType, threadId: string) => {
  try {
    const response = await fetch(
      `/api/post?threadId=${encodeURIComponent(threadId)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const sendData = await response.json()
    console.log(sendData)
  } catch (error) {
    console.error("Fetch error:", error)
  }
}
