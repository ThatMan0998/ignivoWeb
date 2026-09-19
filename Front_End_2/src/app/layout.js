import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata = {
  title: "IGNIVO | Nền Tảng Cảnh Báo",
  description: "Hệ Sinh Thái Báo Cháy Thông Minh",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col selection:bg-primary selection:text-white">{children}</body>
    </html>
  );
}
