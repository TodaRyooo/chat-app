import { ThreadType } from "@/types/ThreadType"
import fs from "fs"
import { NextApiRequest, NextApiResponse } from "next"
import path from "path"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body
  const { threadId } = req.query
  try {
    const dataDir = path.join(process.cwd(), "data")
    const filePath = path.join(dataDir, `${threadId}.json`)
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8")
      const thread: ThreadType = JSON.parse(fileContent)
      const newData = thread.posts.push(data)

      fs.writeFileSync(filePath, JSON.stringify(thread, undefined, 2), "utf-8")

      res.status(200).json(newData)
    } else {
      res.status(404).json({ error: "Thread not found" })
    }
  } catch (error) {
    console.error("JSONファイルの読み込みエラー:", error)
    res.status(500).json({ error: "JSONファイルの読み込みエラー" })
  }
}
