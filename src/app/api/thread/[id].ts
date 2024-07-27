import fs from "fs"
import { NextApiRequest, NextApiResponse } from "next"
import path from "path"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  try {
    const dataDir = path.join(process.cwd(), "data")
    const filePath = path.join(dataDir, `${id}.json`)
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8")
      const json = JSON.parse(content)
      res.status(200).json(json)
    } else {
      res.status(404).json({ error: "Thread not found" })
    }
  } catch (error) {
    console.error("JSONファイルの読み込みエラー:", error)
    res.status(500).json({ error: "JSONファイルの読み込みエラー" })
  }
}
