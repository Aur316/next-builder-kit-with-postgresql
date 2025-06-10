import { PostForm, PostList } from '../../components'

export default function Posts() {
  return (
    <div className="flex flex-col gap-4">
      <PostForm />
      <PostList />
    </div>
  )
}
