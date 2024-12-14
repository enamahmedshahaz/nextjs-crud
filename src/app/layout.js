import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next JS CRUD App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}  >

        <div className='flex justify-between bg-red-400 px-5 py-4'>
          <div>
            <Link href="/">
              <h1 className='text-2xl font-semibold text-teal-400'> NextJs <span className='text-indigo-500'>CRUD</span></h1>
            </Link>
          </div>

          <div className='flex justify-between gap-4'>

            <Link href="/">Products list</Link>

            <Link href="/create">Create product</Link>

          </div>
        </div>

        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
