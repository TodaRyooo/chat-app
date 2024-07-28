import fs from "fs"
import { NextApiRequest, NextApiResponse } from "next"
import path from "path"

// NOTE: 関数名を修正し、'handler'としてデフォルトエクスポートされるように変更
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // NOTE: HTTPメソッドのチェックを追加
    const { id } = req.query
    try {
      const dataDir = path.join(process.cwd(), "data")
      const filePath = path.join(dataDir, `${id}.json`)
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf8")
        const json = JSON.parse(content)
        res.status(200).json(json)
      } else {
        res.status(404).json({ error: "Thread not found" }) // NOTE: スレッドが見つからなかった場合のエラーメッセージを追加
      }
    } catch (error) {
      console.error("JSONファイルの読み込みエラー:", error)
      res.status(500).json({ error: "JSONファイルの読み込みエラー" })
    }
  } else {
    res.status(405).json({ error: "Method not allowed" }) // NOTE: 許可されていないHTTPメソッドに対するエラーメッセージを追加
  }
}