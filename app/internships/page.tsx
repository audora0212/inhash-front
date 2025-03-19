import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building, Clock, ExternalLink } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// 실제 구현 시에는 API에서 데이터를 가져옵니다
const internships = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  title: `${["삼성전자", "네이버", "LG전자", "SK하이닉스", "카카오"][i % 5]} ${["동계", "하계"][i % 2]} 인턴십 프로그램`,
  company: ["삼성전자", "네이버", "LG전자", "SK하이닉스", "카카오"][i % 5],
  location: ["서울", "경기도 성남시", "경기도 화성시", "경기도 이천시", "제주도"][i % 5],
  period: `${["1개월", "2개월", "3개월", "6개월"][i % 4]} (${["2023-12", "2024-01", "2024-06", "2024-07"][i % 4]} 시작)`,
  deadline: `2023-${10 + (i % 3)}-${10 + (i % 20)}`,
  type: ["정규 인턴십", "산학협력 인턴십", "현장실습"][i % 3],
  description: "소프트웨어 개발 및 연구 분야에서 실무 경험을 쌓을 수 있는 인턴십 프로그램입니다.",
}))

export default function InternshipsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            인턴십 정보
          </h1>
          <p className="text-muted-foreground">인하대학교 학생들을 위한 다양한 인턴십 프로그램 정보를 확인하세요.</p>
        </div>

        {/* 필터 및 검색 (실제 구현 시 기능 추가) */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="cursor-pointer">
            전체
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            정규 인턴십
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            산학협력 인턴십
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            현장실습
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            동계
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            하계
          </Badge>
        </div>

        {/* 인턴십 목록 */}
        <div className="grid gap-4">
          {internships.map((internship) => (
            <Card className="gradient-card" key={internship.id}>
              <CardHeader>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{internship.title}</CardTitle>
                    <Badge className="bg-secondary hover:bg-secondary/80">{internship.type}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{internship.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{internship.period}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>지원마감: {internship.deadline}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{internship.description}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="gap-1" asChild>
                  <Link href={`/internships/${internship.id}`}>
                    상세 정보 보기
                    <ExternalLink className="h-4 w-4" />
                  </Link>
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

