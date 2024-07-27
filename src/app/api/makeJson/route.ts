import fs from "fs"
import path from "path"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { searchParams } = new URL(request.url)
    const fileTitle = searchParams.get("fileTitle")
    const dataDir = path.join(process.cwd(), "data")

    // データディレクトリが存在するか確認し、存在しない場合は作成
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir)
    }

    const filePath = path.join(dataDir, `${fileTitle}.json`)
    await fs.promises.writeFile(filePath, JSON.stringify(data), "utf8")

    return NextResponse.json(data)
  } catch (error) {
    console.error("JSONファイルの書き込みエラー:", error)
    return NextResponse.json({ error: "JSONファイルの書き込みエラー" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json("GET request to makeJson endpoint")
}
