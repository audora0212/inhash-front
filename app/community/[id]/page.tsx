"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ThumbsUp, Eye, MessageSquare, Send, Share2 } from "lucide-react"

// API 함수들은 별도의 api 파일에 정의되어 있다고 가정합니다.
import { fetchPostById, likePost, addComment } from "@/utils/api"

export default function PostDetailPage() {
  const params = useParams()
  const router = useRouter()
  const postId = params.id as string

  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<any[]>([])

  useEffect(() => {
    if (postId) {
      fetchPostById(postId)
        .then((data) => {
          setPost(data)
          // 백엔드에서 Post 엔티티의 필드명이 comments입니다.
          setComments(data.comments || [])
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching post details:", error)
          setLoading(false)
        })
    }
  }, [postId])

  const handleLike = async () => {
    if (!liked && post) {
      try {
        const updatedPost = await likePost(postId)
        setLiked(true)
        setPost(updatedPost)
      } catch (error) {
        console.error("Error liking post:", error)
      }
    }
  }

  const handleAddComment = async () => {
    if (comment.trim() && post) {
      try {
        const newComment = await addComment(postId, {
          content: comment,
          author: "현재 사용자", // 실제 사용자 정보는 auth context에서 가져오면 됩니다.
        })

        // 새 댓글을 댓글 배열에 추가
        setComments([...comments, newComment])
        // 게시글 객체 내 댓글 목록도 업데이트
        setPost({
          ...post,
          comments: [...(post.comments || []), newComment],
        })
        setComment("")
      } catch (error) {
        console.error("Error adding comment:", error)
      }
    }
  }

  if (loading) {
    return <div className="container py-8">로딩 중...</div>
  }

  if (!post) {
    return <div className="container py-8">게시글을 찾을 수 없습니다.</div>
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        {/* Back button */}
        <Button variant="ghost" className="w-fit" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          목록으로 돌아가기
        </Button>

        {/* Post detail card */}
        <Card className="gradient-card">
          <CardHeader>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {post.title}
                </CardTitle>
                <Badge variant="outline">{post.category}</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder-user.jpg" alt={post.author} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <span>{post.author}</span>
                </div>
                <span>{new Date(post.createdDate).toLocaleDateString()}</span>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.viewCount}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">{post.content}</div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <Button variant={liked ? "default" : "outline"} size="sm" className="gap-2" onClick={handleLike}>
                  <ThumbsUp className="h-4 w-4" />
                  좋아요 {post.likeCount}
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  공유하기
                </Button>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span>댓글 {comments.length}</span>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Comments section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">댓글</h2>
          <Separator />

          {/* Comment list */}
          <div className="flex flex-col gap-4">
            {comments.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">첫 번째 댓글을 작성해보세요!</p>
            ) : (
              comments.map((c, index) => (
                <div key={index} className="flex gap-3 p-4 border rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt={c.author} />
                    <AvatarFallback>{c.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{c.author}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(c.createdDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{c.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add comment */}
          <div className="flex flex-col gap-2 mt-4">
            <h3 className="text-sm font-medium">댓글 작성</h3>
            <div className="flex gap-2">
              <Textarea
                placeholder="댓글을 입력하세요"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <Button className="self-end gap-2" onClick={handleAddComment} disabled={!comment.trim()}>
              <Send className="h-4 w-4" />
              댓글 등록
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
