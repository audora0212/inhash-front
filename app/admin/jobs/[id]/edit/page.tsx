"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function EditJobPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const jobId = params.id

  // 실제 구현 시에는 API에서 데이터를 가져옵니다
  const [formData, setFormData] = useState({
    title: "프론트엔드 개발자",
    company: "네이버",
    location: "서울",
    experience: "신입",
    employmentType: "정규직",
    deadline: "2023-12-31",
    description: "프론트엔드 개발자를 모집합니다. React, TypeScript 경험자 우대.",
    requirements: "- React, TypeScript 경험\n- 웹 개발 경험 1년 이상\n- 팀 협업 능력",
    benefits: "- 유연근무제\n- 식대 지원\n- 교통비 지원",
    skills: ["React", "TypeScript", "Next.js"],
    isActive: true,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isActive: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 실제 구현 시에는 API를 호출하여 데이터를 저장합니다
    try {
      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 성공 시 목록 페이지로 이동
      router.push("/admin/jobs")
    } catch (error) {
      console.error("Error updating job:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>채용 공고 수정 (ID: {jobId})</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">제목</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">회사명</Label>
                  <Input id="company" name="company" value={formData.company} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="location">지역</Label>
                  <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">경력</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => handleSelectChange("experience", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="신입">신입</SelectItem>
                      <SelectItem value="1~3년">1~3년</SelectItem>
                      <SelectItem value="3~5년">3~5년</SelectItem>
                      <SelectItem value="5년 이상">5년 이상</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentType">고용형태</Label>
                  <Select
                    value={formData.employmentType}
                    onValueChange={(value) => handleSelectChange("employmentType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="정규직">정규직</SelectItem>
                      <SelectItem value="계약직">계약직</SelectItem>
                      <SelectItem value="인턴">인턴</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">마감일</Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">직무 설명</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">자격 요건</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefits">복리후생</Label>
                <Textarea id="benefits" name="benefits" value={formData.benefits} onChange={handleChange} rows={4} />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="isActive" checked={formData.isActive} onCheckedChange={handleCheckboxChange} />
                <Label htmlFor="isActive">활성화</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/jobs")}>
                취소
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "저장 중..." : "저장"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

