"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building, Clock, ExternalLink } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { fetchInternshipInfos } from "@/utils/api";

export default function InternshipsPage() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInternshipInfos()
      .then((data) => {
        setInternships(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching internships:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            인턴십 정보
          </h1>
          <p className="text-muted-foreground">
            인하대학교 학생들을 위한 다양한 인턴십 프로그램 정보를 확인하세요.
          </p>
        </div>

        {/* 인턴십 목록 */}
        <div className="grid gap-4">
          {internships.map((internship: any) => (
            <Card key={internship.id} className="gradient-card">
              <CardHeader>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{internship.institutionName} 인턴십</CardTitle>
                    <Badge className="bg-secondary hover:bg-secondary/80">
                      {internship.governmentFunded ? "국고사업" : "비국고"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{internship.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{internship.internshipPeriod}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>접수마감: {new Date(internship.applicationDeadline).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {internship.recruitmentInfo}
                  </p>
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

        {/* 페이지네이션 예시 */}
        <Pagination>
          {/* 페이지네이션 컴포넌트 구성 */}
        </Pagination>
      </div>
    </div>
  );
}
