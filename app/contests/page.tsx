import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

// 실제 구현 시에는 API에서 데이터를 가져옵니다
const contestSites = [
  {
    id: 1,
    name: "WEVITY",
    logo: "/placeholder.svg?height=80&width=80",
    description: "국내 최대 공모전 정보 사이트로, IT 관련 공모전 정보를 제공합니다.",
    url: "https://www.wevity.com",
  },
  {
    id: 2,
    name: "씽굿",
    logo: "/placeholder.svg?height=80&width=80",
    description: "다양한 공모전, 대외활동, 경진대회 정보를 제공하는 사이트입니다.",
    url: "https://www.thinkcontest.com",
  },
  {
    id: 3,
    name: "캠퍼스몬",
    logo: "/placeholder.svg?height=80&width=80",
    description: "대학생을 위한 공모전, 대외활동, 인턴십 정보를 제공합니다.",
    url: "https://www.campusmon.com",
  },
  {
    id: 4,
    name: "링커리어",
    logo: "/placeholder.svg?height=80&width=80",
    description: "IT 특화 공모전 및 해커톤 정보를 제공하는 사이트입니다.",
    url: "https://linkareer.com",
  },
  {
    id: 5,
    name: "프로그래머스",
    logo: "/placeholder.svg?height=80&width=80",
    description: "개발자를 위한 코딩 테스트와 챌린지 정보를 제공합니다.",
    url: "https://programmers.co.kr",
  },
  {
    id: 6,
    name: "SW중심사회",
    logo: "/placeholder.svg?height=80&width=80",
    description: "소프트웨어 중심사회 포털에서 제공하는 공모전 및 경진대회 정보입니다.",
    url: "https://www.software.kr",
  },
]

export default function ContestsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            공모전 사이트 목록
          </h1>
          <p className="text-muted-foreground">
            IT 관련 공모전 정보를 제공하는 사이트 목록입니다. 각 사이트에서 다양한 공모전 정보를 확인하세요.
          </p>
        </div>

        {/* 공모전 사이트 목록 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contestSites.map((site) => (
            <Card key={site.id} className="gradient-card flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                <Image
                  src={site.logo || "/placeholder.svg"}
                  alt={`${site.name} 로고`}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <CardTitle className="text-xl">{site.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">{site.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-1" asChild>
                  <a href={site.url} target="_blank" rel="noopener noreferrer">
                    사이트 방문하기
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* 추가 정보 */}
        <div className="mt-8 rounded-lg gradient-bg p-6 border">
          <h2 className="mb-4 text-xl font-semibold">공모전 참여 팁</h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>공모전 주제와 요구사항을 꼼꼼히 확인하세요.</li>
            <li>마감 기한을 준수하고, 가능하면 미리 제출하는 것이 좋습니다.</li>
            <li>팀으로 참가할 경우, 역할 분담을 명확히 하고 일정을 계획하세요.</li>
            <li>포트폴리오로 활용할 수 있도록 과정과 결과물을 잘 정리하세요.</li>
            <li>수상 여부와 관계없이 경험 자체에 의미를 두고 참여하세요.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

