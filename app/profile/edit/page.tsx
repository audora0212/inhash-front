// components/EditProfilePage.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  fetchUserById,
  updateUserProfile,
  updateUserPassword
} from '@/utils/api';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

export default function EditProfilePage() {
  const { user, authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchUserById(String(user.id))
      .then((u) => {
        setEmail(u.email);
        setUsername(u.username);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user, router]);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateUserProfile(user.id, { email, username });
      if (currentPwd && newPwd) {
        await updateUserPassword(user.id, {
          currentPassword: currentPwd,
          newPassword: newPwd
        });
      }
      router.push('/profile');
    } catch (error) {
      console.error(error);
      // TODO: show error toast
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return <div className="container py-8">로딩 중...</div>;
  }

  return (
    <div className="flex flex-col gap-8 py-8">
      <section className="w-full py-8 md:py-12 gradient-bg">
        <div className="container px-4 md:px-6 text-center">
          <Link href="/profile" className="mb-4 inline-block">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            프로필 수정
          </h1>
          <p className="max-w-[700px] mx-auto text-slate-700 dark:text-slate-300 md:text-lg mt-2">
            개인 정보를 수정하고 프로필을 업데이트하세요.
          </p>
        </div>
      </section>

      <section className="container px-4 md:px-6 py-8">
        <Card className="max-w-2xl mx-auto gradient-card">
          <CardHeader>
            <CardTitle>개인 정보</CardTitle>
            <CardDescription>이메일, 사용자명, 비밀번호를 수정할 수 있습니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-24 h-24 border-4 border-white">
                <AvatarImage src="/placeholder.svg" alt={username} />
                <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">사용자명</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">현재 비밀번호</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">새 비밀번호</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0"
            >
              저장하기
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}