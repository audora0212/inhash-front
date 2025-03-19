"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, Plus, Edit, Trash2 } from "lucide-react"

// 실제 구현 시에는 API에서 데이터를 가져옵니다
const jobs = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  title: ["프론트엔드 개발자", "백엔드 개발자", "풀스택 개발자", "모바일 앱 개발자", "데이터 엔지니어"][i % 5],
  company: ["네이버", "카카오", "라인", "쿠팡", "우아한형제들"][i % 5],
  location: ["서울", "경기", "부산", "대전", "제주"][i % 5],
  deadline: `2023-${11 + (i % 2)}-${10 + (i % 20)}`,
  status: ["활성", "마감"][i % 2],
}))

export default function AdminJobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null)

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteClick = (id: number) => {
    setSelectedJobId(id)
    setDeleteDialogOpen(true)
  }

  const handleDelete = () => {
    // 실제 구현 시에는 API를 호출하여 데이터를 삭제합니다
    console.log(`Deleting job with ID: ${selectedJobId}`)
    setDeleteDialogOpen(false)
  }

  return (
    <div className="container py-8">
      <Card className="gradient-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>채용 공고 관리</CardTitle>
          <Button className="bg-accent hover:bg-accent/90 text-white" asChild>
            <Link href="/admin/jobs/new" className="gap-1">
              <Plus className="h-4 w-4" />새 공고 등록
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-6">
            <Input
              placeholder="제목 또는 회사명으로 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button size="icon" variant="outline">
              <Search className="h-4 w-4" />
              <span className="sr-only">검색</span>
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>제목</TableHead>
                  <TableHead>회사</TableHead>
                  <TableHead>지역</TableHead>
                  <TableHead>마감일</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead className="text-right">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.id}</TableCell>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.company}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.deadline}</TableCell>
                    <TableCell>
                      <Badge variant={job.status === "활성" ? "default" : "secondary"}>{job.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/admin/jobs/${job.id}/edit`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">수정</span>
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDeleteClick(job.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">삭제</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>채용 공고 삭제</DialogTitle>
            <DialogDescription>정말로 이 채용 공고를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

