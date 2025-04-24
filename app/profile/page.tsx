'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Eye, ThumbsUp, MessageSquare, Calendar, Mail, FileText } from "lucide-react";
import { fetchUserById, fetchUserPosts, fetchUserComments } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, token, authLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Log posts and comments whenever they update
  useEffect(() => {
    console.log("Posts:", posts);
    console.log("Comments:", comments);
  }, [posts, comments]);

  useEffect(() => {
    if (!token || !user) return;
    Promise.all([
      fetchUserById(String(user.id)),
      fetchUserPosts(String(user.id)),
      fetchUserComments(String(user.id))
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

  return (
    <div className="container py-8">
      <Card className="gradient-card mb-8">
        <CardHeader className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.avatarUrl || "/placeholder.svg"} alt={profile.username} />
            <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">
              {profile.username} 님
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" /> {profile.email}
              <Calendar className="h-4 w-4" /> 가입: {new Date(profile.joinDate).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Badge variant="outline">게시글 {posts.length}</Badge>
              <Badge variant="outline">댓글 {comments.length}</Badge>
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" onClick={() => router.push("/profile/edit")}>프로필 수정</Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="posts">
            <FileText className="mr-1" /> 게시글 ({posts.length})
          </TabsTrigger>
          <TabsTrigger value="comments">
            <MessageSquare className="mr-1" /> 댓글 ({comments.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6 grid gap-4">
          {posts.map(post => (
            <Card key={post.id} className="gradient-card">
              <CardHeader className="flex justify-between items-center">
                <FileText /> <Link href={`/community/${post.id}`}>{post.title}</Link>
                <span className="text-xs text-muted-foreground">
                  {new Date(post.createdDate).toLocaleDateString()}
                </span>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="comments" className="mt-6 grid gap-4">
          {comments.map(c => (
            <Card key={c.id} className="gradient-card">
              <CardHeader>
                <span>{c.content}</span>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
