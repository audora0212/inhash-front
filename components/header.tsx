"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";

const navigation = [
  { name: "홈", href: "/" },
  { name: "공지사항", href: "/notices" },
  { name: "공모전", href: "/contests" },
  { name: "인턴십", href: "/internships" },
  { name: "커뮤니티", href: "/community" },
  { name: "채용공고", href: "/jobs" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, authLoading, logout } = useAuth();

  const handleNavClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href === "/jobs") {
      e.preventDefault();
      Swal.fire({
        icon: "info",
        title: "준비중입니다",
        text: "채용공고 페이지는 준비중입니다.",
        confirmButtonText: "확인",
      });
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon" aria-label="메뉴 열기">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === item.href ? "text-primary" : "text-muted-foreground"
                    )}
                    onClick={handleNavClick(item.href)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex items-center gap-2 mt-4">
                  {!isLoggedIn ? (
                    <>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/login">로그인</Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href="/register">회원가입</Link>
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" onClick={handleLogout}>
                      로그아웃
                    </Button>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              INHASH
            </span>
          </Link>
        </div>
        <nav className="hidden lg:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
              onClick={handleNavClick(item.href)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden sm:flex items-center gap-4">
            {authLoading ? (
              <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
            ) : isLoggedIn && user ? (
              <>
                <span className="text-sm font-medium">
                  {user.username}님
                </span>
                <Button size="sm" onClick={logout}>
                  로그아웃
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/profile">
                    <User className="h-5 w-5" />
                    <span className="sr-only">프로필</span>
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">로그인</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">회원가입</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
