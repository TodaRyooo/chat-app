"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  return (
    <>
      <div style={{ padding: "10px" }}>
        <Image src="oasis_logo.svg" alt={""} width={210} height={70} />
        <div
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/createThread")}
        >
          Create Thread
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/threadDetail")}
        >
          Thread Detail
        </div>
      </div>
    </>
  )
}
