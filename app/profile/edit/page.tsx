"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { fetchUserById } from "@/utils/api";

export default function EditProfilePage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");

  // ① If no user (yet), kick back to login or render nothing
  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      fetchUserById(String(user.id)).then(u => {
        setEmail(u.email);
        setUsername(u.username);
      });
    }
  }, [user, router]);

  // ② Guard the save handler as well
  const handleSave = async () => {
    if (!user) return; // <— this satisfies TS

    await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        // if you need auth: 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ email, username })
    });

    if (currentPwd && newPwd) {
      await fetch(`/api/users/${user.id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ currentPassword: currentPwd, newPassword: newPwd })
      });
    }

    router.push('/profile');
  };

  // ③ Early return to make TS happy and avoid rendering before fetch
  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="container py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader><CardTitle>프로필 수정</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label>Email</label>
            <Input value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Username</label>
            <Input value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div>
            <label>현재 비밀번호</label>
            <Input
              type="password"
              value={currentPwd}
              onChange={e => setCurrentPwd(e.target.value)}
            />
          </div>
          <div>
            <label>새 비밀번호</label>
            <Input
              type="password"
              value={newPwd}
              onChange={e => setNewPwd(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave}>저장</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
