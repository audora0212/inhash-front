import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ExternalLink, Search, Calendar } from "lucide-react"
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

// 실제 구현 시에는 API에서 데이터를 가져옵니다
const notices = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  title: `SW중심대학 ${i + 1}차 산학프로젝트 참여기업 모집 안내`,
  date: `2023-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
  description: "SW중심대학 산학프로젝트에 참여할 기업을 모집합니다. 관심 있는 기업은 신청 바랍니다.",
  url: "https://example.com/notice",
}))

export default function NoticesPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            공지사항
          </h1>
          <p className="text-muted-foreground">SW중심사업단에서 제공하는 최신 공지사항과 이벤트 정보를 확인하세요.</p>
        </div>

        {/* 검색 및 필터 */}
        <div className="flex flex-col gap-4 sm:flex-row">
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
                <SelectItem value="oldest">오래된순</SelectItem>
                <SelectItem value="title">제목순</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
              <span className="sr-only">날짜 선택</span>
            </Button>
          </div>
        </div>

        {/* 공지사항 목록 */}
        <div className="grid gap-4">
          {notices.map((notice) => (
            <Card className="gradient-card" key={notice.id}>
              <CardHeader>
                <CardTitle className="text-lg">{notice.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-muted-foreground">{notice.description}</p>
                  <p className="text-xs text-muted-foreground">등록일: {notice.date}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="gap-1" asChild>
                  <Link href={`/notices/${notice.id}`}>
                    자세히 보기
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href={notice.url} target="_blank" rel="noopener noreferrer">
                    원문 보기
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* 페이지네이션 */}
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
    </div>
  )
}

