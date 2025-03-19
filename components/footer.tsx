import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-8 bg-muted/50">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              인하SW커뮤니티
            </span>
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} 인하대학교 소프트웨어 취업 정보 커뮤니티. 모든 권리 보유.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/about" className="text-sm text-muted-foreground hover:underline">
            소개
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
            개인정보처리방침
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
            이용약관
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
            문의하기
          </Link>
        </div>
      </div>
    </footer>
  )
}

