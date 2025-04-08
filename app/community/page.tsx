"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Eye, ThumbsUp, MessageSquare } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { fetchPosts } from "@/utils/api";

export default function CommunityPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPosts()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching community posts:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SW 커뮤니티
          </h1>
          <p className="text-muted-foreground">
            소프트웨어 관련 정보를 공유하고 질문하는 커뮤니티입니다.
          </p>
        </div>

        {/* 검색 및 필터 */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex flex-1 items-center gap-2">
            <Input
              placeholder="검색어를 입력하세요"
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button size="icon" variant="outline">
              <Search className="h-4 w-4" />
              <span className="sr-only">검색</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/community/write" className="gap-1">
                <Plus className="h-4 w-4" />
                글쓰기
              </Link>
            </Button>
          </div>
        </div>

        {/* 게시글 목록 */}
        <div className="grid gap-4">
          {filteredPosts.map((post) => (
            <Link key={post.id} href={`/community/${post.id}`} className="block">
              <Card className="gradient-card cursor-pointer">
                <CardHeader>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      {post.category && <Badge variant="outline">{post.category}</Badge>}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {/* 작성자 정보가 이제 authorId */}
                      <span>{post.authorId}</span>
                      <span>{new Date(post.createdDate).toLocaleDateString()}</span>
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
                      <span>{post.viewCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.likeCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{Array.isArray(post.comments) ? post.comments.length : 0}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {/* 페이지네이션 (예시) */}
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
  );
}
