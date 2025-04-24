// components/ProfilePage.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  CalendarDays,
  Mail,
  Pencil,
  ExternalLink,
  MessageSquare,
  FileText,
} from 'lucide-react';
import { fetchUserById, fetchUserPosts, fetchUserComments } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user, token, authLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !user) return;
    Promise.all([
      fetchUserById(String(user.id)),
      fetchUserPosts(String(user.id)),
      fetchUserComments(String(user.id)),
    ])
      .then(([u, p, c]) => {
        setProfile(u);
        setPosts(p);
        setComments(c);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token, user]);

  if (authLoading || loading) {
    return <div className="container py-8">로딩 중...</div>;
  }

  if (!profile) {
    return <div className="container py-8">사용자 정보를 불러올 수 없습니다.</div>;
  }

  const activeDays = Math.floor(
    (Date.now() - new Date(profile.joinDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="flex flex-col gap-8 py-8">
      {/* Profile Header */}
      <section className="w-full py-12 md:py-16 gradient-bg">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white">
              <AvatarImage
                src={profile.avatarUrl || '/placeholder.svg'}
                alt={profile.username}
              />
              <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                <h1 className="text-3xl font-bold tracking-tighter">
                  {profile.username}
                </h1>
                <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500">
                  회원
                </Badge>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-center md:text-left max-w-[500px]">
                {profile.bio || '간단한 자기소개가 없습니다.'}
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                  <Mail className="h-4 w-4" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                  <CalendarDays className="h-4 w-4" />
                  <span>가입일: {new Date(profile.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0"
                  asChild
                >
                  <Link href="/profile/edit">
                    <Pencil className="h-4 w-4 mr-2" />
                    프로필 수정
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Section */}
      <section className="container px-4 md:px-6 py-8">
        <h2 className="text-2xl font-bold tracking-tight mb-6">나의 활동</h2>
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-auto">
            <TabsTrigger value="posts">작성한 게시글 ({posts.length})</TabsTrigger>
            <TabsTrigger value="comments">작성한 댓글 ({comments.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-6">
            <div className="grid gap-4">
              {posts.map((post) => (
                <Card key={post.id} className="gradient-card">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <Link href={`/community/${post.id}`}>{post.title}</Link>
                    </div>
                    <CardDescription>
                      작성일: {new Date(post.createdDate).toLocaleDateString()} | 조회수: {post.viewCount}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments.length}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>{post.likeCount}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href={`/community/${post.id}`}>
                        자세히 보기
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Button variant="outline">더보기</Button>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="mt-6">
            <div className="grid gap-4">
              {comments.map((comment) => (
                <Card key={comment.id} className="gradient-card">
                  <CardHeader>
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <p className="break-words">{comment.content}</p>
                    </div>
                    <CardDescription>
                      작성자: {comment.username} | 작성일: {new Date(comment.createdDate).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href={`/community/${comment.postId}`}>
                        원문 보기
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Button variant="outline">더보기</Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Stats Section */}
      <section className="container px-4 md:px-6 py-8 gradient-bg rounded-lg my-8">
        <h2 className="text-2xl font-bold tracking-tight mb-6">활동 통계</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <FileText className="h-8 w-8 feature-icon" />
              <div>
                <CardTitle>게시글</CardTitle>
                <CardDescription>작성한 게시글 수</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{posts.length}</p>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <MessageSquare className="h-8 w-8 feature-icon" />
              <div>
                <CardTitle>댓글</CardTitle>
                <CardDescription>작성한 댓글 수</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{comments.length}</p>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <CalendarDays className="h-8 w-8 feature-icon" />
              <div>
                <CardTitle>활동 기간</CardTitle>
                <CardDescription>가입 후 활동 기간</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{activeDays}일</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
