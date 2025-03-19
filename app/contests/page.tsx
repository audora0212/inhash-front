"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { fetchItContestSites } from "@/utils/api";

export default function ContestsPage() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItContestSites()
      .then((data) => {
        setSites(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contest sites:", error);
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
            공모전 사이트 목록
          </h1>
          <p className="text-muted-foreground">
            IT 관련 공모전 정보를 제공하는 사이트 목록입니다.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site: any) => (
            <Card key={site.id} className="gradient-card flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                <Image
                  src={site.logo || "/placeholder.svg"}
                  alt={`${site.title} 로고`}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <CardTitle className="text-xl">{site.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">{site.extraDescription}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-1" asChild>
                  <a href={site.link} target="_blank" rel="noopener noreferrer">
                    사이트 방문하기
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
