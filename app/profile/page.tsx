import Link from "next/link"
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MessageSquare, Mail, FileText, ExternalLink, Eye, ThumbsUp } from "lucide-react"

// 실제 구현 시에는 API에서 데이터를 가져옵니다
async function getUserData(id: string) {
  // 여기서는 더미 데이터를 반환합니다
  return {
    id: Number.parseInt(id),
    email: `user${id}@example.com`,
    username: `user${id}`,
    joinDate: "2023-01-15",
    postsCount: 12,
    commentsCount: 28,
  }
}

// 사용자가 작성한 게시글 목록을 가져옵니다
async function getUserPosts(id: string) {
  // 여기서는 더미 데이터를 반환합니다
  return Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    title: [
      "React와 Next.js 스터디 모집합니다",
      "취업 준비 팁 공유합니다",
      "포트폴리오 피드백 부탁드립니다",
      "코딩 테스트 준비 방법",
      "인턴십 경험 공유",
    ][i % 5],
    date: `2023-${9 - (i % 3)}-${28 - (i % 28)}`,
    category: ["스터디", "취업", "포트폴리오", "코딩테스트", "인턴십"][i % 5],
    views: Math.floor(Math.random() * 100) + 10,
    likes: Math.floor(Math.random() * 20),
    comments: Math.floor(Math.random() * 10),
    excerpt: "게시글 내용의 일부입니다. 이 부분은 게시글의 미리보기로 표시됩니다...",
  }))
}

// 사용자가 작성한 댓글 목록을 가져옵니다
async function getUserComments(id: string) {
  // 여기서는 더미 데이터를 반환합니다
  return Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    postId: Math.floor(Math.random() * 100) + 1,
    postTitle: [
      "프론트엔드 개발자 취업 준비",
      "알고리즘 스터디 모집",
      "포트폴리오 작성 팁",
      "인하대 소프트웨어학과 과목 추천",
      "개발자 로드맵 공유",
    ][i % 5],
    content: "댓글 내용입니다. 이 글에 대한 의견을 남겼습니다.",
    date: `2023-${10 - (i % 3)}-${25 - (i % 20)}`,
  }))
}

export default async function UserProfilePage({ params }: { params: { id: string } }) {
  // 실제 구현 시에는 API에서 데이터를 가져옵니다
  try {
    const userData = await getUserData(params.id)
    const userPosts = await getUserPosts(params.id)
    const userComments = await getUserComments(params.id)

    return (
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          {/* 사용자 정보 카드 */}
          <Card className="gradient-card">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={`/placeholder.svg?height=80&width=80`} alt={userData.username} />
                  <AvatarFallback className="text-2xl">{userData.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    {userData.username}의 프로필
                  </CardTitle>
                  <CardDescription>
                    <div className="flex flex-col gap-1 mt-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{userData.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>가입일: {userData.joinDate}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="mr-1">
                          게시글 {userData.postsCount}
                        </Badge>
                        <Badge variant="outline">댓글 {userData.commentsCount}</Badge>
                      </div>
                    </div>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* 게시글 및 댓글 탭 */}
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                작성한 게시글
              </TabsTrigger>
              <TabsTrigger value="comments" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                작성한 댓글
              </TabsTrigger>
            </TabsList>

            {/* 게시글 탭 내용 */}
            <TabsContent value="posts" className="mt-6">
              <div className="grid gap-4">
                {userPosts.length > 0 ? (
                  userPosts.map((post) => (
                    <Card key={post.id} className="gradient-card">
                      <CardHeader>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                              <Link href={`/community/${post.id}`} className="hover:underline">
                                {post.title}
                              </Link>
                            </CardTitle>
                            <Badge variant="outline">{post.category}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      </CardContent>
                      <CardFooter>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </div>
                          <div className="ml-auto">
                            <Button variant="outline" size="sm" className="gap-1" asChild>
                              <Link href={`/community/${post.id}`}>
                                자세히 보기
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">작성한 게시글이 없습니다.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* 댓글 탭 내용 */}
            <TabsContent value="comments" className="mt-6">
              <div className="grid gap-4">
                {userComments.length > 0 ? (
                  userComments.map((comment) => (
                    <Card key={comment.id} className="gradient-card">
                      <CardHeader>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">
                              <Link href={`/community/${comment.postId}`} className="hover:underline">
                                {comment.postTitle}
                              </Link>
                            </CardTitle>
                            <span className="text-sm text-muted-foreground">{comment.date}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{comment.content}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="gap-1 ml-auto" asChild>
                          <Link href={`/community/${comment.postId}`}>
                            원문 보기
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">작성한 댓글이 없습니다.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  } catch (error) {
    return notFound()
  }
}

