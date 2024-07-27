import fs from "fs"
import { NextApiRequest, NextApiResponse } from "next"
import path from "path"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), "data")
    const files = fs.readdirSync(dataDir)
    const threads = files.map((file) => {
      const filePath = path.join(dataDir, file)
      const content = fs.readFileSync(filePath, "utf8")
      const json = JSON.parse(content)
      return json
    })

    return NextResponse.json(threads)
  } catch (error) {
    console.error("JSONファイルの読み込みエラー:", error)
    return NextResponse.json(
      { error: "JSONファイルの読み込みエラー" },
      { status: 500 }
    )
  }
}
