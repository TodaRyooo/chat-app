import { ThreadType } from "@/types/ThreadType"

export const generateJson = async (data: ThreadType, fileTitle: string) => {
  try {
    const response = await fetch(
      `/api/makeJson?fileTitle=${encodeURIComponent(fileTitle)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`)
    }
    const sendData = await response.json()
    console.log(sendData)
  } catch (error) {
    console.error("Fetch error:", error)
  }
}
