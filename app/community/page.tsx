import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MessageSquare, Eye, ThumbsUp } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 실제 구현 시에는 API에서 데이터를 가져옵니다
const posts = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  title: [
    "React와 Next.js 스터디 모집합니다",
    "취업 준비 팁 공유합니다",
    "포트폴리오 피드백 부탁드립니다",
    "코딩 테스트 준비 방법",
    "인턴십 경험 공유",
  ][i % 5],
  author: `user${i + 1}`,
  date: `2023-${9 - (i % 3)}-${28 - (i % 28)}`,
  category: ["스터디", "취업", "포트폴리오", "코딩테스트", "인턴십"][i % 5],
  views: Math.floor(Math.random() * 100) + 10,
  likes: Math.floor(Math.random() * 20),
  comments: Math.floor(Math.random() * 10),
  content: "게시글 내용입니다...",
}))

export default function CommunityPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SW 커뮤니티
          </h1>
          <p className="text-muted-foreground">소프트웨어 관련 정보를 공유하고 질문하는 커뮤니티입니다.</p>
        </div>

        {/* 탭 메뉴 */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="study">스터디</TabsTrigger>
            <TabsTrigger value="job">취업</TabsTrigger>
            <TabsTrigger value="qna">질문/답변</TabsTrigger>
            <TabsTrigger value="free">자유</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {/* 검색 및 필터 */}
            <div className="flex flex-col gap-4 sm:flex-row mb-6">
              <div className="flex flex-1 items-center gap-2">
                <Input placeholder="검색어를 입력하세요" className="max-w-sm" />
                <Button size="icon" variant="outline">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">검색</span>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="정렬 기준" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">최신순</SelectItem>
                    <SelectItem value="popular">인기순</SelectItem>
                    <SelectItem value="comments">댓글순</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-accent hover:bg-accent/90 text-white" asChild>
                  <Link href="/community/write" className="gap-1">
                    <Plus className="h-4 w-4" />
                    글쓰기
                  </Link>
                </Button>
              </div>
            </div>

            {/* 게시글 목록 */}
            <div className="grid gap-4">
              {posts.map((post) => (
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
                        <span>{post.author}</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
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
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* 페이지네이션 */}
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </TabsContent>

          {/* 다른 탭 콘텐츠는 유사하게 구현 */}
          <TabsContent value="study" className="mt-6">
            <div className="p-4 text-center">
              <p>스터디 관련 게시글이 표시됩니다.</p>
            </div>
          </TabsContent>
          <TabsContent value="job" className="mt-6">
            <div className="p-4 text-center">
              <p>취업 관련 게시글이 표시됩니다.</p>
            </div>
          </TabsContent>
          <TabsContent value="qna" className="mt-6">
            <div className="p-4 text-center">
              <p>질문/답변 게시글이 표시됩니다.</p>
            </div>
          </TabsContent>
          <TabsContent value="free" className="mt-6">
            <div className="p-4 text-center">
              <p>자유 게시글이 표시됩니다.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

