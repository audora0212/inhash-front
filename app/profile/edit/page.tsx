"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Lock, LogOut } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()

  // 실제 구현 시에는 로그인 상태를 확인하고 로그인되지 않은 경우 로그인 페이지로 리다이렉트합니다
  useEffect(() => {
    // 예시: 로그인 상태 확인 로직
    const isLoggedIn = true // 실제로는 로그인 상태를 확인하는 로직이 필요합니다

    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [router])

  // 더미 사용자 데이터
  const user = {
    id: 1,
    username: "user1",
    email: "user1@example.com",
    joinDate: "2023-01-15",
    postsCount: 12,
    commentsCount: 28,
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={`/placeholder.svg?height=80&width=80`} alt={user.username} />
            <AvatarFallback className="text-2xl">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              내 프로필
            </h1>
            <p className="text-muted-foreground">계정 정보 관리 및 활동 내역 확인</p>
          </div>
          <Button variant="outline" className="ml-auto gap-2" onClick={() => router.push("/login")}>
            <LogOut className="h-4 w-4" />
            로그아웃
          </Button>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              계정 정보
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              보안
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-6 space-y-4">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>프로필 정보</CardTitle>
                <CardDescription>프로필 정보를 확인하고 수정할 수 있습니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">사용자명</Label>
                  <div className="flex gap-2">
                    <Input id="username" value={user.username} readOnly />
                    <Button variant="outline">변경</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <div className="flex gap-2">
                    <Input id="email" value={user.email} readOnly />
                    <Button variant="outline">변경</Button>
                  </div>
                </div>
                <div className="pt-4 flex justify-between">
                  <Button variant="outline" className="gap-1" onClick={() => router.push(`/profile/${user.id}`)}>
                    내 활동 보기
                  </Button>
                  <Button>변경사항 저장</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>활동 통계</CardTitle>
                <CardDescription>내 활동 통계를 확인할 수 있습니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <span className="text-2xl font-bold text-primary">{user.postsCount}</span>
                    <span className="text-sm text-muted-foreground">작성한 게시글</span>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <span className="text-2xl font-bold text-primary">{user.commentsCount}</span>
                    <span className="text-sm text-muted-foreground">작성한 댓글</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6 space-y-4">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>비밀번호 변경</CardTitle>
                <CardDescription>계정 보안을 위해 주기적으로 비밀번호를 변경하세요.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">현재 비밀번호</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">새 비밀번호</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">비밀번호 확인</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="pt-4 flex justify-end">
                  <Button>비밀번호 변경</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>계정 삭제</CardTitle>
                <CardDescription>계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive">계정 삭제</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

