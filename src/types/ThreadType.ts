export type PostType = {
  postId: string
  author: string
  createdAt: string
  content: string
}

export type ThreadType = {
  threadId: string
  title: string
  createdAt: string
  closedAt: string | undefined
  posts: PostType[]
}

//   threads: [
//     {
//       threadId: string //"unique-thread-id-1"
//       title: string //"スレッドタイトル1"
//       createdAt: "2024-06-16T12:00:00Z"
//       closedAt: undefined
//       posts: [
//         {
//           postId: "unique-post-id-1"
//           author: "送信者1"
//           createdAt: "2024-06-16T12:05:00Z"
//           content: "送信内容1"
//         },
//         {
//           postId: "unique-post-id-2"
//           author: "送信者2"
//           createdAt: "2024-06-16T12:10:00Z"
//           content: "送信内容2"
//         }
//       ]
//     },
//     {
//       threadId: "unique-thread-id-2"
//       title: "スレッドタイトル2"
//       createdAt: "2024-06-15T08:00:00Z"
//       closedAt: "2024-06-15T20:00:00Z"
//       posts: [
//         {
//           postId: "unique-post-id-3"
//           author: "送信者3"
//           createdAt: "2024-06-15T08:10:00Z"
//           content: "送信内容3"
//         }
//       ]
//     }
//   ]
