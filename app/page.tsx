import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, GraduationCap, Briefcase, Award, Users, ExternalLink } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col gap-8 py-8">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              인하대학교 소프트웨어 취업 정보 커뮤니티
            </h1>
            <p className="max-w-[700px] text-slate-700 dark:text-slate-300 md:text-xl">
              소프트웨어 관련 취업 정보, 공지사항, 공모전, 인턴십 정보를 한 곳에서 확인하세요.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0"
                asChild
              >
                <Link href="/notices">공지사항 보기</Link>
              </Button>
              <Button
                variant="outline"
                className="border-blue-300 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900"
                asChild
              >
                <Link href="/community">커뮤니티 참여하기</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <GraduationCap className="h-8 w-8 feature-icon" />
              <div>
                <CardTitle>학교 공지사항</CardTitle>
                <CardDescription>SW중심사업단의 최신 공지사항</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>SW중심사업단에서 제공하는 최신 공지사항과 이벤트 정보를 확인하세요.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/notices">더 알아보기</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <Award className="h-8 w-8 feature-icon" />
              <div>
                <CardTitle>공모전 정보</CardTitle>
                <CardDescription>IT 관련 공모전 사이트 모음</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>다양한 IT 공모전 정보를 한 곳에서 확인하고 참여 기회를 얻으세요.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/contests">더 알아보기</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <Briefcase className="h-8 w-8 feature-icon" />
              <div>
                <CardTitle>인턴십 정보</CardTitle>
                <CardDescription>인하대학교 인턴십 프로그램</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>인하대학교에서 제공하는 다양한 인턴십 프로그램 정보를 확인하세요.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/internships">더 알아보기</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <Users className="h-8 w-8 feature-icon" />
              <div>
                <CardTitle>SW 커뮤니티</CardTitle>
                <CardDescription>학생들을 위한 소통 공간</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>소프트웨어 관련 정보를 공유하고 질문하는 커뮤니티에 참여하세요.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/community">더 알아보기</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <Briefcase className="h-8 w-8 feature-icon" />
              <div>
                <CardTitle>채용 공고</CardTitle>
                <CardDescription>최신 IT 채용 정보</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>사람인에서 제공하는 최신 IT 채용 정보를 확인하고 지원하세요.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/jobs">더 알아보기</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <CalendarDays className="h-8 w-8 feature-icon" />
              <div>
                <CardTitle>일정 및 이벤트</CardTitle>
                <CardDescription>주요 일정 및 이벤트 정보</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>취업 설명회, 워크샵, 세미나 등 주요 일정 및 이벤트 정보를 확인하세요.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/events">더 알아보기</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Latest Information Section */}
      <section className="container px-4 md:px-6 py-8 md:py-12 gradient-bg rounded-lg my-8">
        <h2 className="text-2xl font-bold tracking-tight mb-6">최신 정보</h2>
        <Tabs defaultValue="notices" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
            <TabsTrigger value="notices">공지사항</TabsTrigger>
            <TabsTrigger value="contests">공모전</TabsTrigger>
            <TabsTrigger value="internships">인턴십</TabsTrigger>
            <TabsTrigger value="community">커뮤니티</TabsTrigger>
            <TabsTrigger value="jobs">채용공고</TabsTrigger>
          </TabsList>
          <TabsContent value="notices" className="mt-6">
            <div className="grid gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="gradient-card">
                  <CardHeader>
                    <CardTitle className="text-base">2023학년도 SW중심대학 산학프로젝트 참여기업 모집 안내</CardTitle>
                    <CardDescription>2023-09-{i < 10 ? `0${i}` : i}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      SW중심대학 산학프로젝트에 참여할 기업을 모집합니다. 관심 있는 기업은 신청 바랍니다.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href={`/notices/${i}`}>
                        자세히 보기
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/notices">더보기</Link>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="contests" className="mt-6">
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="gradient-card">
                  <CardHeader>
                    <CardTitle className="text-base">2023 대학생 AI 경진대회</CardTitle>
                    <CardDescription>마감일: 2023-10-{10 + i}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      인공지능 기술을 활용한 혁신적인 솔루션을 개발하는 대학생 AI 경진대회입니다.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href={`/contests/${i}`}>
                        자세히 보기
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/contests">더보기</Link>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="internships" className="mt-6">
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="gradient-card">
                  <CardHeader>
                    <CardTitle className="text-base">2023 하계 인턴십 프로그램</CardTitle>
                    <CardDescription>지원마감: 2023-05-{15 + i}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      인하대학교 학생들을 위한 하계 인턴십 프로그램입니다. 다양한 기업에서 실무 경험을 쌓을 수 있습니다.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href={`/internships/${i}`}>
                        자세히 보기
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/internships">더보기</Link>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="community" className="mt-6">
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="gradient-card">
                  <CardHeader>
                    <CardTitle className="text-base">React와 Next.js 스터디 모집합니다</CardTitle>
                    <CardDescription>
                      작성자: user{i} | 2023-09-{20 + i}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      React와 Next.js를 함께 공부할 스터디원을 모집합니다. 주 1회 오프라인 모임을 계획하고 있습니다.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href={`/community/${i}`}>
                        자세히 보기
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/community">더보기</Link>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="jobs" className="mt-6">
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="gradient-card">
                  <CardHeader>
                    <CardTitle className="text-base">[네이버] 프론트엔드 개발자 채용</CardTitle>
                    <CardDescription>마감일: 2023-10-{25 + i}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      네이버에서 프론트엔드 개발자를 채용합니다. React, TypeScript 경험자 우대.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href={`/jobs/${i}`}>
                        자세히 보기
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/jobs">더보기</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}

